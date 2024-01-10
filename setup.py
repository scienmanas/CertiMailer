from certificate_generator import GenerateByImage, GenerateByPdf
from emailer import Emailer
import time
from colorama import init, Fore, Style
from logo import logo

init(autoreset=True)  # Initialize colorama for cross-platform colored text

class CertiMailer():

    def __init__(self) -> None:
        self.email = ""
        self.password = ""

    def show_logo(self) -> None :
        print(logo)
        print("Configuring the basic settings enter...")
        time.sleep(1)

    def run_setup(self) -> None: 
        print("Checking for {Style.BRIGHT}{Fore.YELLOW}user's customizations{Fore.RESET}{Style.RESET_ALL}")
        time.sleep(1)
        # Check for email and password cutomization
        dummy_checker = Emailer()
        if dummy_checker.is_customization_done() == False :
            print(f"{Style.BRIGHT}{Fore.GREEN}Customization found, configuring the customization...{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
        else :
            print(f"{Style.BRIGHT}{Fore.GREEN}No customization found, configuring the default setup{Fore.RESET}{Style.RESET_ALL}")
            time.sleep(1)
            self.default_setup()
    # Erros due to copy-pasting omited 
    def remove_extra_spaces(self) -> None:
        self.email.strip()
        self.password.strip().replace(' ','')

    def default_setup(self) -> None:
        self.email = input("Enter the account email: ")
        self.password = input(f"Enter App Password {Style.BRIGHT}{Fore.LIGHTRED_EX}(Check tutorial video in readme){Fore.RESET}{Style.RESET_ALL} : ")
        self.remove_extra_spaces()
    

# Function to get template type
def _get_template_type() -> None:
    type = input()
    return type

# Inform user to choose template type
print(f'Type "{Fore.YELLOW}pdf{Fore.RESET}" if you have a template in .pdf format and "{Fore.YELLOW}png{Fore.RESET}" if the template is in .png format: ')

TEMPLATE_TYPE = _get_template_type()

# Rotating animation with changing color during setup
def _animation() -> None :
    animation_chars = "-\|/"
    for _ in range(10):
        for char in animation_chars:
            print(f"\r{Style.BRIGHT}{Fore.GREEN}Setting up... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
            time.sleep(0.1)
    print()

def _script_animation() -> None :
    animation_chars = "-\|/"
    for _ in range(10):
        for char in animation_chars:
            print(f"\r{Style.BRIGHT}{Fore.GREEN}Starting the mailer system... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
            time.sleep(0.1)
    print()

# Inform user to update entries in names.csv and template folder
print(f"{Style.BRIGHT}{Fore.GREEN}Checking the entries in names.csv file...{Fore.RESET}{Style.RESET_ALL}")
time.sleep(2)

print(f"{Style.BRIGHT}{Fore.GREEN}Updating the template in the template folder...{Fore.RESET}{Style.RESET_ALL}")
time.sleep(2)

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
        print(f"\n{Style.BRIGHT}{Fore.RED}Invalid Template Type. Please enter either {Fore.RESET}{Fore.YELLOW}'pdf'{Fore.RESET} or {Fore.YELLOW}'png'{Fore.RESET}{Fore.RED}.{Fore.RESET}{Style.RESET_ALL}")
        TEMPLATE_TYPE = _get_template_type()