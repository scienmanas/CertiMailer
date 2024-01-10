from colorama import init, Fore, Style
from setup import CertiMailer
import time

init(autoreset=True)

app = CertiMailer()
app.show_logo()
app.run_setup()

