import os
if os.path.exists('deploy_log.txt'):
    with open('deploy_log.txt', 'rb') as f:
        content = f.read()
    try:
        # Try to decode from UTF-16 and re-encode to UTF-8 for print
        text = content.decode('utf-16')
        print(text)
    except:
        print(content.decode('utf-8', errors='ignore'))
else:
    print("Log file MISSING")
