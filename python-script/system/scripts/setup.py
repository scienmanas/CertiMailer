'''
setup.py - Module for setting up email and password configurations, handling user inputs,
and activating the certificate generation system based on the chosen template type.

This module provides a class, CertiMailer, that serves as the main class for handling user inputs,
setting up necessary information, and activating the certificate generation system. It uses other
classes such as GenerateByImage and GenerateByPdf for specific template types.

Note: Make sure to set up the necessary configurations in the 'settings' module before using
this module.

'''

# Third-party imports
from colorama import init, Fore, Style

# Local application/library specific imports
from assets.logo import logo
from assets.cli_animations import Animations
from system import settings
from system.scripts.certificate_generator import GenerateByImage, GenerateByPdf
from system.scripts.checks import Checks


init(autoreset=True)  # Initialize colorama for cross-platform colored text

class CertiMailer:
    """
    CertiMailer - Main class for setting up email and password configurations and activating
    the certificate generation system.

    Attributes:
        check_paramters (Checks): Instance of the Checks class for checking user configurations.
        animations (Animations): Instance of the Animations class for displaying CLI animations.
        email (str): Email address used for certificate generation and sending.
        password (str): App password used for certificate generation and sending.
        template (str): Type of certificate template ('pdf' or 'png').
        generator_system (object): Instance of the certificate generation system based on the template type.

    Methods:
        __init__(self) -> None:
            Initialize the CertiMailer class.

        show_logo(self) -> None:
            Display the starting logo.

        run_setup(self) -> None:
            Handle user input and set up necessary information.

        remove_extra_spaces(self) -> None:
            Remove extra spaces in email and password.

        set_configuration(self) -> None:
            Set email, password, and template from user inputs.

        configure_credentials(self) -> None:
            Set up the email and password using the default method.

        get_template_type(self) -> None:
            Prompt the user to select the type of template ('pdf' or 'png').

        perform_checks(self) -> None:
            Check whether the entered details are valid and perform necessary checks.

        activate_pdf_system(self) -> None:
            Activate the PDF system for certificate generation and sending.

        activate_png_system(self) -> None:
            Activate the PNG system for certificate generation and sending.

        start_system(self) -> None:
            Start the system and call appropriate functions based on the chosen template type.
    """

    def __init__(self) -> None:
        """
        Initialize the CertiMailer class.

        This method creates instances of the Checks and Animations classes and initializes
        variables for email, password, template, and the generator system.

        Args:
            None

        Returns:
            None
        """
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
        print("Settings configured..")

    def run_setup(self) -> None:
        """
        Function to handle user input and set up necessary information
        """
        print(
            f"Checking for {Style.BRIGHT}{Fore.YELLOW}user's customizations{Fore.RESET}{Style.RESET_ALL}")

        if self.check_paramters.check_customization() is True :
            print(f"{Style.BRIGHT}{Fore.GREEN}Customization found...{Fore.RESET}{Style.RESET_ALL}")
            is_rechange_needed = input(f"Do you wan to change the email and password {Style.BRIGHT}{Fore.YELLOW}[Y/N]? {Fore.RESET}{Style.RESET_ALL}").lower()
            if is_rechange_needed == 'y' :
                self.configure_credentials()
            else :
                pass
        else:
            print(f"{Style.BRIGHT}{Fore.GREEN}No customization found, configuring the default setup{Fore.RESET}{Style.RESET_ALL}")
            self.configure_credentials()

    def remove_extra_spaces(self) -> None:
        """
        Removes extra spaces in a string
        """

        self.email = self.email.strip() if self.email is not None else None
        self.password = self.password.strip().replace(' ', '') if self.email is not None else None
    
    def set_configuration(self) -> None:
        """
        Sets email, password, and template from user inputs
        """

        # Read the existing content of the settings.py file
        with open(r'system/settings.py', 'r', encoding='utf-8') as settings_file:
            existing_content = settings_file.read()

        # Update the values in the existing content
        updated_content = existing_content.replace(f'EMAIL = "{settings.EMAIL}"', f'EMAIL = "{self.email}"')
        updated_content = updated_content.replace(f'PASSWORD = "{settings.PASSWORD}"', f'PASSWORD = "{self.password}"')

        # Write the updated content back to the settings.py file
        with open(r'system/settings.py', 'w', encoding='utf-8') as settings_file:
            settings_file.write(updated_content)

        # Update variables
        settings.EMAIL = self.email
        settings.PASSWORD = self.password

        print(f"{Style.BRIGHT}{Fore.GREEN}Email and Password updated successfully and saved!{Fore.RESET}{Style.RESET_ALL}")


    def configure_credentials(self) -> None:
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

    
    def perform_checks(self) :
        """
        Checks whether the entered details are valid or not
        Raises an exception if any field is empty
        """
        if settings.ONLY_CERTIFICATES == "OFF" :
            if self.check_paramters.check_credentials() is False :
                self.configure_credentials()
                self.perform_checks()
        self.check_paramters.check_csv_updation()
        self.check_paramters.is_template_available(self.template)


    def activate_pdf_system(self) -> None:
        """
        Activates the PDF system by configuring the generator system,
        performing animations, sending emails, retrying failed operations,
        and checking for remaining tasks.
        """

        self.generator_system = GenerateByPdf()
        self.generator_system.configure_postion_and_details()
        self.animations.cli_animation_1()
        self.animations.cli_animation_2()
        self.generator_system.start_system()
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
        self.animations.cli_animation_1()
        self.animations.cli_animation_2()
        self.generator_system.start_system()
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
