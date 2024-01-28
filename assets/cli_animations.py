"""
Module: cli_animations.py

This module contains a class 'Animations' that provides CLI animations using colorama and time.

Dependencies:
- colorama
- time

Usage:
1. Import the 'Animations' class from this module.
2. Create an instance of the 'Animations' class.
3. Use the provided methods to display animations in the CLI.

Note: Make sure to initialize colorama using 'init(autoreset=True)' before using animations.

"""

import time
from colorama import init, Fore, Style

init(autoreset=True)  # Initialize colorama for cross-platform colored text

class Animations():
    """
    This class provides animations to the CLI.
    """

    def __init__(self) -> None:
        pass

    @staticmethod
    def cli_animation_1() -> None:
        """
        Setting up animation.

        Displays an animation indicating the setup process in the CLI.
        """
        animation_chars = "-\|/"
        for _ in range(10):
            for char in animation_chars:
                print(
                    f"\r{Style.BRIGHT}{Fore.GREEN}Setting up... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
                time.sleep(0.05)
        print()

    @staticmethod
    def cli_animation_2() -> None:
        """
        Starting mailer system animation.

        Displays an animation indicating the start of the system in the CLI.
        """
        animation_chars = "-\|/"
        for _ in range(10):
            for char in animation_chars:
                print(
                    f"\r{Style.BRIGHT}{Fore.GREEN}Starting the system... {char}{Fore.RESET}{Style.RESET_ALL}", end="", flush=True)
                time.sleep(0.05)
        print()
