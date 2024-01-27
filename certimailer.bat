@echo off
setlocal EnableDelayedExpansion

REM Function to check if a command is available
:Test-Command
    set "Command=%1"
    where "%Command%" >nul 2>nul
    if %errorlevel% equ 0 (
        echo %Command% is already installed.
    ) else (
        echo %Command% not found. Installing...
        call :Install-%Command%
        echo %Command% installed successfully.
    )
    goto :eof

REM Function to display loading animation
:Loading-Animation
    set "LoadInterval=%1"
    set "LoadingMessage=%2"
    set "LoadingAnimation=—\|/"
    set "Elapsed=0"

    set "Spinner="
    for /L %%i in (1,1,%LoadInterval%) do (
        for %%c in (!LoadingAnimation!) do (
            set "Spinner=%%c"
            set /P "=!Spinner! " <nul
            timeout /nobreak /t 1 /nobreak >nul
            set /P "=" <nul
        )
    )
    echo !Spinner! 
    echo %LoadingMessage%
    goto :eof

REM Function to install dependencies asynchronously
:Install-Dependencies
    start /B pip3 install -r requirements.txt
    goto :eof

REM Detect the operating system
for /f "tokens=*" %%a in ('ver') do set OS=%%a

REM Check if Python is installed
call :Test-Command python3

REM Check if pip is installed
call :Test-Command pip3

REM Generate and activate virtual environment
start /B sudo apt install python3.11-venv
python3 -m venv venv
venv\Scripts\Activate
echo Virtual environment activated successfully.

REM Install dependencies from requirements.txt asynchronously
echo Installing dependencies...
call :Install-Dependencies
call :Loading-Animation 10 "Installing dependencies..."
echo Dependencies installed successfully.

REM Run the Python script
echo Executing main.py...
REM Add any loading animations or delays here if desired
cls
python3 main.py

:end
