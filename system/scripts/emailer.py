"""
emailer.py - Module for sending emails with attachments using the smtplib library.

This module provides a class, Emailer, that encapsulates the functionality for sending emails
with attachments. It uses the smtplib library for SMTP communication and supports HTML content
templates from the boilerplates module.

Note: Make sure to set up the necessary configurations in the 'settings' module before using
this module.

"""

import smtplib
import os
import importlib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from colorama import init, Fore, Style
from boilerplates.templates import HTML_CONTENT, PLAIN_CONTENT
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

        attach_mail_contents(self, name: str, receipient: str) -> None:
            Attach sender name, email subject, and email content based on HTML or plain text boilerplate.

        attach_certificate(self, name: str) -> None:
            Attach the certificate file to the email.

        attach_boilerplate(self) -> None:
            Attach email content based on HTML or plain text boilerplate.

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
        configuration settings are used. Also, it configures the content object.

        Args:
            None

        Returns:
            None
        """
        self.mailer_object = object
        importlib.reload(settings)

    def attach_mail_contents(self, name: str, receipient: str) -> None:
        """
        Attach sender name, email subject, and email content based on HTML or plain text boilerplate.

        Args:
            name (str): Name of the recipient.
            receipient (str): Email address of the recipient.

        Returns:
            None
        """
        self.mailer_object['From'] = f"{settings.SENDER_NAME} <{settings.EMAIL}>"
        self.mailer_object['Subject'] = settings.MAIL_SUBJECT
        self.attach_boilerplate()
        self.mailer_object['To'] = f"{name} <{receipient}>"

    def attach_certificate(self, name: str) -> None:
        """
        Attach the certificate file to the email.

        Args:
            name (str): Name of the recipient.

        Returns:
            None
        """
        # Attaching the File
        attachment_path = os.path.join(settings.OUTPUT_DIRECTORY, f"{name}.pdf")
        with open(attachment_path, 'rb') as attachment:
            attachment_part = MIMEApplication(attachment.read())
            attachment_part.add_header('Content-Disposition', 'attachment', filename=f'{name}.pdf')
            self.mailer_object.attach(attachment_part)

    def attach_boilerplate(self) -> None:
        """
        Attach email content based on HTML or plain text boilerplate.

        Args:
            None

        Returns:
            None
        """
        if settings.HTLM_BOILERPLATE == "ON":
            content = MIMEText(HTML_CONTENT.get(settings.EMAIL_BOILERPLATE), 'html')
        else:
            content = MIMEText(PLAIN_CONTENT.get(settings.EMAIL_BOILERPLATE), 'plain')
        self.mailer_object.attach(content)

    def send_mail(self, receipient: str, name: str) -> str:
        """
        Send an email with an attachment to the specified recipient.

        Args:
            receipient (str): Email address of the recipient.
            name (str): Name of the recipient.

        Returns:
            str: Status of the email sending process ("sent" if successful, "failed" otherwise).
        """
        self.mailer_object = MIMEMultipart()
        self.attach_mail_contents(name=name, receipient=receipient)
        self.attach_certificate(name=name)

        # Send Mail
        try:
            connection = smtplib.SMTP(settings.SMTP_SERVER, timeout=settings.SERVER_TIMEOUT)
            connection.starttls()
            connection.login(user=settings.EMAIL, password=settings.PASSWORD)
            connection.sendmail(self.mailer_object["From"], [receipient], self.mailer_object.as_string())
            connection.quit()
            print(f'Email sent successfully to {Style.BRIGHT}{Fore.YELLOW}{name}{Fore.RESET}{Style.RESET_ALL}')
            self.mailer_object = None
            return "sent"
        except Exception as e:
            print(
                f"{Style.BRIGHT}{Fore.RED}Email could not be sent to{Fore.RESET} {Fore.YELLOW}{name}{Fore.RESET} : {Fore.RED}{str(e)}{Fore.RESET}{Style.RESET_ALL}")
            self.mailer_object = None
            return "failed"
