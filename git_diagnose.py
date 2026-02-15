import subprocess
import os

def run_command(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        print(f"Command: {cmd}")
        print(f"Stdout: {result.stdout}")
        print(f"Stderr: {result.stderr}")
        print(f"Return Code: {result.returncode}")
        print("-" * 20)
    except Exception as e:
        print(f"Error running {cmd}: {e}")

os.chdir(r"e:\brkthru-digital-landing")
run_command("git status")
run_command("git branch")
run_command("git remote -v")
run_command("git log -n 5 --oneline")
