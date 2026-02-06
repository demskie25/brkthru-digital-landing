import sys
import os

filepath = 'e:/brkthru-digital-landing/index.html'

def check_file(path):
    print(f"Checking {path}...")
    try:
        with open(path, 'rb') as f:
            raw = f.read(100)
            print(f"First 100 bytes (hex): {raw.hex(' ')}")
        
        # Try different encodings
        for enc in ['utf-8', 'utf-16', 'ascii']:
            try:
                with open(path, 'r', encoding=enc) as f:
                    content = f.read(1000)
                    print(f"Successfully read with {enc}")
                    # Find line 420
                    lines = content.splitlines()
                    # Re-read full file with successful encoding
                    f.seek(0)
                    all_lines = f.readlines()
                    print(f"Total lines: {len(all_lines)}")
                    if len(all_lines) >= 420:
                        for i in range(415, 425):
                            line = all_lines[i].strip()
                            print(f"Line {i+1}: '[{line}]' (hex: {line.encode(enc).hex(' ')})")
                    return
            except:
                continue
    except Exception as e:
        print(f"Error: {e}")

check_file(filepath)
