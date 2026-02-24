
import os

file_path = r'e:\brkthru-digital-landing\find_button_output.txt'

try:
    # Try different encodings
    for encoding in ['utf-16le', 'utf-16', 'utf-8']:
        try:
            with open(file_path, 'r', encoding=encoding, errors='ignore') as f:
                content = f.read()
                if content:
                    print(f"--- Decoded with {encoding} ---")
                    print(content)
                    print("-" * 30)
                    break
        except Exception:
            continue
except Exception as e:
    print(f"Error: {e}")
