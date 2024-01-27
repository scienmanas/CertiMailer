# Function to check if a command is available
function Test-Command {
    param(
        [string]$Command
    )
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return !$?
}

# Function to display loading animation
function Loading-Animation {
    param(
        [int]$LoadInterval,
        [string]$LoadingMessage
    )
    $LoadingAnimation = @('-', '\', '|', '/')
    for ($Elapsed = 0; $Elapsed -lt $LoadInterval; $Elapsed++) {
        foreach ($Frame in $LoadingAnimation) {
            Write-Host -NoNewline $Frame
            Start-Sleep -Seconds 0.25
        }
    }
    Write-Host -NoNewline " `b"
    Write-Host $LoadingMessage
}

# Function to install dependencies asynchronously
function Install-Dependencies {
    Start-Process -FilePath "pip3" -ArgumentList "install -r requirements.txt" -NoNewWindow -Wait
}

# Detect the operating system
$OS = (Get-WmiObject Win32_OperatingSystem).Caption

# Check if Python is installed
if (Test-Command "python3") {
    Write-Host "Python 3 is already installed."
}
else {
    Write-Host "Python 3 not found. Installing..."
    switch -Wildcard ($OS) {
        "*Linux*" {
            Start-Process -FilePath "sudo" -ArgumentList "apt-get update" -NoNewWindow -Wait
            Start-Process -FilePath "sudo" -ArgumentList "apt-get install -y python3" -NoNewWindow -Wait
        }
        "*Darwin*" {
            Start-Process -FilePath "brew" -ArgumentList "update" -NoNewWindow -Wait
            Start-Process -FilePath "brew" -ArgumentList "install python3" -NoNewWindow -Wait
        }
        default {
            Write-Host "Unsupported operating system: $OS"
            exit 1
        }
    }
    Loading-Animation -LoadInterval 10 -LoadingMessage "Installing Python 3..."
    Write-Host "Python 3 installed successfully."
}

# Check if pip is installed
if (Test-Command "pip3") {
    Write-Host "pip is already installed."
}
else {
    Write-Host "pip not found. Installing..."
    switch -Wildcard ($OS) {
        "*Linux*" {
            Start-Process -FilePath "sudo" -ArgumentList "apt-get install -y python3-pip" -NoNewWindow -Wait
        }
        "*Darwin*" {
            Start-Process -FilePath "brew" -ArgumentList "install python3-pip" -NoNewWindow -Wait
        }
        default {
            Write-Host "Unsupported operating system: $OS"
            exit 1
        }
    }
    Loading-Animation -LoadInterval 10 -LoadingMessage "Installing pip..."
    Write-Host "pip installed successfully."
}

# Generate and activate virtual environment
Start-Process -FilePath "sudo" -ArgumentList "apt install python3.11-venv" -NoNewWindow -Wait
python3 -m venv venv
.\venv\Scripts\Activate
Write-Host "Virtual environment activated successfully."

# Install dependencies from requirements.txt asynchronously
Write-Host "Installing dependencies..."
Install-Dependencies
Loading-Animation -LoadInterval 10 -LoadingMessage "Installing dependencies..."
Write-Host "Dependencies installed successfully."

# Run the Python script
Write-Host "Executing main.py..."
# Add any loading animations or delays here if desired
Clear-Host
python3 main.py
