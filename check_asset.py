import base64
import os

logo_path = 'brkthru-logo.png'
if os.path.exists(logo_path):
    with open(logo_path, 'rb') as f:
        data = f.read()
        print(f"Size: {len(data)}")
        # print(base64.b64encode(data).decode('utf-8')[:100])
else:
    print("Logo missing")
