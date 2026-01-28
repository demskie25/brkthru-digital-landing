import subprocess
import os

def run_git(args):
    print(f"Running git {' '.join(args)}")
    res = subprocess.run(['git'] + args, capture_output=True, text=True)
    return res.stdout

if not os.path.exists('.git'):
    print(".git folder MISSING")
else:
    print("Files currently in Git index:")
    print(run_git(['ls-files']))

print("\nLast Commit Info:")
print(run_git(['log', '-1', '--name-only']))
