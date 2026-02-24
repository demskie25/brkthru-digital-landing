
import os
import sys

file_path = r'e:\brkthru-digital-landing\assessments.html'

if not os.path.exists(file_path):
    print(f"Error: File {file_path} does not exist.")
    sys.exit(1)

try:
    with open(file_path, 'rb') as f:
        head = f.read(100)
        print(f"File head: {head!r}")
        
        # Search for 'generatePDF'
        f.seek(0)
        content = f.read()
        print(f"File size read: {len(content)}")
        
        idx = content.find(b'function generatePDF')
        if idx != -1:
            print(f"Found 'function generatePDF' at {idx}")
            print(f"Context: {content[idx : idx + 200]!r}")
        else:
            print("'function generatePDF' not found")
            
        idx2 = content.find(b'generatePDF')
        if idx2 != -1:
            print(f"Found 'generatePDF' at {idx2}")
            print(f"Context: {content[idx2 : idx2 + 200]!r}")

except Exception as e:
    print(f"An error occurred: {e}")
    sys.exit(1)
