import base64

with open("brkthru-logo2.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    with open("logo_b64.txt", "w") as out_file:
        out_file.write(encoded_string)
