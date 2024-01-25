import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from colorama import init, Fore, Style
from email_template.template import HTML_CONTENT
from scripts.settings import EMAIL, PASSWORD # Importing Email and password


init(autoreset=True)  # Initialize colorama for cross-platform colored text

class Emailer :
    def __init__(self)  -> None :
        self.mail_sender_address = str()
        self.password = str()
        # self.mailer_object = object()

        self.configure_credentails()

    # def configure_email_subjects(self) -> None :
    #     pass

    # def configure_email_template (self) -> None :
    #     pass
        
    def configure_credentails(self) -> None :
        """
        This function sets up the email and password by loading it from settings file
        """
        self.mail_sender_address = EMAIL
        self.password = PASSWORD

    def check_credentials(self) -> bool :
        server = object()
        status = bool()
        try:
            server = smtplib.SMTP('smtp.gmail.com', timeout=10)
            server.starttls()
            server.login(self.mail_sender_address, self.password)
            print(f"{Style.BRIGHT}{Fore.GREEN}Successfully logged in to Mail Server{Fore.RESET}{Style.RESET_ALL}")
            server.quit()
            server = None
            status = True
        except Exception as e :
            print(f"{Style.BRIGHT}{Fore.RED}Error in checking credentials:{Fore.RESET}{Style.RESET}")
            status = False
        return status

            

    def send_mail(self, receipient, name) -> None :
        """
        This method is used to send an email with a given subject and body to the specified recipient
        Parameters:
        - receipient (str): The email address of the recipient
        - name (str): The display name of the sender
        Returns:
        - None
        """
        mailer_object = MIMEMultipart()
        name_ = "Coders Conclave"
        mailer_object['From'] = f"{name_} <{self.mail_sender_address}>"
        mailer_object['To'] = f"{name} <{receipient}>"  
        
        # Recipient Address
        mailer_object['Subject'] = "Partcipation Certificate, Astrophotography Workshop: Athereum 2.0"  # Subject of the mail
        
        html_part = MIMEText(HTML_CONTENT,'html')
        mailer_object.attach(html_part)

        # Attaching the File
        attachment_path = f"Certificates/{name}.pdf"
        with open(attachment_path,'rb') as attachment :
            attachment_part = MIMEApplication(attachment.read())
            attachment_part.add_header('Content-Disposition', 'attachment', filename = f'{name}.pdf')
            mailer_object.attach(attachment_part)

        # Send Mail
        try : 
            connection = smtplib.SMTP("smtp.gmail.com", timeout=60)
            connection.starttls()
            connection.login(user=self.mail_sender_address, password=self.password)
            connection.sendmail(mailer_object["From"], [receipient], mailer_object.as_string())
            connection.quit()
            print(f'Email sent successfully to {Style.BRIGHT}{Fore.YELLOW}{name}{Fore.RESET}{Style.RESET_ALL}')
            return "sent"
        except Exception as e :
            print(f"{Style.BRIGHT}{Fore.RED}Email could not be sent to{Fore.RESET} {Fore.YELLOW}{name}{Fore.RESET} : {Fore.RED}{str(e)}{Fore.RESET}{Style.RESET_ALL}")
            return "failed"