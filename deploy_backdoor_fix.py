import subprocess
import os

def run_git(args):
    print(f"Running: git {' '.join(args)}")
    result = subprocess.run(['git'] + args, capture_output=True, text=True)
    print(f"STDOUT: {result.stdout}")
    print(f"STDERR: {result.stderr}")
    return result.returncode

print("Starting Backdoor Fix Deployment...")

# Check current branch
run_git(['branch'])

# Add the file
rc_add = run_git(['add', 'assessments.html'])

# Commit
rc_commit = run_git(['commit', '-m', 'V114: Added Backdoor Access to Assessments'])

# Force push to main
rc_push = run_git(['push', '-f', 'origin', 'master:main'])

if rc_push == 0:
    print("\nSUCCESS: Changes pushed to origin master:main")
else:
    print("\nFAILED: Git push failed.")
