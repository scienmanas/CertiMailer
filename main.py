from system.scripts.setup import CertiMailer

app = CertiMailer()
app.show_logo()
app.run_setup()
app.perform_checks()
app.get_template_type()
app.start_system()
