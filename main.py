from scripts.main_setup import CertiMailer

app = CertiMailer()
app.show_logo()
app.run_setup()
app.get_template_type()
app.configure_csv_check()
app.check_template_status()
app.start_system()
