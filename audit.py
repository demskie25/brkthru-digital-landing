import os
import subprocess

def run_git(args):
    try:
        res = subprocess.run(['git'] + args, capture_output=True, text=True)
        return res.stdout + res.stderr
    except Exception as e:
        return str(e)

print("--- FILE LIST ---")
for f in os.listdir('.'):
    if f.endswith('.html') or f.endswith('.png') or f.endswith('.js'):
        print(f)

print("\n--- GIT REMOTE ---")
print(run_git(['remote', '-v']))

print("\n--- GIT LOG ---")
print(run_git(['log', '-n', '3', '--oneline']))

print("\n--- ODYSSEY.HTML CONTENT (LOGO AREA) ---")
if os.path.exists('odyssey.html'):
    with open('odyssey.html', 'r', encoding='utf-8') as f:
        content = f.read()
        start = content.find('<a href="index.html" class="univ-logo">')
        if start != -1:
            print(content[start:start+500])
        else:
            print("Logo block not found")
else:
    print("odyssey.html missing")
