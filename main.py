from setup import CertiMailer

app = CertiMailer()
app.show_logo()
app.run_setup()
app.get_template_type()
app.configure_csv_check()


