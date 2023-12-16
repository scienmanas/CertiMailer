from certificate_generator import GenerateByImage, GenerateByPdf
import time

# Configure the email address and password
logo = """

░█████╗░███████╗██████╗░████████╗██╗███╗░░░███╗░█████╗░██╗██╗░░░░░███████╗██████╗░
██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║████╗░████║██╔══██╗██║██║░░░░░██╔════╝██╔══██╗
██║░░╚═╝█████╗░░██████╔╝░░░██║░░░██║██╔████╔██║███████║██║██║░░░░░█████╗░░██████╔╝
██║░░██╗██╔══╝░░██╔══██╗░░░██║░░░██║██║╚██╔╝██║██╔══██║██║██║░░░░░██╔══╝░░██╔══██╗
╚█████╔╝███████╗██║░░██║░░░██║░░░██║██║░╚═╝░██║██║░░██║██║███████╗███████╗██║░░██║
░╚════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝╚══════╝╚══════╝╚═╝░░╚═╝

            The Complete solution for automatic certificates mailing

"""
print(logo)
print("Configuring the basic settings ")

EMAIL = input("Enter the account email: ")
PASSWORD = input("Enter App Password, For setting up app password, follow the tutorial: link: ")

print("Update the entries of names.csv file")
# Add delay lke something enter pressing
print("Update your template in template folder, kepping the template name same ,eg: sameple.png or sameple.pdf")
# same with this
def _get_template_type() -> None :
    type = input()
    return type

# Add Delay 
# print somenice here like animation of staring 
    
print('Type "pdf" if you have templte in .pdf format and "png" if templte is in .png format: ')

TEMPLATE_TYPE = _get_template_type()
if (TEMPLATE_TYPE.lower() == 'pdf') :
    GENERATOR = GenerateByPdf()
elif (TEMPLATE_TYPE.lower() == 'png') :
    GENERATOR = GenerateByImage()
    GENERATOR._send_email()
else :
    print("Invalid Template Type\nPlease Enter either 'pdf' or 'png' ")
    TEMPLATE_TYPE = _get_template_type()
