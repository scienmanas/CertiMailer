'''
emailer.py - Module for sending emails with attachments using the smtplib library.

This module provides a class, Emailer, that encapsulates the functionality for sending emails
with attachments. It uses the smtplib library for SMTP communication and supports HTML content
templates from the boilerplates module.

Note: Make sure to set up the necessary configurations in the 'settings' module before using
this module.

'''

import smtplib
import importlib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from colorama import init, Fore, Style
from boilerplates.templates import HTML_CONTENT
from system import settings

init(autoreset=True)  # Initialize colorama for cross-platform colored text


class Emailer:
    """
    Emailer - Class for sending emails with attachments.

    Attributes:
        None

    Methods:
        __init__(self) -> None:
            Initialize the Emailer class.

        send_mail(self, receipient: str, name: str) -> str:
            Send an email with an attachment to the specified recipient.

            Args:
                receipient (str): Email address of the recipient.
                name (str): Name of the recipient.

            Returns:
                str: Status of the email sending process ("sent" if successful, "failed" otherwise).
    """

    def __init__(self) -> None:
        """
        Initialize the Emailer class.

        This method reloads the settings module using importlib to ensure the latest
        configuration settings are used.

        Args:
            None

        Returns:
            None
        """
        importlib.reload(settings)

    def send_mail(self, receipient: str, name: str) -> str:
        """
        Send an email with an attachment to the specified recipient.

        Args:
            receipient (str): Email address of the recipient.
            name (str): Name of the recipient.

        Returns:
            str: Status of the email sending process ("sent" if successful, "failed" otherwise).
        """
        mailer_object = MIMEMultipart()
        name_ = "Coders Conclave"
        mailer_object['From'] = f"{name_} <{settings.EMAIL}>"
        mailer_object['To'] = f"{name} <{receipient}>"

        # Recipient Address
        mailer_object['Subject'] = "Participation Certificate, Astrophotography Workshop: Athereum 2.0"

        html_part = MIMEText(HTML_CONTENT.get(settings.EMAIL_BOILERPLATE), 'html')
        mailer_object.attach(html_part)

        # Attaching the File
        attachment_path = f"Certificates/{name}.pdf"
        with open(attachment_path, 'rb') as attachment:
            attachment_part = MIMEApplication(attachment.read())
            attachment_part.add_header('Content-Disposition', 'attachment', filename=f'{name}.pdf')
            mailer_object.attach(attachment_part)

        # Send Mail
        try:
            connection = smtplib.SMTP(settings.SMTP_SERVER, timeout=settings.SERVER_TIMEOUT)
            connection.starttls()
            connection.login(user=settings.EMAIL, password=settings.PASSWORD)
            connection.sendmail(mailer_object["From"], [receipient], mailer_object.as_string())
            connection.quit()
            print(f'Email sent successfully to {Style.BRIGHT}{Fore.YELLOW}{name}{Fore.RESET}{Style.RESET_ALL}')
            return "sent"
        except Exception as e:
            print(f"{Style.BRIGHT}{Fore.RED}Email could not be sent to{Fore.RESET} {Fore.YELLOW}{name}{Fore.RESET} : {Fore.RED}{str(e)}{Fore.RESET}{Style.RESET_ALL}")
            return "failed"
