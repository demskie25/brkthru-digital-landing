import os

filename = 'e:/brkthru-digital-landing/server.py'
if os.path.exists(filename):
    print(f"File {filename} exists!")
    with open(filename, 'r', encoding='utf-8') as f:
        print(f.read())
else:
    print(f"File {filename} does not exist.")

print("Listing all files in e:/brkthru-digital-landing:")
for file in os.listdir('e:/brkthru-digital-landing'):
    print(file)
