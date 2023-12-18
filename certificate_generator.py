import os
import time
import pandas
from PIL import Image, ImageFont
from emailer import Emailer
import PyPDF2
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from colorama import init, Fore, Style
import shutil
import io

init(autoreset=True)  # Initialize colorama for cross-platform colored text
# Set the Colour before drawing
TEXT_COLOUR = (0,0,255) 
# Configure the folders
OUTPUT_DIRECTORY = "Certificates"
TEMPLATE_DIRECTORY = "template"
# Font configuration
FONT_SIZE = 28
FONT_NAME = "cer_font"
FONT = ImageFont.truetype(r"Fonts/PlaypenSans-Bold.ttf", size=FONT_SIZE)
pdfmetrics.registerFont(TTFont(FONT_NAME,r"Fonts/PlaypenSans-Bold.ttf"))

class GenerateByPdf():
    def __init__(self, account, password) -> None:
        self.mailer = Emailer(account, password)
        self.pdf_template_path = os.path.join(TEMPLATE_DIRECTORY, "sample.pdf")

        # Configure template dimensions
        self.template_dimensions = self.get_page_dimension()
        self.template_width = self.template_dimensions[0]
        self.template_height = self.template_dimensions[1]

        # Make output directory
        os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
        self.store_participants_data()

    def store_participants_data(self) -> None:
        self.df = pandas.read_csv(r"names.csv")
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()
        self.success_indices = []

    def get_page_dimension(self) :
        template = PyPDF2.PdfReader(open(self.pdf_template_path, "rb"))
        template_page = template.pages[0]
        template_page_width, template_page_height = template_page.mediabox.width  ,template_page.mediabox.height
        return (template_page_width, template_page_height)

    def draw_text_on_pdf(self, out_path, name):

        # Copy the original PDF to the output path
        shutil.copy(self.pdf_template_path, out_path)

        # Open the copied PDF file
        with open(out_path, 'rb+') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            pdf_writer = PyPDF2.PdfWriter()

            # Iterate through each page in the original PDF
            length_iterate = len(pdf_reader.pages)
            for page_num in range(0, length_iterate):
                page = pdf_reader.pages[page_num]

                # Create a PDF canvas for drawing
                packet = io.BytesIO()
                drawer = canvas.Canvas(packet, pagesize=(self.template_width, self.template_height))

                # Set font and colour
                drawer.setFont(FONT_NAME, FONT_SIZE)
                drawer.setFillColor(TEXT_COLOUR)

                # Configure name position
                name_text_width = drawer.stringWidth(name, FONT_NAME, FONT_SIZE)
                name_position = (float(self.name_position[0]) - float(name_text_width)/2, float(self.template_height) - float(self.name_position[1]))

                # Configure event position
                event_text_width = drawer.stringWidth(self.event_name, FONT_NAME, FONT_SIZE)
                event_postion = (float(self.event_name_postion[0]) - float(event_text_width)/2, float(self.template_height) - float(self.event_name_postion[1]))

                # Configure Date position
                date_text_width = drawer.stringWidth(self.during_date, FONT_NAME, FONT_SIZE)
                date_position = (float(self.during_date_position[0]) - float(date_text_width)/2, float(self.template_height) - float(self.during_date_position[1]))

                # Write the name, event and date
                drawer.drawString(name_position[0], name_position[1], name)
                drawer.drawString(event_postion[0], event_postion[1], self.event_name)
                drawer.drawString(date_position[0], date_position[1], self.during_date)

                # Save 
                drawer.save()

                # Move the buffer position back to the beginning
                packet.seek(0)
                new_pdf = PyPDF2.PdfReader(packet)

                # Merge the original page and the new content
                page.merge_page(new_pdf.pages[0])
                pdf_writer.add_page(page)

            # Write the modified PDF back to the file
            pdf_writer.write(file)

    def send_email(self) -> None:
        for index, (name, email) in enumerate(zip(self.names, self.emails)):
            # Make path and generate certificates
            out_path_certificate = os.path.join(OUTPUT_DIRECTORY, f"{name}.pdf")
            self.draw_text_on_pdf(out_path_certificate, name)

            # Sending the mail
            self.status = self.mailer.SendMail(email, name)
            if self.status == "sent":
                self.success_indices.append(index)

        self.df = self.df.drop(index=self.success_indices)
        self.df.to_csv(r"names.csv", index=False)
        print(f"{Style.BRIGHT}{Fore.GREEN}Script Running Completed.{Fore.RESET}{Style.RESET_ALL}", flush=True)
        self.success_indices = []


    def retry_failed_operation(self) -> None :

        # Reconfigure the remaining list 
        self.df = pandas.read_csv(r"names.csv")
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()

        if len(self.names) == 0 or len(self.emails) == 0 :
            pass
        else :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Retrying the failed connection...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.send_email() 

    def check_remaining(self) -> None:
        if len(self.names) == 0 or len(self.emails) == 0 :
            print(f"{Style.BRIGHT}{Fore.GREEN}All the persons has been mailed, no need to run script again{Fore.RESET}{Style.RESET_ALL}")
        else :
            print(f'{Style.BRIGHT}{Fore.YELLOW}Some names are remaining in the list, you may run script again by running:{Fore.RESET}{Fore.BLUE} ./certimailer.sh {Fore.RESET}{Fore.YELLOW}to send mails to remaining persons. {Fore.RESET}{Style.RESET_ALL}')

    def is_csv_updated(self) ->str :
        if len(self.names) == 0 or len(self.emails) == 0 :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv'{Fore.RESET}{Style.RESET_ALL}")
            return "break"
        
    def configure_postion_and_details(self) :
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring the event name and date..{Fore.RESET}{Style.RESET_ALL}")
        self.event_name = input("Enter event name: ")
        self.during_date = input("Enter month of event (eg: Jan'22): ")
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring position of parameters, Refer: {Fore.RESET}{Fore.BLUE}https://www.i2pdf.com/measure-pdf {Fore.RESET}{Fore.YELLOW}To measure see readme{Fore.RESET}{Style.RESET_ALL}")
        name_position = input("Given name position (values seprated by comma x,y): ")
        event_name_position = input("Given event position (values seprated by comma x,y): ")
        date_position = input("Date position (values seprated by comma x,y): ")
        self.name_position = tuple(name_position.strip().split(','))
        self.event_name_postion = tuple(event_name_position.strip().split(','))
        self.during_date_position = tuple(date_position.strip().split(','))

class GenerateByImage() :

    def __init__(self, account, password) -> None:

        # Mailer Object
        self.mailer = Emailer(account, password)

        # Load the certificate templae
        self.certificate_img = Image.open(r"template/sample.png")
        
        # Font configuration
        # self.font = ImageFont.truetype(r"Fonts/PlaypenSans-Bold.ttf", size=56)
        self.png_template_path = os.path.join(TEMPLATE_DIRECTORY, "sample.png")
        os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
        self.store_participants_data()
        self.success_indices = []

    def store_participants_data(self) -> None : 
        self.df = pandas.read_csv(r"names.csv")
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()

    def draw_on_img(self, name) -> None :
        # Output path
        out_path_certificate = os.path.join(OUTPUT_DIRECTORY, f"{name}.pdf")

        # Make a canvas
        drawer = canvas.Canvas(out_path_certificate, pagesize=(self.certificate_img.width, self.certificate_img.height))

        # Insert image
        drawer.drawImage(self.png_template_path,0,0, width=self.certificate_img.width, height=self.certificate_img.height)

        # Set the drawer object font and colour
        drawer.setFont(FONT_NAME, FONT_SIZE)
        drawer.setFillColor(TEXT_COLOUR)

        # Configure name position
        name_text_width = drawer.stringWidth(name, FONT_NAME, FONT_SIZE)
        name_position = (float(self.name_position[0]) - float(name_text_width)/2, float(self.certificate_img.height) - float(self.name_position[1]))

        # Configure event position
        event_text_width = drawer.stringWidth(self.event_name, FONT_NAME, FONT_SIZE)
        event_postion = (float(self.event_name_postion[0]) - float(event_text_width)/2, float(self.certificate_img.height) - float(self.event_name_postion[1]))

        # Configure Date position
        date_text_width = drawer.stringWidth(self.during_date, FONT_NAME, FONT_SIZE)
        date_position = (float(self.during_date_position[0]) - float(date_text_width)/2, float(self.certificate_img.height) - float(self.during_date_position[1]))

        # Write the name, event and date
        drawer.drawString(name_position[0], name_position[1], name)
        drawer.drawString(event_postion[0], event_postion[1], self.event_name)
        drawer.drawString(date_position[0], date_position[1], self.during_date)

        # Save the pdf with text written  
        drawer.save()

    def send_email(self) -> None :
        for index, (name,email) in enumerate(zip(self.names, self.emails)) :
            # Make certificate
            self.draw_on_img(name)

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
        print(f"{Style.BRIGHT}{Fore.GREEN}Script Running Completed.{Fore.RESET}{Style.RESET_ALL}", flush=True)
        self.success_indices = []

    def retry_failed_operation(self) -> None :

        # Reconfigure the remaining list 
        self.store_participants_data()

        if len(self.names) == 0 or len(self.emails) == 0 :
            pass
        else :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Retrying the failed connection...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.send_email() 

    def check_remaining(self) -> None:
        if len(self.names) == 0 or len(self.emails) == 0 :
            print(f"{Style.BRIGHT}{Fore.GREEN}All the persons has been mailed, no need to run script again{Fore.RESET}{Style.RESET_ALL}")
        else :
            print(f'{Style.BRIGHT}{Fore.YELLOW}Some names are remaining in the list, you may run script again by running:{Fore.RESET}{Fore.BLUE} ./certimailer.sh {Fore.RESET}{Fore.YELLOW}to send mails to remaining persons. {Fore.RESET}{Style.RESET_ALL}')

    def is_csv_updated(self) ->str :
        if len(self.names) == 0 or len(self.emails) == 0 :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv'{Fore.RESET}{Style.RESET_ALL}")
            return "break"
        
    def configure_postion_and_details(self) -> None :
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring the event name and date..{Fore.RESET}{Style.RESET_ALL}")
        self.event_name = input("Enter event name: ")
        self.during_date = input("Enter month of event (eg: Jan'22): ")
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring position of parameters, Refer: {Fore.RESET}{Fore.BLUE}https://www.image-map.net/ {Fore.RESET}{Fore.YELLOW}Take the middle postion for all postion seeking to configure{Fore.RESET}{Style.RESET_ALL}")
        name_position = input("Given name position (values seprated by comma x,y): ")
        event_name_position = input("Given event position (values seprated by comma x,y): ")
        date_position = input("Date position (values seprated by comma x,y): ")
        self.name_position = tuple(name_position.strip().split(','))
        self.event_name_postion = tuple(event_name_position.strip().split(','))
        self.during_date_position = tuple(date_position.strip().split(','))