import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
import keyboard
from colorama import init, Fore, Style
import time

init(autoreset=True)  # Initialize colorama for cross-platform colored text

class Emailer :
    def __init__(self)  -> None :
        self.MailSenderAddress = "randomusermanas1@gmail.com"
        self.Password = "ndozcojxqoayhslj"    # For creating App Password, Check Youtube
        self.retry_dictionary = {}

    def SendMail(self, receipient, name, attachment_type) -> None :
        object_1 = MIMEMultipart()
        name_ = "Coders Conclave"
        object_1['From'] = f"{name_} <{self.MailSenderAddress}>"
        object_1['To'] = f"{name} <{receipient}>"        # Recipient Address
        object_1['Subject'] = "Partcipation Certificate, Astrophotography Workshop: Athereum 2.0"  # Subject of the mail

        # HTML Element :
        html_content = """
<html>
<body style="background: linear-gradient(to bottom, #3a6186, #89253e); background-repeat: no-repeat; background-attachment: fixed; margin: 0; padding: 0; text-align: center;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">Thank You for Participating</h1>
        <p style="color: #666;">In the coding contest conducted on 22nd October under Coders, The Annual Coding competition of India.</p>
        <p style="color: #666;">The participation certificate is attached in this mail.</p>
        <p style="color: #666;">Wishing you hemlo World!</p>
        </br>
        <p style="color: #333; font-weight: bold;"><a href="https://github.com/scienmanas" style="color: #007BFF; text-decoration: none;">Manas Poddar</a></p>
        <p style="color: #666;">Heads, Some Event</p>
    </div>
</body>
</html>
"""
        html_part1 = MIMEText(html_content,'html')
        object_1.attach(html_part1)

        # Attaching the File
        attachment_path = f"Certificates/{name}.pdf"
        with open(attachment_path,'rb') as attachment :
            attachment_part = MIMEApplication(attachment.read())
            attachment_part.add_header('Content-Disposition', 'attachment', filename = f'{name}{attachment_type}')
            object_1.attach(attachment_part)

        # Send Mail
        try : 
            connection = smtplib.SMTP("smtp.gmail.com", timeout=60)
            connection.starttls()
            connection.login(user=self.MailSenderAddress, password=self.Password)
            connection.sendmail(object_1["From"], [receipient], object_1.as_string())
            connection.quit()
            print(f'Email sent successfully to {Style.BRIGHT}{Fore.YELLOW}{name}{Fore.RESET}{Style.RESET_ALL}')
            return "sent"
        except Exception as e :
            print(f"{Style.BRIGHT}{Fore.RED}Email could not be sent to{Fore.RESET} {Fore.YELLOW}{name}{Fore.RESET} : {Fore.RED}{str(e)}{Fore.RESET}{Style.RESET_ALL}")
            return "failed"


    def _retry_not_send(self) -> None :
        # if len(self.retry_dictionary) == 0 :
        #     pass
        # else :
        #     time.sleep(0.1)
        #     print(f"{Style.BRIGHT}{Fore.YELLOW}Retrying the failed main...{Style.RESET_ALL}{Fore.RESET}")
        pass

