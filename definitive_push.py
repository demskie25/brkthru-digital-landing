import subprocess
import os

def run_git_cmd(cmd, log_file):
    with open(log_file, "a") as f:
        f.write(f"\nRunning: {cmd}\n")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        with open(log_file, "a") as f:
            f.write(f"STDOUT: {result.stdout}\n")
            f.write(f"STDERR: {result.stderr}\n")
        return result.returncode == 0
    except Exception as e:
        with open(log_file, "a") as f:
            f.write(f"EXCEPTION: {str(e)}\n")
        return False

log_file = "e:/brkthru-digital-landing/push_diagnosis.txt"
if os.path.exists(log_file):
    os.remove(log_file)

os.chdir("e:/brkthru-digital-landing")

print("Logging to push_diagnosis.txt")
run_git_cmd("git status", log_file)
run_git_cmd("git add .", log_file)
run_git_cmd('git commit -m "FINAL: Restored Universal Header site-wide"', log_file)
run_git_cmd("git remote -v", log_file)
run_git_cmd("git push origin master:main --force", log_file)
run_git_cmd("git push origin master:master --force", log_file)
