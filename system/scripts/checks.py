'''
Module: checks.py

This module contains a class 'Checks' that provides functions to check and validate
various aspects of the email sending application.

Dependencies:
- os
- sys
- smtplib
- importlib
- colorama
- pandas
- system.settings

'''

import os
import sys
import smtplib
import importlib
from colorama import Fore, Style, init
import pandas
from system import settings

init(autoreset=True)  # Initialize colorama for cross-platform colored text

class Checks():
    """
    This class checks if all necessary packages are installed and prints appropriate messages.
    If not, it will install them using pip.
    """

    def __init__(self) -> None:
        pass

    @staticmethod
    def check_csv_updation() -> None  :
        """
        Check if csv file is updated or not.
        """
        df = pandas.read_csv(os.path.join(settings.DATA_DIRECTORY, "names.csv"))
        names = df['Name'].to_list()
        emails = df['Email'].tolist()
        if len(names) != len(emails) or len(names) == 0 or len(emails) == 0:
            print(
                f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv'{Fore.RESET}{Style.RESET_ALL}")
            sys.exit()
        else:
            print(len(names))
            print(len(emails))
            print(f"{Style.BRIGHT}{Fore.GREEN}CSV file found updated..")

    @staticmethod
    def is_template_available(template_type) -> None:
        """
        Check if template of given type exists in templates folder.

        Args:
            template_type (str): Type of email to be checked, can be html/txt.

        Returns:
            None
        """
        directory_path = settings.TEMPLATE_DIRECTORY
        file_name = f"{settings.TEMPLATE_NAME}.{template_type}"
        path = os.path.join(directory_path, file_name)
        if os.path.exists(path):
            print(
                f"{Style.BRIGHT}{Fore.GREEN}Template loaded to system..{Fore.RESET}{Style.RESET_ALL}")
        else:
            print(
                f"{Style.BRIGHT}{Fore.RED}Error: cannot find the template..{Style.RESET_ALL}{Fore.RESET}")
            print("Exiting the program..")
            sys.exit()
        
    @staticmethod
    def check_customization() -> bool:
        """
        Check if email and password settings are customized.

        Returns:
            bool: True if email and password settings are customized, False otherwise.
        """
        if len(settings.EMAIL) == 0 and len(settings.PASSWORD) == 0:
            return False
        return True
    
    @staticmethod
    def check_credentials () -> bool :
        """
        Validate Email & Password from settings file.

        Returns:
            bool: True on success, False on failure.
        """
        importlib.reload(settings)
        server = object()
        status = bool()
        try:
            server = smtplib.SMTP(settings.SMTP_SERVER, timeout=settings.SERVER_TIMEOUT)
            server.starttls()
            server.login(settings.EMAIL, settings.PASSWORD)
            print(f"{Style.BRIGHT}{Fore.GREEN}Credentials verified with mail server{Fore.RESET}{Style.RESET_ALL}")
            server.quit()
            del server
            status = True
        except Exception as e :
            print(f"{Style.BRIGHT}{Fore.RED}Error in credentials:{Fore.RESET}{Fore.YELLOW}{e}{Fore.RESET}{Style.RESET_ALL}")
            status = False
        return status
