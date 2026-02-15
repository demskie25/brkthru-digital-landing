import subprocess
import os

def run_git_cmd(cmd):
    print(f"Executing: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        print(f"STDOUT: {result.stdout}")
        print(f"STDERR: {result.stderr}")
        print(f"RET: {result.returncode}")
        return result.returncode == 0
    except Exception as e:
        print(f"EXCEPTION: {e}")
        return False

os.chdir(r"e:\brkthru-digital-landing")

print("--- STARTING DEPLOY ---")
run_git_cmd("git add -A")
run_git_cmd('git commit -m "FIX: Force visibility of mobile menu and optimize spacing"')
run_git_cmd("git push origin master:main --force")
run_git_cmd("git push origin master:master --force")
print("--- DEPLOY FINISHED ---")
