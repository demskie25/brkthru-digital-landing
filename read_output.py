
import os

file_path = r'e:\brkthru-digital-landing\find_output.txt'

try:
    with open(file_path, 'r', encoding='utf-16le', errors='ignore') as f:
        print(f.read())
except Exception as e:
    print(f"Error: {e}")
