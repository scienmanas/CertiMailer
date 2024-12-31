---
publishedDate: 2024-12-13T00:00:00Z
title: Developer Script
description: This blog is for developers who want to know about the script. Run it on your local machine and see the magic.
tags:
  - script
  - developer
#  All the comtents of the blog goes here.
---
## Usage

- Clone the repository

```bash
git clone https://github.com/scienmanas/CertiMailer
```

`or you can download the zip and extract the files`

- Add the details of the participants in the `names.csv` file before running the program.
- Add the certificate template in the `template` folder. Make sure the template you upload should be names as `sample.pdf` or `sample.png`
- The certificates will be generated in the `certificates` folder and the mails will be sent to the participants

## Running

### For Windows

- Open the `Powershell` and navigate to the cloned/downloaded repository location.
- Run the command

```powershell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```

- To start the application run the following command in terminal (One time)

```powershell
.\certimailer.ps1
```

### For Linux

- Open the `terminal` and navigate to the cloned/downloaded repository location.
- To start the application run the following command in terminal (One time)

```bash
chmod +x certimailer.sh
```

- To start the script everytime run command

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

## Video :

- Demo for png & deterning coordinates for `png` sample:

[Video](https://github.com/scienmanas/CertiMailer/assets/99756067/c2267784-ea5f-400d-ae8e-6923c1b38e4f)

- Running for `pdf` sample

[Video](https://github.com/scienmanas/CertiMailer/assets/99756067/8bffdd36-b093-4d4a-aadc-11230b86cb4e)

- Determining coordinates for `pdf` sample

[Video](https://github.com/scienmanas/CertiMailer/assets/99756067/0e9d664d-ff87-4663-a8f9-2e8103e5a344)


Cheers 🥂,  
**Manas**  
[GitHub](https://github.com/scienmanas) | [Email](mailto:iamscientistmanas@gmail.com)