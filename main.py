import os
import pandas
from PIL import Image, ImageDraw, ImageFont
from emailer import Emailer


# Loading the certificate tenplate
certificate_img = Image.open(r"template/astroworkshop certificate.png")

# Creating a drawing object
drawer = ImageDraw.Draw(certificate_img)

font = ImageFont.truetype(r"Fonts/PlaypenSans-Bold.ttf", size=56)
# Fonts to be used for printing text on image

# Folder to store output certificates.
OUTPUT_DIRECTORY = "Certificates"
os.makedirs(OUTPUT_DIRECTORY,exist_ok=True)

# Make List of Participants
names = []
df = pandas.read_csv(r"names.csv")
names = df['Name'].tolist()
emails = df['Email'].tolist()

# Adjust Coordinates by https://www.image-map.net/
# Y - coordinate keep the touching line
name_position = (0,825)

EmailSender = Emailer()



for name,email in zip(names, emails)  :
    certificate_with_name = certificate_img.copy()
    drawer = ImageDraw.Draw(certificate_with_name)

    # Calculate the text width for the name
    text_width = drawer.textlength(name, font=font)

    # Adjust Position (x,y)
    # Adjust x automatically, and adjust y by font size
    name_position = ((certificate_img.width - text_width)/2, 825 - 56 )

    drawer.text(name_position,name,fill="blue", font=font)

    out_path_certificate = os.path.join(OUTPUT_DIRECTORY,f"{name}.pdf")

    certificate_with_name.save(out_path_certificate,"PDF")

    # Sending Mail
    EmailSender.SendMail(email,name)

# Closing the template image
certificate_img.close()