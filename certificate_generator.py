import os
import pandas
from PIL import Image, ImageDraw, ImageFont
from emailer import Emailer
from PyPDF2 import PdfFileReader, PdfFileWriter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import keyboard
from colorama import init, Fore, Style

init(autoreset=True)  # Initialize colorama for cross-platform colored text
# Set the Colour before drawing
TEXT_COLOUR = (0,0,255) 

class GenerateByPdf() :

    def __init__(self) -> None:
        pass

class GenerateByImage() :

    def __init__(self) -> None:

        # Mailer Object
        self.mailer = Emailer()

        # Load the certificate templae
        self.certificate_img = Image.open(r"template/sample.png")

        # Create a drawing object to calculate the length text wll take
        self.drawer_img = ImageDraw.Draw(self.certificate_img)
        
        # Font configuration
        self.font = ImageFont.truetype(r"Fonts/PlaypenSans-Bold.ttf", size=56)
        pdfmetrics.registerFont(TTFont("cer_font",r"Fonts/PlaypenSans-Bold.ttf"))

        # Folder to store the generated certificates
        self.OUTPUT_DIRECTORY = "Certificates"
        os.makedirs(self.OUTPUT_DIRECTORY, exist_ok=True)
        self._store_participants_data()



    def _store_participants_data(self) -> None : 
        self.names = []
        self.df = pandas.read_csv(r"names.csv")
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()
        self.success_indices = []

    def _send_email(self) -> None :

        for index, (name,email) in enumerate(zip(self.names, self.emails)) :
            self.out_path_certificate = os.path.join(self.OUTPUT_DIRECTORY, f"{name}.pdf")

            # Make a canvas
            self.drawer = canvas.Canvas(self.out_path_certificate, pagesize=(self.certificate_img.width, self.certificate_img.height))

            # Insert image
            self.drawer.drawImage(r"template/sample.png",0,0, width=self.certificate_img.width, height=self.certificate_img.height)

            # Set the drawer object font and colour
            self.drawer.setFont("cer_font",56)
            self.drawer.setFillColor(TEXT_COLOUR)

            # Adjust Position (x,y)
            # Adjust Coordinates by https://www.image-map.net/
            # Y - coordinate keep the touching line - Use link above to get the coordinates
            self.text_width = self.drawer_img.textlength(name,font=self.font)
            self.name_position = ((self.certificate_img.width - self.text_width)/2, self.certificate_img.height - 805)
            
            # Draw the name: 
            self.drawer.drawString(self.name_position[0], self.name_position[1], name)

            self.drawer.save()

            # Sending the mail
            self.status = self.mailer.SendMail(email, name)
            if self.status == "sent" :
                self.success_indices.append(index)

        #  Update the original dataframe: 
        self.df = self.df.drop(index=self.success_indices)

        # Save the dataframe
        self.df.to_csv(r"names.csv", index=False)

        # Closing the template image
        self.certificate_img.close()
        print(f"{Style.BRIGHT}{Fore.GREEN}Script Running Completed.{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)

    def _retry_failed_operation(self) -> None :

        # Reconfigure the remaining list 
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()

        if len(self.names) == 0 or len(self.emails) == 0 :
            pass
        else :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Retrying the failed connection...{Fore.RESET}{Style.RESET_ALL}")
            self._send_email() 

