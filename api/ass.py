import os
import sys
import pyperclip

def print_file(path):
    """Print the content of a file in the desired format."""
    relative_path = os.path.relpath(path)
    with open(path, 'r') as file:
        content = file.read()
    return f"{relative_path}\n```\n{content}\n```\n"

def main():
    """Main function to handle command line arguments."""
    output = ""
    if len(sys.argv) > 1:
        # If a path is provided, print its content
        for path in sys.argv[1:]:
            if os.path.isfile(path):
                output += print_file(path)
            elif os.path.isdir(path):
                # If a directory is provided, print the content of all files in it
                for root, _, files in os.walk(path):
                    for file in files:
                        output += print_file(os.path.join(root, file))
    else:
        # If no path is provided, print the content of all files in the current directory
        for root, _, files in os.walk('.'):
            for file in files:
                output += print_file(os.path.join(root, file))
    print(output)
    pyperclip.copy(output)
    print("Output copied to clipboard.")

if __name__ == "__main__":
    main()