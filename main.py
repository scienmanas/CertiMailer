from system.scripts.setup import CertiMailer
from system import settings

app = CertiMailer()
app.show_logo()
if settings.ONLY_CERTIFICATES == "OFF" :
    app.run_setup()
app.get_template_type()
app.perform_checks()
app.start_system()
