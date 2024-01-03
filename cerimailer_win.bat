@echo off
setlocal enabledelayedexpansion

REM Function to check if a command is available
:command_exists
where %1 >nul 2>nul
if errorlevel 1 (
    exit /b 1
) else (
    exit /b 0
)

REM Function to display loading animation
:loading_animation
set "load_interval=%1"
set "loading_message=%2"
set "elapsed=0"
set "loading_animation=— \ | /"

REM This part is to make the cursor not blink
REM on top of the animation while it lasts
echo|set /p="."
mode con: cols=2 lines=1
set /p="."

set "frame_idx=0"
set "frames_count=4"
set "loading_animation=!loading_animation! !loading_animation! !loading_animation! !loading_animation!"
set "loading_animation=!loading_animation!!loading_animation!!loading_animation!!loading_animation!"

set "cursor_move_left=D"
set "cursor_erase_line=K"
set "cursor_save_position=7"
set "cursor_restore_position=8"

:loading_loop
for /l %%i in (0, 1, %load_interval%) do (
    set "frame=!loading_animation:~%frame_idx%,1!"
    set /p="!frame! "
    timeout /nobreak /t 1 >nul
    set /a "frame_idx=(frame_idx+1)%%frames_count"
    set /a "elapsed+=1"
    cls
)
exit /b

REM Function to install Chocolatey
:install_chocolatey
@echo off
set "choco_url=https://chocolatey.org/install.ps1"
echo Installing Chocolatey...
powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('%choco_url%'))" >nul 2>nul
exit /b

REM Function to install dependencies asynchronously
:install_dependencies
pip install -r requirements.txt >nul 2>nul
exit /b

REM Detect the operating system
for /f "delims=" %%s in ('ver') do set "os=%%s"

REM Check if Chocolatey is installed
call :command_exists choco
if errorlevel 1 (
    call :install_chocolatey
    echo Chocolatey installed successfully.
) else (
    echo Chocolatey is already installed.
)

REM Check if Python is installed
call :command_exists python3
if errorlevel 1 (
    echo Python 3 not found. Installing...
    choco install python -y >nul 2>nul
    call :loading_animation 10 "Installing Python 3..."
    echo Python 3 installed successfully.
) else (
    echo Python 3 is already installed.
)

REM Check if pip is installed
call :command_exists pip3
if errorlevel 1 (
    echo pip not found. Installing...
    pip install --upgrade pip >nul 2>nul
    call :loading_animation 10 "Installing pip..."
    echo pip installed successfully.
) else (
    echo pip is already installed.
)

REM Install dependencies from requirements.txt asynchronously
echo Installing dependencies...
start /b cmd /c :install_dependencies
call :loading_animation 10 "Installing dependencies..."
wait
echo Dependencies installed successfully.

REM Run the Python script
echo Executing main.py...
REM Add any loading animations or delays here if desired
python main.py