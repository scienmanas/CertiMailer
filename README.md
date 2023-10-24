# Certificate Generator

This is a Python Script to generate certificates and mail them to invidually in Bulk for competetions, workshops, classroom material distribution, etc.

## Requirements

- Python 3.6+
- Pillow
- Pandas
- reportlab
- email
- smtplib

## Usage

1. Clone the repository
`
git clone https://github.com/scienmanas/Certificates-Generator.git
`
2. Install the requirements using `pip install -r requirements.txt`
3. Add the details of the participants in the `data.csv` file
4. Add the certificate template in the `template` folder
5. Run the script using `python main.py`
6. The certificates will be generated in the `certificates` folder and the mails will be sent to the participants
