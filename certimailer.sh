#!/bin/bash

# Function to check if a command is available
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function for a simple loading animation
loading_animation() {
    local pid=$1
    local delay=0.1
    local spin='-\|/'

    while [ -d /proc/"$pid" ]; do
        for i in ${spin}; do
            printf "\r%s" "$i"
            sleep "$delay"
        done
    done
    printf "\r"
}



# Check if Python is installed
if command_exists python3; then
    echo "Python 3 is already installed."
else
    echo "Python 3 not found. Installing..."
    sudo apt-get update >/dev/null 2>&1
    sudo apt-get install -y python3 >/dev/null 2>&1 &
    loading_animation $!
    echo "Python 3 installed successfully."
fi

# Check if pip is installed
if command_exists pip3; then
    echo "pip is already installed."
else
    echo "pip not found. Installing..."
    sudo apt-get install -y python3-pip >/dev/null 2>&1 &
    loading_animation $!
    echo "pip installed successfully."
fi

# Install dependencies from requirements.txt
echo "Installing dependencies..."
pip3 install -r requirements.txt >/dev/null 2>&1 &
loading_animation $!
echo "Dependencies installed successfully."

# Run the Python script
echo "Executing main.py..."
# Add any loading animations or delays here if desired
python3 main.py
