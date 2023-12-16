from certificate_generator import GenerateByImage, GenerateByPdf
import time

# ASCII Art logo
logo = """
\033[1;36m░█████╗░███████╗██████╗░████████╗██╗███╗░░░███╗░█████╗░██╗██╗░░░░░███████╗██████╗░
██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║████╗░████║██╔══██╗██║██║░░░░░██╔════╝██╔══██╗
██║░░╚═╝█████╗░░██████╔╝░░░██║░░░██║██╔████╔██║███████║██║██║░░░░░█████╗░░██████╔╝
██║░░██╗██╔══╝░░██╔══██╗░░░██║░░░██║██║╚██╔╝██║██╔══██║██║██║░░░░░██╔══╝░░██╔══██╗
╚█████╔╝███████╗██║░░██║░░░██║░░░██║██║░╚═╝░██║██║░░██║██║███████╗███████╗██║░░██║
░╚════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝╚══════╝╚══════╝╚═╝░░╚═╝
\033[0mThe Complete solution for automatic certificates mailing
"""
print(logo)
print("Configuring the basic settings ")

# Get user credentials
EMAIL = input("Enter the account email: ")
PASSWORD = input("Enter App Password, For setting up app password, follow the tutorial: link: ")

# Inform user to update entries in names.csv and template folder
print("Updating entries in names.csv file...")
time.sleep(2)

print("Updating the template in the template folder...")
time.sleep(2)

# Function to get template type
def _get_template_type() -> None:
    type = input()
    return type

# Inform user to choose template type
print('Type "\033[1;33mpdf\033[0m" if you have a template in .pdf format and "\033[1;33mpng\033[0m" if the template is in .png format: ')
TEMPLATE_TYPE = _get_template_type()

# Rotating animation with changing color during setup
animation_chars = "-\|/"
for _ in range(10):
    for char in animation_chars:
        print(f"\r\033[1;32mSetting up... {char}\033[0m", end="", flush=True)
        time.sleep(0.1)

print()
# Initialize the generator based on the chosen template type
if TEMPLATE_TYPE.lower() == 'pdf':
    GENERATOR = GenerateByPdf()
elif TEMPLATE_TYPE.lower() == 'png':
    GENERATOR = GenerateByImage()
    # Add some delay or animation here
    GENERATOR._send_email()
else:
    print("\n\033[1;31mInvalid Template Type. Please enter either 'pdf' or 'png'.\033[0m")
    TEMPLATE_TYPE = _get_template_type()