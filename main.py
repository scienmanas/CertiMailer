import os
import pandas
from PIL import Image, ImageDraw, ImageFont
from emailer import Emailer
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Loading the certificate tenplate
certificate_img = Image.open(r"template/sample.png")

drawer_img = ImageDraw.Draw(certificate_img)  # Creating a drawing object
EmailSender = Emailer()   # Creating Emailer Object

# Fonts Configuration
font = ImageFont.truetype(r"Fonts/PlaypenSans-Bold.ttf", size=56)
pdfmetrics.registerFont(TTFont("cer_font",r"Fonts/PlaypenSans-Bold.ttf"))

# Folder to store output certificates.
OUTPUT_DIRECTORY = "Certificates"
os.makedirs(OUTPUT_DIRECTORY,exist_ok=True)

# Make List of Participants
names = []
df = pandas.read_csv(r"names.csv")
names = df['Name'].tolist()
emails = df['Email'].tolist()

for name,email in zip(names, emails)  :
    out_path_certificate = os.path.join(OUTPUT_DIRECTORY,f"{name}.pdf")

    # Make a Canvas
    drawer = canvas.Canvas(out_path_certificate, pagesize=(certificate_img.width, certificate_img.height))

    # Insert Image
    drawer.drawImage(r"template/sample.png",0,0,width=certificate_img.width,height=certificate_img.height)

    # Setting Drawer Font
    drawer.setFont("cer_font",56)
    # Set the Colour before drawing
    text_colour = (0,0,255)  # For Blue Colour
    drawer.setFillColor(text_colour)

    # Adjust Position (x,y)
    # Adjust Coordinates by https://www.image-map.net/
    # Y - coordinate keep the touching line - Use link above to get the coordinates
    text_width = drawer_img.textlength(name,font=font)
    name_position = ((certificate_img.width - text_width)/2, certificate_img.height - 805)

    # Draw the name
    drawer.drawString(name_position[0],name_position[1],name)

    drawer.save()

    # Sending Mail
    EmailSender.SendMail(email,name)

# Closing the template image
certificate_img.close()
print("Scripting Running complete")
