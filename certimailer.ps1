# Function to check if a command is available
function Test-Command($command) {
    return (Get-Command $command -ErrorAction SilentlyContinue) -ne $null
}

# Check if Python is installed
if (-not (Test-Command 'python')) {
    if (Test-Command 'python3') {
        $pythonCommand = 'python3'
    } else {
        Write-Host "Python is not installed. Please install Python and try again."
        exit
    }
} else {
    $pythonCommand = 'python'
}

# Check if pip is installed
if (-not (Test-Command 'pip')) {
    if (Test-Command 'pip3') {
        $pipCommand = 'pip3'
    } else {
        Write-Host "pip is not installed. Please install pip and try again."
        exit
    }
} else {
    $pipCommand = 'pip'
}

# Check if venv directory exists
if (-not (Test-Path .\venv)) {
    # Install virtual environment
    & $pythonCommand -m venv venv
    Write-Host "Virtual environment created."
}

# Activate virtual environment
. .\venv\Scripts\activate

# Install dependencies from requirements.
& $pipCommand install -r requirements.txt

# Clear the screen
Clear-Host

# Run main Python script
& $pythonCommand main.py

# Deactivate virtual environment
deactivate
Write-Host "Virtual environment deactivated."
