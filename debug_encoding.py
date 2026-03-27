import io
import sys
import re

file_path = r'e:\brkthru-digital-landing\assessments.html'

for enc in ['utf-8', 'utf-16le']:
    try:
        with open(file_path, 'r', encoding=enc) as f:
            content = f.read()
        print(f"Successfully read with {enc}")
        break
    except UnicodeDecodeError:
        pass

idx = content.find('id="download-btn"')
if idx != -1:
    print("Found download-btn at", idx)
    print(repr(content[idx:idx+200]))
else:
    print("download-btn not found!")
