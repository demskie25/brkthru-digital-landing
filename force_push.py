import subprocess
import sys

try:
    result = subprocess.run(['git', 'push', 'origin', 'master'], capture_output=True, text=True, check=True)
    print("Stdout:", result.stdout)
    print("Stderr:", result.stderr)
    print("Push successful!")
except subprocess.CalledProcessError as e:
    print("Error during push:", file=sys.stderr)
    print("Stdout:", e.stdout, file=sys.stderr)
    print("Stderr:", e.stderr, file=sys.stderr)
    sys.exit(e.returncode)
