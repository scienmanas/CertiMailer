#!/bin/bash

# Function to check if a command is available
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

loading_animation() {
    local load_interval="${1}"
    local loading_message="${2}"
    local elapsed=0
    local loading_animation=( '—' "\\" '|' '/' )

    while [ "${load_interval}" -ne "${elapsed}" ]; do
        for frame in "${loading_animation[@]}" ; do
            printf "%s\b" "${frame}"
            sleep 0.25
        done
        elapsed=$(( elapsed + 1 ))
    done
    printf " \b\n"
}

# Function to install dependencies asynchronously
install_dependencies() {
    pip3 install -r requirements.txt >/dev/null 2>&1
}

# Detect the operating system
os=$(uname -s)

# Check if Python is installed
if command_exists python3; then
    echo "Python 3 is already installed."
else
    echo "Python 3 not found. Installing..."
    case "$os" in
        Linux*) sudo apt-get update >/dev/null 2>&1
                sudo apt-get install -y python3 >/dev/null 2>&1 ;;
        Darwin*) brew update >/dev/null 2>&1
                 brew install python3 >/dev/null 2>&1 ;;
        *) echo "Unsupported operating system: $os"; exit 1 ;;
    esac
    loading_animation 10 "Installing Python 3..."
    echo "Python 3 installed successfully."
fi

# Check if pip is installed
if command_exists pip3; then
    echo "pip is already installed."
else
    echo "pip not found. Installing..."
    case "$os" in
        Linux*) sudo apt-get install -y python3-pip >/dev/null 2>&1 ;;
        Darwin*) brew install python3-pip >/dev/null 2>&1 ;;
        *) echo "Unsupported operating system: $os"; exit 1 ;;
    esac
    loading_animation 10 "Installing pip..."
    echo "pip installed successfully."
fi

# Generate and activate virtual environment
echo "Installing virtual env..."
sudo apt install python3.11-venv

echo "Generating virtual environment..."
python3 -m venv venv >/dev/null 2>&1 
echo "Virtual environment generated successfully."
echo "Activating virtual environment..."
source venv/bin/activate
echo "Virtual environment activated successfully.."

# Install dependencies from requirements.txt asynchronously
echo "Installing dependencies..."
coproc install_dependencies
loading_animation 10 "Installing dependencies..."
wait ${COPROC_PID}
echo "Dependencies installed successfully."

# Run the Python script
echo "Executing main.py..."
# Add any loading animations or delays here if desired
python3 main.py