from certificate_generator import GenerateByImage, GenerateByPdf
from emailer import Emailer
import time
import pandas
import sys
import os
from colorama import init, Fore, Style
from logo import logo

init(autoreset=True)  # Initialize colorama for cross-platform colored text

class Animations() :
    """
    This class provides animations to the CLI.
    """

    def __init__(self) -> None:
        pass

    @staticmethod
    def _animation_1() -> None :
        animation_chars = "-\|/"
        for _ in range(10):
            for char in animation_chars:
                print(f"\r{Style.BRIGHT}{Fore.GREEN}Setting up... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
                time.sleep(0.1)
        print()

    @staticmethod
    def _animation_2() -> None :
        animation_chars = "-\|/"
        for _ in range(10):
            for char in animation_chars:
                print(f"\r{Style.BRIGHT}{Fore.GREEN}Starting the mailer system... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
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
    def check_csv_updation() -> bool :
        """
        Check if csv file is updated or not
        """
        df = pandas.read_csv(r"names.csv")
        names = df['Name'].to_list()
        emails = df['Email'].tolist()
        if len(names) != len(emails) or len(names) is 0 or len(emails) is 0 :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv'{Fore.RESET}{Style.RESET_ALL}")
            return False
        else :
            return True
        
    @staticmethod
    def is_template_available(template_type) -> bool :
        """
        Check if template of given type exists in templates folder
        Args:
        type (str): Type of email to be checked, can be html/txt
        Returns:
        Bool: True if available otherwise False
        """
        directory_path = "template"
        file_name = f"sample.{template_type}"
        path = os.path.join(directory_path, file_name)
        if os.path.exists(path) :
            return True
        else :
            return False


class CertiMailer():
    """
    This class is the main class that handles user inputs and calls other classes to generate certificates.
    """

    def __init__(self) -> None:
        self.check_paramters = Checks()
        self.email = str()
        self.password = str()
        self.template = str()

    def show_logo(self) -> None :
        """
        function to show the starting logo
        """
        print(logo)
        print("Configuring the basic settings enter...")
        time.sleep(1)

    def run_setup(self) -> None: 
        """
        Function to handle user input and set up necessary information
        """
        print("Checking for {Style.BRIGHT}{Fore.YELLOW}user's customizations{Fore.RESET}{Style.RESET_ALL}")
        time.sleep(1)
 
        dummy_checker = Emailer()
        if dummy_checker.is_customization_done() is False :
            print(f"{Style.BRIGHT}{Fore.GREEN}Customization found, configuring the customization...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
        else :
            print(f"{Style.BRIGHT}{Fore.GREEN}No customization found, configuring the default setup{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.default_setup()
    # Erros due to copy-pasting omited 
    def remove_extra_spaces(self) -> None:
        """
        Removes extra spaces in a string
        """
        self.email.strip()
        self.password.strip().replace(' ','')

    def default_setup(self) -> None:
        """
        Sets up the email and password using the default method
        """
        self.email = input("Enter the account email: ")
        self.password = input(f"Enter App Password {Style.BRIGHT}{Fore.LIGHTRED_EX}(Check tutorial video in readme){Fore.RESET}{Style.RESET_ALL} : ")
        self.remove_extra_spaces()

    def get_template_type(self) -> None :
        """
        Prompts the user to select the type of template they want to use, then sets that as the current template type
        """
        print(f'Type "{Fore.YELLOW}pdf{Fore.RESET}" if you have a template in .pdf format and "{Fore.YELLOW}png{Fore.RESET}" if the template is in .png format: ')
        self.template = input()

        if self.template.lower() is "pdf" or "png" :
            print(f"\n{Style.BRIGHT}{Fore.RED}Invalid Template Type. Please enter either {Fore.RESET}{Fore.YELLOW}'pdf'{Fore.RESET} or {Fore.YELLOW}'png'{Fore.RESET}{Fore.RED}.{Fore.RESET}{Style.RESET_ALL}")
            self.get_template_type()
        else :
            pass

    def configure_csv_check(self) -> None:
        """
        Configures csv file check, either from URL or local path
        """
        print(f"{Style.BRIGHT}{Fore.GREEN}Checking the entries in names.csv file...{Fore.RESET}{Style.RESET_ALL}")
        time.sleep(1)
        if self.check_paramters.check_csv_updation() :
            print(f"{Style.BRIGHT}{Fore.GREEN}CSV file found updated..")
            time.sleep(1)
        else :
            print(f"{Style.BRIGHT}{Fore.YELLOW}Please update the 'names.csv' and {Fore.RESET}{Style.RESET_ALL}")
            sys.exit()

    def check_template_status(self) -> None :
        """
        Checks whether template type is set or not
        If not it informs user and exit the programme .
        """
        if self.check_paramters.is_template_available(self.template) :
            print(f"{Style.BRIGHT}{Fore.GREEN}Updating the template in the template folder...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
        else :
            print(f"{Style.BRIGHT}{Fore.RED}Error: cannot find the template..{Style.RESET_ALL}{Fore.RESET}")
            print("Existing the programme..")
            sys.exit()

    def start_system(self) -> None :
        

# Initialize the generator based on the chosen template type
while True :
    if TEMPLATE_TYPE.lower() == 'pdf':
        certificate_generator_pdf = GenerateByPdf(EMAIL, PASSWORD)
        if (certificate_generator_pdf.is_csv_updated() == "break") :
            break
        certificate_generator_pdf.configure_postion_and_details()
        _animation()
        _script_animation()
        certificate_generator_pdf.send_email()
        certificate_generator_pdf.retry_failed_operation()
        certificate_generator_pdf.check_remaining()
        break
    elif TEMPLATE_TYPE.lower() == 'png':
        certificate_generator_pdf = GenerateByImage(EMAIL, PASSWORD)
        if (certificate_generator_pdf.is_csv_updated() == "break") :
            break
        certificate_generator_pdf.configure_postion_and_details()
        _animation()
        _script_animation()
        certificate_generator_pdf.send_email()
        certificate_generator_pdf.retry_failed_operation()
        certificate_generator_pdf.check_remaining()
        break
    else:

        TEMPLATE_TYPE = _get_template_type()