import subprocess
import sys

def run_command(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    print(f"STDOUT: {result.stdout}")
    print(f"STDERR: {result.stderr}")
    print(f"Exit Code: {result.returncode}")
    return result

print("Starting surgical push...")
run_command(["git", "add", "-A"])
run_command(["git", "commit", "-m", "fix(coaching): force dark backgrounds for Bo Sanchez section and card"])
run_command(["git", "push", "origin", "master:main"])
print("Push attempt finished.")
