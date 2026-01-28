import subprocess
import sys

def run_cmd(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    print(f"STDOUT: {result.stdout}")
    print(f"STDERR: {result.stderr}")
    print(f"RETURN CODE: {result.returncode}")
    return result.returncode

# Force push master to main
rc1 = run_cmd(['git', 'push', '-f', 'origin', 'master:main'])

# Force push master
rc2 = run_cmd(['git', 'push', '-f', 'origin', 'master'])

print(f"\n=== FINAL STATUS ===")
print(f"master:main push: {'SUCCESS' if rc1 == 0 else 'FAILED'}")
print(f"master push: {'SUCCESS' if rc2 == 0 else 'FAILED'}")
