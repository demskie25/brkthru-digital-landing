import os

file_path = r'e:\brkthru-digital-landing\enneagram_backup.html'
if os.path.exists(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()
        print(f"File size: {len(content)} bytes")
        # Try different encodings
        for enc in ['utf-8', 'utf-16', 'latin-1']:
            try:
                print(f"--- TRYING {enc} ---")
                print(content.decode(enc)[:2000])
                break
            except:
                continue
else:
    print("File not found.")
