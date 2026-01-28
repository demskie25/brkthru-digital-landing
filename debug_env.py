import os
import subprocess

def run_git(args):
    try:
        res = subprocess.run(['git'] + args, capture_output=True, text=True)
        return res.stdout + res.stderr
    except Exception as e:
        return str(e)

print("Files in root:", os.listdir('.'))
if os.path.exists('images'):
    print("Files in images/:", os.listdir('images'))
else:
    print("images/ directory MISSING")

print("\nGit Remote:", run_git(['remote', '-v']))
print("\nGit Branch:", run_git(['branch']))
print("\nGit Status:", run_git(['status']))
