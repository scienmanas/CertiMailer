import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.image import MIMEImage
from PIL import Image
import base64


class Emailer :
    def __init__(self)  -> None :
        self.MailSenderAddress = "randomusermanas1@gmail.com"
        self.Password = "ksekfatjysemvsyn"

    def SendMail(self, receipient) -> None :
        object_1 = MIMEMultipart()
        object_1['From'] = self.MailSenderAddress
        object_1['To'] = receipient
        object_1['Subject'] = "Partcipation Certificate, Astrophotography Workshop - Athereum 2.0"

        # HTML Element :
        html_content = """
<html>
<body style="background: linear-gradient(to bottom, #3a6186, #89253e); background-repeat: no-repeat; background-attachment: fixed; margin: 0; padding: 0; text-align: center;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">Thank You for Participating</h1>
        <p style="color: #666;">In the Astrophotography and Light Painting Workshop conducted on 22nd October under Aethereum, The Annual Collaborative Astrofest of IIT and IISER Tirupati.</p>
        <p style="color: #666;">The participation certificate is attached in this mail.</p>
        <p style="color: #666;">Wishing you clear skies and happy stargazing!</p>
        </br>
        <p style="color: #333; font-weight: bold;"><a href="https://github.com/scienmanas" style="color: #007BFF; text-decoration: none;">Manas Poddar</a></p>
        <p style="color: #333; font-weight: bold;"><a href="https://www.instagram.com/arjit0_0sb/" style="color: #FF8800; text-decoration: none;">Arjit Banerjee</a></p>
        <p style="color: #666;">Heads, Aethereum</p>
        <img src="https://raw.githubusercontent.com/scienmanas/Miscellanous-Files/main/AEthereum__logo.png?token=GHSAT0AAAAAACHCYQFTM3NWGE7VC7LM7KAYZJW73MQ" alt="Aethereum Logo" style="max-width: 100px; margin: 0 auto;">
    </div>
</body>
</html>
"""
        html_part1 = MIMEText(html_content,'html')
        object_1.attach(html_part1)

        # Attaching the File

        # Send Mail
        try: 
            connection = smtplib.SMTP("smtp.gmail.com")
            connection.starttls()
            connection.login(user=self.MailSenderAddress, password=self.Password)
            connection.sendmail(object_1["From"], [receipient], object_1.as_string())
            connection.quit()
            print('Email sent successfully')
        except Exception as e :
            print(f"Email could not be sent: {str(e)}")
