import os
import subprocess
import time

def run_cmd(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error executing command: {result.stderr}")
    else:
        print(result.stdout)

def force_push():
    lock_file = os.path.join(".git", "index.lock")
    if os.path.exists(lock_file):
        print(f"Found lock file {lock_file}, removing...")
        try:
            os.remove(lock_file)
        except Exception as e:
            print(f"Could not remove lock file: {e}")

    run_cmd(["git", "add", "."])
    time.sleep(1)
    run_cmd(["git", "commit", "-m", "V114: Logo and Graph Fix"])
    time.sleep(1)
    run_cmd(["git", "push", "origin", "master:main", "--force"])
    print("Deployment script finished")

if __name__ == "__main__":
    force_push()
