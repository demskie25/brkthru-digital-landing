import base64
import os

logo_path = r'e:\brkthru-digital-landing\images\brkthru-logo.png'
if os.path.exists(logo_path):
    with open(logo_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        print(encoded_string)
else:
    print("ERROR: Logo not found")
