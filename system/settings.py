'''
This module contains the configuration settings for the application.

Attributes:
    EMAIL (str): The email address used for sending emails.
    PASSWORD (str): The password for the email account.
    EMAIL_BOILERPLATE (int): The boilerplate number for the email.
    FONT_SIZE (int): The font size for the certificates.
    FONT_NAME (str): The name of the font used in the certificates.
    FONT_DIRECTORY (str): The directory where the font file is located.
    TEXT_COLOUR (tuple): The RGB color code for the text in the certificates.
    OUTPUT_DIRECTORY (str): The directory where the certificates will be saved.
    TEMPLATE_DIRECTORY (str): The directory where the certificate templates are located.
    DATA_DIRECTORY (str): The directory where the data for the certificates is located.
    TEMPLATE_NAME (str): The name of the certificate template to use.
    SMTP_SERVER (str): The SMTP server for sending emails.
    SERVER_TIMEOUT (int): The timeout for the server in seconds.
    SENDER_NAME (str): The sender's name for the emails.
    MAIL_SUBJECT (str): The subject of the email.
    HTML_BOILERPLATE (str): A flag to indicate if HTML boilerplate is enabled. Values: 'ON', 'OFF'.
    ONLY_CERTIFICATES (str):  Flag indicating whether only certificates should be generated or not. If OFF the certificates will also be mailed.
'''

# Set email and passord
EMAIL = "n"
PASSWORD = "n"

# Change the boiler late number
EMAIL_BOILERPLATE = 1

# Certificates custom settings
# Font Size
FONT_SIZE = 36
FONT_NAME = "PlaypenSans"
FONT_DIRECTORY = r"Fonts/PlaypenSans-Bold.ttf"
# Set the Colour before drawing
TEXT_COLOUR = (0,0,255) 

# Output directory
OUTPUT_DIRECTORY = "Certificates"
TEMPLATE_DIRECTORY = "templates"
DATA_DIRECTORY = "data"

# Template name
TEMPLATE_NAME = "sample"

# SMTP Server
SMTP_SERVER = 'smtp.gmail.com'
SERVER_TIMEOUT = 60

# Senders name
SENDER_NAME = "Conclave Head"

# MAIL Subject
MAIL_SUBJECT = "Participation Certificate, Coders' Conclave"

#Values : On and OFF
HTLM_BOILERPLATE = "OFF"

#Values: ON and OFF
ONLY_CERTIFICATES = "OFF"


##  Currenlt under Development

## Values: ON and OFF
# TESTING_MODE = "OFF"
