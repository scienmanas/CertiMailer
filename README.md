# CertiMailer

This is a Python Script to generate certificates and mail them to invidually in Bulk for competetions, workshops, classroom material distribution, etc.

## Requirements

- Python 3.6+

## Usage

1. Clone the repository
`
git clone https://github.com/scienmanas/Certificates-Generator.git
`
2. Install the requirements using `pip install -r requirements.txt`
3. Add the details of the participants in the `names.csv` file
4. Add the certificate template in the `template` folder. Also change the name of the certificate template in `main.py` to your certificate name.
5. Run the script using `python main.py`
6. The certificates will be generated in the `certificates` folder and the mails will be sent to the participants

## Note

- The `names.csv` file should contain the following columns:
    - `Name` : Name of the participant
    - `Email` : Email of the participant

- The `template` folder should contain the certificate template in `.png` format
- Change the `self.MailSenderAddress` and `self.Passwords` to your organization Email and Password (App Password)
- Change the `html_content to your desired redering Content` 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

The repository is free to use but copying this is strictly prohibited.

## Author

- [Manas Poddar](https://www.instagram.com/scienmanas/)

## Contribution

- All contributions are welcome
- Fork the repository, improve the code and send pull requests
- If you find any issue, raise an issue

## Feautres under development 

- [ ] Support for both template pdf and png
- [x] Add a GUI probably a tkinter or shell maybe a data uploading option too
- [x] console for sending confirmation
- [x] Retrying to those not sent, maintain list

Add commands: 
chmod +x certimailer.sh
./certimailer.sh

add documentation for differennt domain names
don't cancel timeout is already there 60s ec