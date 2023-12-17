from certificate_generator import GenerateByImage, GenerateByPdf
import time
import keyboard
from colorama import init, Fore, Style


init(autoreset=True)  # Initialize colorama for cross-platform colored text

# ASCII Art logo
logo = f"""
{Fore.CYAN}
░█████╗░███████╗██████╗░████████╗██╗███╗░░░███╗░█████╗░██╗██╗░░░░░███████╗██████╗░
██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║████╗░████║██╔══██╗██║██║░░░░░██╔════╝██╔══██╗
██║░░╚═╝█████╗░░██████╔╝░░░██║░░░██║██╔████╔██║███████║██║██║░░░░░█████╗░░██████╔╝
██║░░██╗██╔══╝░░██╔══██╗░░░██║░░░██║██║╚██╔╝██║██╔══██║██║██║░░░░░██╔══╝░░██╔══██╗
╚█████╔╝███████╗██║░░██║░░░██║░░░██║██║░╚═╝░██║██║░░██║██║███████╗███████╗██║░░██║
░╚════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝╚══════╝╚══════╝╚═╝░░╚═╝

            {Fore.RESET}The Complete solution for automatic certificates mailing

"""
print(logo)
print(f"Configuring the basic settings enter {Style.BRIGHT}{Fore.YELLOW} 'auto' {Fore.RESET}{Style.RESET_ALL} if already configure in the emailer file")

# Get user credentials
EMAIL = input("Enter the account email: ")
PASSWORD = input("Enter App Password, For setting up app password, follow the tutorial: link: ")

# Erros due to copy-pasting omited 
EMAIL = EMAIL.strip()
PASSWORD = PASSWORD.strip().replace(' ','')

# Inform user to update entries in names.csv and template folder
print(f"{Style.BRIGHT}{Fore.GREEN}Updating entries in names.csv file...{Fore.RESET}{Style.RESET_ALL}")
time.sleep(2)

print(f"{Style.BRIGHT}{Fore.GREEN}Updating the template in the template folder...{Fore.RESET}{Style.RESET_ALL}")
time.sleep(2)

# Function to get template type
def _get_template_type() -> None:
    type = input()
    return type

# Inform user to choose template type
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

def _script_animation() -> None :
    animation_chars = "-\|/"
    for _ in range(10):
        for char in animation_chars:
            print(f"\r{Style.BRIGHT}{Fore.GREEN}Starting the mailer system... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
            time.sleep(0.1)
    print()

_animation()
print()
# Initialize the generator based on the chosen template type
while True :
    if TEMPLATE_TYPE.lower() == 'pdf':
        GENERATOR = GenerateByPdf()
        _script_animation()
        # GENERATOR.send_email()
        break
    elif TEMPLATE_TYPE.lower() == 'png':
        GENERATOR = GenerateByImage(EMAIL, PASSWORD)
        _script_animation()
        GENERATOR._send_email()
        GENERATOR._retry_failed_operation()
        GENERATOR._check_remaining()
        break
    else:
        print(f"\n{Style.BRIGHT}{Fore.RED}Invalid Template Type. Please enter either {Fore.RESET}{Fore.YELLOW}'pdf'{Fore.RESET} or {Fore.YELLOW}'png'{Fore.RESET}{Fore.RED}.{Fore.RESET}{Style.RESET_ALL}")
        TEMPLATE_TYPE = _get_template_type()