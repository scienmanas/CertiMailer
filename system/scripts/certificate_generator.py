'''
Module: certificate_generator.py

This script generates certificates from a PDF template or an image template using user data and an image of the signature. It also sends emails with the generated certificates as attachments.

Dependencies:
- os
- time
- io
- shutil
- colorama
- reportlab.pdfgen
- reportlab.pdfbase
- reportlab.pdfbase.ttfonts
- pandas
- PyPDF2
- PIL.Image
- system.scripts.emailer.Emailer
- system.settings.OUTPUT_DIRECTORY
- system.settings.TEMPLATE_DIRECTORY
- system.settings.TEXT_COLOUR
- system.settings.FONT_SIZE
- system.settings.DATA_DIRECTORY
- system.settings.FONT_NAME
- system.settings.FONT_DIRECTORY
- system.settings.TEMPLATE_NAME

Usage:
- Run the script to generate certificates and send emails.

Classes:
1. GenerateByPdf:
    A class to generate certificates from a PDF template using user data and an image of the signature.

    Attributes:
    - df (pandas.DataFrame): Participants' information in a DataFrame.
    - names (list): List of participant names.
    - emails (list): List of participant emails.
    - mailer (Emailer): Emailer object for sending emails.
    - data_path (str): Path to the CSV file containing participant data.
    - template_path (str): Path to the PDF template file.
    - template_dimensions (tuple): Dimensions (width, height) of the PDF template page in points.
    - template_width (float): Width of the PDF template page.
    - template_height (float): Height of the PDF template page.
    - event_name (str): Name of the event.
    - during_date (str): Date of the event.
    - name_position (tuple): Position (x, y) for participant name on the certificate.
    - event_name_position (tuple): Position (x, y) for event name on the certificate.
    - during_date_position (tuple): Position (x, y) for event date on the certificate.

    Methods:
    - __init__(self): Initializes the GenerateByPdf object with default values.
    - store_participants_data(self): Store participants' information in a dictionary.
    - get_page_dimension(self): Get the page dimension of the pdf file.
    - draw_text_on_pdf(self, out_path, name): Draw text on the certificate pdf.
    - update_csv(self, index): Update CSV file after sending emails.
    - send_email(self): Send an email with the generated certificate as an attachment.
    - retry_failed_operation(self): Retry a failed operation on the emails that have been flagged as not sent.
    - check_remaining(self): Check how many mails are still pending.
    - configure_postion_and_details(self): Configure the event name, date, and positions on the certificate PDF.

2. GenerateByImage:
    A class to generate certificates from an image template using user data and an image of the signature.

    Attributes:
    - df (pandas.DataFrame): Participants' information in a DataFrame.
    - names (list): List of participant names.
    - emails (list): List of participant emails.
    - mailer (Emailer): Emailer object for sending emails.
    - data_path (str): Path to the CSV file containing participant data.
    - template_path (str): Path to the image template file.
    - certificate_img (PIL.Image): Image object of the certificate template.
    - event_name (str): Name of the event.
    - during_date (str): Date of the event.
    - name_position (tuple): Position (x, y) for participant name on the certificate.
    - event_name_position (tuple): Position (x, y) for event name on the certificate.
    - during_date_position (tuple): Position (x, y) for event date on the certificate.

    Methods:
    - __init__(self): Initializes the GenerateByImage object with default values.
    - store_participants_data(self): Store participants' information in a dictionary.
    - draw_text_on_img(self, name): Draw text on the certificate image.
    - update_csv(self, index): Update CSV file after sending emails.
    - send_email(self): Send an email with the generated certificate as an attachment.
    - retry_failed_operation(self): Retry a failed operation on the emails that have been flagged as not sent.
    - check_remaining(self): Check how many mails are still pending.
    - configure_postion_and_details(self): Configure the event name, date, and positions on the 'certificate image.
'''

import os
import time
import io
import shutil
from colorama import init, Fore, Style
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import pandas
import PyPDF2
from PIL import Image, ImageFont
from system.scripts.emailer import Emailer
from system.settings import OUTPUT_DIRECTORY, TEMPLATE_DIRECTORY, TEXT_COLOUR, FONT_SIZE, DATA_DIRECTORY, FONT_NAME, FONT_DIRECTORY, TEMPLATE_NAME


init(autoreset=True)  # Initialize colorama for cross-platform colored text


# Font configuration
FONT = ImageFont.truetype(FONT_DIRECTORY, size=FONT_SIZE)
pdfmetrics.registerFont(TTFont(FONT_NAME, FONT_DIRECTORY))


class GenerateByPdf():

    '''
    A class to generate certificates from a PDF template using user data and an image of the signature.

        Attributes:
        - df (pandas.DataFrame): Participants' information in a DataFrame.
        - names (list): List of participant names.
        - emails (list): List of participant emails.
        - mailer (Emailer): Emailer object for sending emails.
        - data_path (str): Path to the CSV file containing participant data.
        - template_path (str): Path to the PDF template file.
        - template_dimensions (tuple): Dimensions (width, height) of the PDF template page in points.
        - template_width (float): Width of the PDF template page.
        - template_height (float): Height of the PDF template page.
        - event_name (str): Name of the event.
        - during_date (str): Date of the event.
        - name_position (tuple): Position (x, y) for participant name on the certificate.
        - event_name_position (tuple): Position (x, y) for event name on the certificate.
        - during_date_position (tuple): Position (x, y) for event date on the certificate.

        Methods:
        - __init__(self): Initializes the GenerateByPdf object with default values.
        - store_participants_data(self): Store participants' information in a dictionary.
        - get_page_dimension(self): Get the page dimension of the pdf file.
        - draw_text_on_pdf(self, out_path, name): Draw text on the certificate pdf.
        - update_csv(self, index): Update CSV file after sending emails.
        - send_email(self): Send an email with the generated certificate as an attachment.
        - retry_failed_operation(self): Retry a failed operation on the emails that have been flagged as not sent.
        - check_remaining(self): Check how many mails are still pending.
        - configure_postion_and_details(self): Configure the event name, date, and positions on the certificate PDF.
    '''


    def __init__(self) -> None:
        """
        Initializes the GenerateByPdf object with default values.
        """
        # initialize variables
        self.df = pandas.DataFrame()
        self.names = list()
        self.emails = list()

        # Initialise mailer system
        self.mailer = Emailer()

        # Files path
        self.data_path = os.path.join(DATA_DIRECTORY, "names.csv")
        self.template_path = os.path.join(
            TEMPLATE_DIRECTORY, f"{TEMPLATE_NAME}.pdf")

        # Configure template dimensions
        self.template_dimensions = self.get_page_dimension()
        self.template_width = self.template_dimensions[0]
        self.template_height = self.template_dimensions[1]

        # Configure printing details
        self.event_name = str()
        self.during_date = str()
        self.name_position = object()
        self.event_name_postion = object()
        self.during_date_position = object()

        # Make output directory
        os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
        self.store_participants_data()

    def store_participants_data(self) -> None:
        """
        Store participants' information in a dictionary.
        """
        self.df = pandas.read_csv(self.data_path)
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()

    def get_page_dimension(self) -> tuple:
        """
        Get the page dimension of the pdf file.
        Args:
        None
        Returns:
        A tuple (w, h): width and height of each page in points.
        """
        template = PyPDF2.PdfReader(open(self.template_path, "rb"))
        template_page = template.pages[0]
        template_page_width, template_page_height = template_page.mediabox.width, template_page.mediabox.height
        return (template_page_width, template_page_height)

    def draw_text_on_pdf(self, out_path, name):
        """
        Draw text on the certificate pdf.
        Args:
        out_path: str, path to save the new pdf.
        name: str, participant's name.
        """

        # Copy the original PDF to the output path
        shutil.copy(self.template_path, out_path)

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
                drawer = canvas.Canvas(packet, pagesize=(
                    self.template_width, self.template_height))

                # Set font and colour
                drawer.setFont(FONT_NAME, FONT_SIZE)
                drawer.setFillColor(TEXT_COLOUR)

                # Configure name position
                name_text_width = drawer.stringWidth(
                    name, FONT_NAME, FONT_SIZE)
                name_position = (float(self.name_position[0]) - float(name_text_width)/2, float(
                    self.template_height) - float(self.name_position[1]))

                # Configure event position
                event_text_width = drawer.stringWidth(
                    self.event_name, FONT_NAME, FONT_SIZE)
                event_postion = (float(self.event_name_postion[0]) - float(event_text_width)/2, float(
                    self.template_height) - float(self.event_name_postion[1]))

                # Configure Date position
                date_text_width = drawer.stringWidth(
                    self.during_date, FONT_NAME, FONT_SIZE)
                date_position = (float(self.during_date_position[0]) - float(date_text_width)/2, float(
                    self.template_height) - float(self.during_date_position[1]))

                # Write the name, event and date
                drawer.drawString(name_position[0], name_position[1], name)
                drawer.drawString(
                    event_postion[0], event_postion[1], self.event_name)
                drawer.drawString(
                    date_position[0], date_position[1], self.during_date)

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

    def update_csv(self, index) -> None:
        """
        Update a CSV file with the given information.
        """
        self.df = self.df.drop(index=index)
        self.df.to_csv(self.data_path, index=False)
    
    @staticmethod
    def remove_extra_spaces(argument) -> str :
        """
        Remove extra spaces
        """
        return argument.strip()

    def send_email(self) -> None:
        """
        Send an email with the generated certificate as attachment.
        """
        for index, (name, email) in enumerate(zip(self.names, self.emails)):
            # Remove extra spaces
            name = self.remove_extra_spaces(name)
            email = self.remove_extra_spaces(email)

            # Make path and generate certificates
            out_path_certificate = os.path.join(
                OUTPUT_DIRECTORY, f"{name}.pdf")
            self.draw_text_on_pdf(out_path_certificate, name)

            # Sending the mail
            status = self.mailer.send_mail(email, name)
            if status == "sent":
                # Dropping of sucessful columns
                self.update_csv(index)

        # Dropping of sucessful columns
        print(f"{Style.BRIGHT}{Fore.GREEN}Script Running Completed.{Fore.RESET}{Style.RESET_ALL}", flush=True)

    def retry_failed_operation(self) -> None:
        """
        Retry a failed operation on the emails that have been flagged as not sent.
        """

        # Reconfigure the remaining list
        self.df = pandas.read_csv(self.data_path)
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()

        if len(self.names) == 0 or len(self.emails) == 0:
            pass
        else:
            print(
                f"{Style.BRIGHT}{Fore.YELLOW}Retrying the failed connection...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.send_email()

    def check_remaining(self) -> None:
        """
        Check how many mails are still pending. If there is none left, end the program.
        Otherwise, keep it running until all mails have been processed.
        """

        if len(self.names) == 0 or len(self.emails) == 0:
            print(f"{Style.BRIGHT}{Fore.GREEN}All the persons has been mailed, no need to run script again{Fore.RESET}{Style.RESET_ALL}")
        else:
            print(f'{Style.BRIGHT}{Fore.YELLOW}Some names are remaining in the list, you may run script again by running:{Fore.RESET}{Fore.BLUE} ./certimailer.sh {Fore.RESET}{Fore.YELLOW}to send mails to remaining persons. {Fore.RESET}{Style.RESET_ALL}')

    def configure_postion_and_details(self):
        """
        Set up the position of the QR code and details to be written on the certificate.
        The function will set these attributes for each individual in the dataframe.
        """

        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring the event name and date..{Fore.RESET}{Style.RESET_ALL}")
        self.event_name = input(f"Enter {Style.BRIGHT}{Fore.YELLOW}event{Fore.RESET}{Style.RESET_ALL} name: ")
        self.during_date = input(f"Enter {Style.BRIGHT}{Fore.YELLOW}month{Fore.RESET}{Style.RESET_ALL} of event (eg: Jan'22): ")
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring position of parameters, Refer: {Fore.RESET}{Fore.BLUE}https://www.i2pdf.com/measure-pdf {Fore.RESET}{Fore.YELLOW}to measure and see readme.{Fore.RESET}{Style.RESET_ALL}")
        name_position = input(
            f"Given {Style.BRIGHT}{Fore.YELLOW}name{Fore.RESET}{Style.RESET_ALL} position (values seprated by comma x,y): ")
        event_name_position = input(
            f"Given {Style.BRIGHT}{Fore.YELLOW}event{Fore.RESET}{Style.RESET_ALL} position (values seprated by comma x,y): ")
        date_position = input(f"{Style.BRIGHT}{Fore.YELLOW}Date position{Fore.RESET}{Style.RESET_ALL} (values seprated by comma x,y): ")
        self.name_position = tuple(element.strip() for element in name_position.split(','))
        self.event_name_postion = tuple(element.strip() for element in event_name_position.split(','))
        self.during_date_position = tuple(element.strip() for element in date_position.split(','))


class GenerateByImage():

    '''
    A class to generate certificates from an image template using user data and an image of the signature.

        Attributes:
        - df (pandas.DataFrame): Participants' information in a DataFrame.
        - names (list): List of participant names.
        - emails (list): List of participant emails.
        - mailer (Emailer): Emailer object for sending emails.
        - data_path (str): Path to the CSV file containing participant data.
        - template_path (str): Path to the image template file.
        - certificate_img (PIL.Image): Image object of the certificate template.
        - event_name (str): Name of the event.
        - during_date (str): Date of the event.
        - name_position (tuple): Position (x, y) for participant name on the certificate.
        - event_name_position (tuple): Position (x, y) for event name on the certificate.
        - during_date_position (tuple): Position (x, y) for event date on the certificate.

        Methods:
        - __init__(self): Initializes the GenerateByImage object with default values.
        - store_participants_data(self): Store participants' information in a dictionary.
        - draw_text_on_img(self, name): Draw text on the certificate image.
        - update_csv(self, index): Update CSV file after sending emails.
        - send_email(self): Send an email with the generated certificate as an attachment.
        - retry_failed_operation(self): Retry a failed operation on the emails that have been flagged as not sent.
        - check_remaining(self): Check how many mails are still pending.
        - configure_postion_and_details(self): Configure the event name, date, and positions on the certificate image.
    '''

    def __init__(self) -> None:

        # initialize variables
        self.df = pandas.DataFrame()
        self.names = list()
        self.emails = list()

        # Mailer Object
        self.mailer = Emailer()

        # Files path
        self.data_path = os.path.join(DATA_DIRECTORY, "names.csv")
        self.template_path = os.path.join(
            TEMPLATE_DIRECTORY, f"{TEMPLATE_NAME}.png")

        # Load the certificate templae
        self.certificate_img = Image.open(self.template_path)

        # Configure printing details
        self.event_name = str()
        self.during_date = str()
        self.name_position = object()
        self.event_name_postion = object()
        self.during_date_position = object()

        # Font configuration
        # self.font = ImageFont.truetype(r"Fonts/PlaypenSans-Bold.ttf", size=56)
        self.png_template_path = os.path.join(TEMPLATE_DIRECTORY, "sample.png")
        os.makedirs(OUTPUT_DIRECTORY, exist_ok=True)
        self.store_participants_data()

    def store_participants_data(self) -> None:
        """
        Store names and emails from 'names.csv' into df.
        """
        self.df = pandas.read_csv(self.data_path)
        self.names = self.df['Name'].tolist()
        self.emails = self.df['Email'].tolist()

    def draw_text_on_img(self, name) -> None:
        """
        Generates the certificate pdf
        """
        # Output path
        out_path_certificate = os.path.join(OUTPUT_DIRECTORY, f"{name}.pdf")

        # Make a canvas
        drawer = canvas.Canvas(out_path_certificate, pagesize=(
            self.certificate_img.width, self.certificate_img.height))

        # Insert image
        drawer.drawImage(self.png_template_path, 0, 0, width=self.certificate_img.width, height=self.certificate_img.height)

        # Set the drawer object font and colour
        drawer.setFont(FONT_NAME, FONT_SIZE)
        drawer.setFillColor(TEXT_COLOUR)

        # Configure name position
        name_text_width = drawer.stringWidth(name, FONT_NAME, FONT_SIZE)
        name_position = (float(self.name_position[0]) - float(name_text_width)/2, float(
            self.certificate_img.height) - float(self.name_position[1]))

        # Configure event position
        event_text_width = drawer.stringWidth(
            self.event_name, FONT_NAME, FONT_SIZE)
        event_postion = (float(self.event_name_postion[0]) - float(event_text_width)/2, float(
            self.certificate_img.height) - float(self.event_name_postion[1]))

        # Configure Date position
        date_text_width = drawer.stringWidth(
            self.during_date, FONT_NAME, FONT_SIZE)
        date_position = (float(self.during_date_position[0]) - float(date_text_width)/2, float(
            self.certificate_img.height) - float(self.during_date_position[1]))

        # Write the name, event and date
        drawer.drawString(name_position[0], name_position[1], name)
        drawer.drawString(event_postion[0], event_postion[1], self.event_name)
        drawer.drawString(date_position[0], date_position[1], self.during_date)

        # Save the pdf with text written
        drawer.save()

    def update_csv(self, index) -> None:
        """
        Update the csv file with new data
        """
        self.df = self.df.drop(index=index)
        self.df.to_csv(self.data_path, index=False)

    @staticmethod
    def remove_extra_spaces(argument) -> str :
        """
        Remove extra spaces
        """
        return argument.strip()

    def send_email(self) -> None:
        """
        Send an email to the user with a link to download their certificate
        """
        for index, (name, email) in enumerate(zip(self.names, self.emails)):
            # Remove extra spaces
            name = self.remove_extra_spaces(name)
            email = self.remove_extra_spaces(email)

            # Make certificate
            self.draw_text_on_img(name)

            # Sending the mail
            status = self.mailer.send_mail(email, name)
            if status == "sent":
                self.update_csv(index)

        # Closing the template image
        self.certificate_img.close()
        print(f"{Style.BRIGHT}{Fore.GREEN}Script Running Completed.{Fore.RESET}{Style.RESET_ALL}", flush=True)

    def retry_failed_operation(self) -> None:
        """
        Retry failed operations from the csv file
        """

        # Reconfigure the remaining list
        self.store_participants_data()

        if len(self.names) == 0 or len(self.emails) == 0:
            pass
        else:
            print(
                f"{Style.BRIGHT}{Fore.YELLOW}Retrying the failed connection...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.send_email()

    def check_remaining(self) -> None:
        """
        Check how many participants are left and display it on screen
        """

        if len(self.names) == 0 or len(self.emails) == 0:
            print(f"{Style.BRIGHT}{Fore.GREEN}All the persons has been mailed, no need to run script again{Fore.RESET}{Style.RESET_ALL}")
        else:
            print(f'{Style.BRIGHT}{Fore.YELLOW}Some names are remaining in the list, you may run script again by running:{Fore.RESET}{Fore.BLUE} ./certimailer.sh {Fore.RESET}{Fore.YELLOW}to send mails to remaining persons. {Fore.RESET}{Style.RESET_ALL}')

    def configure_postion_and_details(self) -> None:
        """
        Set up the position of the QR code and details to be written on the certificate.
        The function will set these attributes for each individual in the dataframe.
        """
        
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring the event name and date..{Fore.RESET}{Style.RESET_ALL}")
        self.event_name = input(f"Enter {Style.BRIGHT}{Fore.YELLOW}event{Fore.RESET}{Style.RESET_ALL} name: ")
        self.during_date = input(f"Enter {Style.BRIGHT}{Fore.YELLOW}month{Fore.RESET}{Style.RESET_ALL} of event (eg: Jan'22): ")
        print(f"{Style.BRIGHT}{Fore.YELLOW}Configuring position of parameters, Refer: {Fore.RESET}{Fore.BLUE}https://www.image-map.net/ {Fore.RESET}{Fore.YELLOW}Take the middle postion for all postion seeking to configure{Fore.RESET}{Style.RESET_ALL}")
        name_position = input(
            f"Given {Style.BRIGHT}{Fore.YELLOW}name{Fore.RESET}{Style.RESET_ALL} position (values seprated by comma x,y): ")
        event_name_position = input(
            f"Given {Style.BRIGHT}{Fore.YELLOW}event{Fore.RESET}{Style.RESET_ALL} position (values seprated by comma x,y): ")
        date_position = input(f"{Style.BRIGHT}{Fore.YELLOW}Date position{Fore.RESET}{Style.RESET_ALL} (values seprated by comma x,y): ")
        self.name_position = tuple(element.strip() for element in name_position.split(','))
        self.event_name_postion = tuple(element.strip() for element in event_name_position.split(','))
        self.during_date_position = tuple(element.strip() for element in date_position.split(','))
