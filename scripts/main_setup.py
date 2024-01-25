"""
CertiMailer - Automated Certificate Mailer

This script provides a command-line interface (CLI) for automating the generation and mailing of certificates.

Dependencies:
- sys
- os
- time
- pandas
- colorama (required for colored text in CLI)
- logo (custom module for displaying a logo)
- certificate_generator (custom module for generating certificates from image or PDF)
- emailer (custom module for sending emails)

Classes:
- Animations: Provides animations to the CLI.
- Checks: Checks if all necessary packages are installed and prints appropriate messages. Installs missing packages using pip.
- CertiMailer: Main class that handles user inputs and calls other classes to generate certificates.

Methods:
- Animations.animation_1(): Setting up animation.
- Animations.animation_2(): Starting mailer system animation.
- Checks.check_csv_updation(): Checks if the CSV file is updated.
- Checks.is_template_available(template_type): Checks if a template of the given type exists in the 'templates' folder.
- CertiMailer.show_logo(): Displays the starting logo.
- CertiMailer.run_setup(): Handles user input and sets up necessary information.
- CertiMailer.remove_extra_spaces(): Removes extra spaces in a string.
- CertiMailer.default_setup(): Sets up the email and password using the default method.
- CertiMailer.get_template_type(): Prompts the user to select the type of template.
- CertiMailer.configure_csv_check(): Configures CSV file check, either from URL or local path.
- CertiMailer.check_template_status(): Checks whether the template type is set or not.
- CertiMailer.activate_pdf_system(): Activates the PDF system for generating certificates from PDF.
- CertiMailer.activate_png_system(): Activates PNG system for generating certificates from images.
- CertiMailer.start_system(): Starts the system and calls appropriate functions based on the template type.

Usage:
- Run this script to automate the process of generating and mailing certificates.

Note: Ensure 'names.csv' is updated with correct data, and template files are available in the 'templates' folder.
"""

# Standard library imports
import sys
import os
import time

# Third-party imports
import pandas
from colorama import init, Fore, Style

# Local application/library specific imports
from scripts.certificate_generator import GenerateByImage, GenerateByPdf
from scripts.emailer import Emailer
from assets.logo import logo
from scripts import settings


init(autoreset=True)  # Initialize colorama for cross-platform colored text


class Animations():
    """
    This class provides animations to the CLI.
    """

    def __init__(self) -> None:
        pass

    @staticmethod
    def animation_1() -> None:
        """
        Setting up animation
        """
        animation_chars = "-\|/"
        for _ in range(10):
            for char in animation_chars:
                print(
                    f"\r{Style.BRIGHT}{Fore.GREEN}Setting up... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
                time.sleep(0.1)
        print()

    @staticmethod
    def animation_2() -> None:
        """
        Starting mailer system animation
        """
        animation_chars = "-\|/"
        for _ in range(10):
            for char in animation_chars:
                print(
                    f"\r{Style.BRIGHT}{Fore.GREEN}Starting the mailer system... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
                time.sleep(0.1)
        print()


class Checks():
    """
    This class checks if all necessary packages are installed and prints appropriate messages.
    If not it will install them using pip.
    """

    def __init__(self) -> None:
        pass

    @staticmethod
    def check_csv_updation() -> bool:
        """
        Check if csv file is updated or not
        """
        df = pandas.read_csv(r"data/names.csv")
        names = df['Name'].to_list()
        emails = df['Email'].tolist()
        if len(names) != len(emails) and len(names) == 0 and len(emails) == 0:
            print(
                f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv'{Fore.RESET}{Style.RESET_ALL}")
            return False
        else:
            return True

    @staticmethod
    def is_template_available(template_type) -> bool:
        """
        Check if template of given type exists in templates folder
        Args:
        type (str): Type of email to be checked, can be html/txt
        Returns:
        Bool: True if available otherwise False
        """
        directory_path = "templates"
        file_name = f"sample.{template_type}"
        path = os.path.join(directory_path, file_name)
        if os.path.exists(path):
            return True
        else:
            return False


class CertiMailer():
    """
    This class is the main class that handles user inputs and calls other classes to generate certificates.
    """

    def __init__(self) -> None:
        self.check_paramters = Checks()
        self.animations = Animations()
        self.email = str()
        self.password = str()
        self.template = str()
        self.generator_system = object()

    def show_logo(self) -> None:
        """
        Function to show the starting logo
        """
        print(logo)
        print("Configuring the settings..")
        time.sleep(1)

    def run_setup(self) -> None:
        """
        Function to handle user input and set up necessary information
        """
        print(
            f"Checking for {Style.BRIGHT}{Fore.YELLOW}user's customizations{Fore.RESET}{Style.RESET_ALL}")
        time.sleep(1)

        dummy_checker = Emailer()
        if dummy_checker.check_customization() is True :
            print(f"{Style.BRIGHT}{Fore.GREEN}Customization found, configuring the customization...{Fore.RESET}{Style.RESET_ALL}")
            del dummy_checker
            time.sleep(1)
        else:
            print(f"{Style.BRIGHT}{Fore.GREEN}No customization found, configuring the default setup{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.default_setup()

    def remove_extra_spaces(self) -> None:
        """
        Removes extra spaces in a string
        """
        self.email.strip()
        self.password.strip().replace(' ', '')
    
    def set_configuration(self) -> None :
        """
        Sets email, password, and template from user inputs
        """
        settings.EMAIL = self.email
        settings.PASSWORD = self.password

        # Read the existing content of the settings.py file
        with open(r'scripts/settings.py', 'r', encoding='utf-8') as settings_file:
            existing_content = settings_file.read()

        # Update the values in the existing content
        updated_content = existing_content.replace('EMAIL = "none"', f'EMAIL = "{self.email}"')
        updated_content = updated_content.replace('PASSWORD = "none"', f'PASSWORD = "{self.password}"')

        # Write the updated content back to the settings.py file
        with open(r'scripts/settings.py', 'w', encoding='utf-8') as settings_file:
            settings_file.write(updated_content)

        print(f"{Style.BRIGHT}{Fore.GREEN}Email and Password updated successfully and saved!{Fore.RESET}{Style.RESET_ALL}")

    def default_setup(self) -> None:
        """
        Sets up the email and password using the default method
        """
        self.email = input("Enter the account email: ")
        self.password = input(
            f"Enter App Password {Style.BRIGHT}{Fore.LIGHTRED_EX}(Check tutorial video in readme){Fore.RESET}{Style.RESET_ALL} : ")
        self.remove_extra_spaces()
        self.set_configuration()

    def get_template_type(self) -> None:
        """
        Prompts the user to select the type of template they want to use, then sets that as the current template type
        """
        print(f'Type "{Fore.YELLOW}pdf{Fore.RESET}" if you have a template in .pdf format and "{Fore.YELLOW}png{Fore.RESET}" if the template is in .png format: ')
        self.template = input().strip().lower()

        if self.template != "pdf" and self.template != "png":
            print(f"\n{Style.BRIGHT}{Fore.RED}Invalid Template Type. Please enter either {Fore.RESET}{Fore.YELLOW}'pdf'{Fore.RESET} or {Fore.YELLOW}'png'{Fore.RESET}{Fore.RED}.{Fore.RESET}{Style.RESET_ALL}")
            self.get_template_type()
        else:
            pass

    def configure_csv_check(self) -> None:
        """
        Configures csv file check, either from URL or local path
        """
        print(f"{Style.BRIGHT}{Fore.GREEN}Checking the entries in names.csv file...{Fore.RESET}{Style.RESET_ALL}")
        time.sleep(1)
        if self.check_paramters.check_csv_updation():
            print(f"{Style.BRIGHT}{Fore.GREEN}CSV file found updated..")
            time.sleep(1)
        else:
            print(
                f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv' and {Fore.RESET}{Style.RESET_ALL}")
            sys.exit()

    def check_template_status(self) -> None:
        """
        Checks whether template type is set or not
        If not it informs user and exit the programme .
        """
        if self.check_paramters.is_template_available(self.template):
            print(
                f"{Style.BRIGHT}{Fore.GREEN}Loading the template to the system..{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
        else:
            print(
                f"{Style.BRIGHT}{Fore.RED}Error: cannot find the template..{Style.RESET_ALL}{Fore.RESET}")
            print("Existing the programme..")
            sys.exit()

    def activate_pdf_system(self) -> None:
        """
        Activates the PDF system by configuring the generator system,
        performing animations, sending emails, retrying failed operations,
        and checking for remaining tasks.
        """

        self.generator_system = GenerateByPdf()
        self.generator_system.configure_postion_and_details()
        self.animations.animation_1()
        self.animations.animation_2()
        self.generator_system.send_email()
        self.generator_system.retry_failed_operation()
        self.generator_system.check_remaining()
        
        del self.generator_system

    def activate_png_system(self) -> None:
        """
        Activates PNG System which generates images from text data
        and sends them as an email attachment.
        """

        self.generator_system = GenerateByImage()
        self.generator_system.configure_postion_and_details()
        self.animations.animation_1()
        self.animations.animation_2()
        self.generator_system.send_email()
        self.generator_system.retry_failed_operation()
        self.generator_system.check_remaining()

        del self.generator_system

    def start_system(self) -> None:
        """
        Starts the system and then calls appropriate functions based on Template Type
        """
        if self.template == 'pdf':
            self.activate_pdf_system()
        else:
            self.activate_png_system()
