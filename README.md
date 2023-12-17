<pre>

░█████╗░███████╗██████╗░████████╗██╗███╗░░░███╗░█████╗░██╗██╗░░░░░███████╗██████╗░
██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║████╗░████║██╔══██╗██║██║░░░░░██╔════╝██╔══██╗
██║░░╚═╝█████╗░░██████╔╝░░░██║░░░██║██╔████╔██║███████║██║██║░░░░░█████╗░░██████╔╝
██║░░██╗██╔══╝░░██╔══██╗░░░██║░░░██║██║╚██╔╝██║██╔══██║██║██║░░░░░██╔══╝░░██╔══██╗
╚█████╔╝███████╗██║░░██║░░░██║░░░██║██║░╚═╝░██║██║░░██║██║███████╗███████╗██║░░██║
░╚════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝╚══════╝╚══════╝╚═╝░░╚═╝

            The Complete solution for automatic certificates mailing

</pre>

This is a Python Script to generate certificates and mail them to invidually in Bulk for competetions, workshops, classroom material distribution, etc.

## Usage

1. Clone the repository
```bash
git clone https://github.com/scienmanas/Certificates-Generator.git
or you can download the zip and extract the files
```

2. Add the details of the participants in the `names.csv` file before running the program.

3. Add the certificate template in the `template` folder. Make sure the template you upload should be names as `sample.pdf` or `sample.png`

4. The certificates will be generated in the `certificates` folder and the mails will be sent to the participants

## Running 

1. Open the terminal and navigate to the cloned/downloaded repository location.

2. To start the application run the following command in terminal (One time)
```bash
chmod +x certimailer.sh
```

3. To start the script everytime run command 
```bash
./certimailer.sh
```

## Note & Customization

- The `names.csv` file should contain the following columns:
    - `Name` : Name of the participant
    - `Email` : Email of the participant

- The `template` folder should contain the certificate template in `.png` or in `.pdf` format
- Change the `self.MailSenderAddress` and `self.Passwords` to your organization Email and Password (App Password) or you can configure it in terminal
- Change the `html_content to your desired redering Content` 

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

<!-- ## Feautres under development  -->

## Services 

This project can be configured according with more diverse features such as printing events name too, if you are a coder, you can itself do it by changing the dimensions and functionality of the script

If you want custom script for your organization, I can do it according to your organization need charging according to the amount of feautures needed. Drop me an email at **iamscientistmanas@gmail.com** for the same


## Help & Features

- [X] Support for both `.pdf` and `.png` templates.
- [x] The `names.csv` is automatically updated once the script runs fully.
- [x] The script contains timeout time of 60s, so if there is some error while email sending, it will automatically shutdown after timeout time, the emails which are sent correctly is maintained and the `names.csv` is updated automatically after shutting shown of script so that again email is not sent to ther person already sent.
- [x] Retry feature for network errors.
- [x] Automatic checking of python, pip and dependencies, the shell script is configured in such a way it will itself install the missing package.
- [x] Notify whether all have been mailed or not at last.




Remain :
Pdf support
width and height url and adjustments instruction a well as in code