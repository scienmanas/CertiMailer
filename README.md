![Repo Banner](https://github.com/scienmanas/CertiMailer/assets/99756067/dc6bfeda-db3b-44f6-b420-8398b8d552be)

# CertiMailer
This is a Python Script to generate certificates and mail them to invidually in Bulk for competetions, workshops, classroom material distribution, etc.

## Usage

1. Clone the repository
```bash
git clone https://github.com/scienmanas/CertiMailer
```
`or you can download the zip and extract the files`

2. Add the details of the participants in the `names.csv` file before running the program.

3. Add the certificate template in the `template` folder. Make sure the template you upload should be names as `sample.pdf` or `sample.png`

4. The certificates will be generated in the `certificates` folder and the mails will be sent to the participants

## Running 

### For Windows

1. Open the `Powershell` and navigate to the cloned/downloaded repository location.

2. Run the command
```powershell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```
3. To start the application run the following command in terminal (One time)
```powershell
.\certimailer.ps1
```

### For Linux

1. Open the `terminal` and navigate to the cloned/downloaded repository location.

2. To start the application run the following command in terminal (One time)
```bash
chmod +x certimailer.sh
```

3. To start the script everytime run command 
```bash
./certimailer.sh
```


## Note & Customization

- For customization change the settings by modifying `settings.py`

- The `names.csv` file should contain the following columns:
    - `Name` : Name of the participant
    - `Email` : Email of the participant

- The `template` folder should contain the certificate template in `.png` or in `.pdf` format
- Change the `self.MailSenderAddress` and `self.Passwords` to your organization Email and Password (App Password) or you can configure it in terminal
- Change the `html_content to your desired redering Content` 

- The `font` and `font size` are cutomizable, to chenge uploaad the font in `Fonts Folder` and chenge the path according to the name in `certificate_generator.py` file.

- Number of parametrs that can be printed and be taken as input are also customizable.

- Don't stop the running the script by `Ctrl + C/X` otherwise the progress of the mail sent will not updated for that run.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

The repository is free to use but copying this is strictly prohibited.

## Author

- [Manas Poddar](https://www.instagram.com/scienmanas/)

## Contribution

- All contributions are welcome
- Fork the repository, improve the code and send pull requests
- If you find any issue, raise an issue
- If you want any new features raise an issue mentioning the same
- This was developed and tested on Linux system, if there are errors while running in any other os, raise an issue mentioning the same.


## Services 

This project can be configured according with more diverse features such as printing events name too, if you are a coder, you can itself do it by changing the dimensions and functionality of the script.

If you want custom script for your organization, I can do it according to your organization need charging according to the amount of feautures needed. Drop me an email at **iamscientistmanas@gmail.com** for the same.


## Help & Features

- [X] Support for both `.pdf` and `.png` templates.
- [x] The `names.csv` is automatically updated once the script runs fully.
- [x] The script contains timeout time of 60s, so if there is some error while email sending, it will automatically shutdown after timeout time, the emails which are sent correctly is maintained and the `names.csv` is updated automatically after shutting shown of script so that again email is not sent to ther person already sent.
- [x] Retry feature for network errors.
- [x] Automatic checking of python, pip and dependencies, the shell script is configured in such a way it will itself install the missing package.
- [x] Notify whether all have been mailed or not at last.
- [X] Multiple inputs taken for customization of printing parametrs e.g.: Printing dates, competitions, names.
- [x] Support for Windows, Linux and Mac systems.

## Demo Videos 

### Demo for png & deterning coordinates for `png` sample: 

[png_app_password_demo.webm](https://github.com/scienmanas/CertiMailer/assets/99756067/c2267784-ea5f-400d-ae8e-6923c1b38e4f)

### Demo for `pdf`:

#### Running for `pdf` sample

[pdf_demo.webm](https://github.com/scienmanas/CertiMailer/assets/99756067/8bffdd36-b093-4d4a-aadc-11230b86cb4e)

#### Determining coordinates for `pdf` sample

[pdf_coordinates_demo.webm](https://github.com/scienmanas/CertiMailer/assets/99756067/0e9d664d-ff87-4663-a8f9-2e8103e5a344)


## Credits

- Wesites : https://www.i2pdf.com/measure-pdf & https://www.image-map.net/ used for coordinates measurement.

[![Stargazers repo roster for @scienmanas/CertiMailer](https://reporoster.com/stars/dark/scienmanas/CertiMailer)](https://github.com/scienmanas/CertiMailer/stargazers)

[![Forkers repo roster for @scienmanas/CertiMailer](https://reporoster.com/forks/dark/scienmanas/CertiMailer)](https://github.com/scienmanas/CertiMailer/network/members)

## Feautres under development 

- [ ] Customizing different input paramerts by giving user a list a parametrs to use, therefore customizing experince for every user. (Currenlty not working on it, tentative day of release: Feb-March '24) take string with comma for dictionary list.
- [ ] Multiple csv support
- [ ] Testing functionality to test mail
- [ ] All kinds of image(template) support.
- [ ] Proper full documenatation. (maintaining a doc folder)
