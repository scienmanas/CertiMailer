from system.scripts.setup import CertiMailer
from system import settings

# if settings.TESTING_MODE  == "ON" :
#     pass
# else :
app = CertiMailer()
app.show_logo()
app.run_setup()
app.get_template_type()
app.perform_checks()
app.start_system()
