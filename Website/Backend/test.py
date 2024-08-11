import requests

url = 'http://localhost:5000/api/send-email/test'
data = {
  "fromName": "Manas",
  "toName": "Manas Poddar",
  "toEmail": "iamscientistmanas@gmail.com",
  "subject": "Test Mail",
  "message" : "This is a test mail"
}

# File path (optional)
file_path = 'Manas.pdf'  # Can be a PDF or ZIP

files = {'file': (file_path.split('/')[-1], open(file_path, 'rb'))} if file_path else None

if files:
    response = requests.post(url, files=files, data=data)
else:
    response = requests.post(url, data=data)

print(response.text)
