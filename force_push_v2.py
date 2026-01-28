import subprocess
import sys

with open('push_log.txt', 'w', encoding='utf-8') as f:
    f.write("=== FORCE PUSH LOG ===\n\n")
    
    # Force push master to main
    f.write("Running: git push -f origin master:main\n")
    result = subprocess.run(['git', 'push', '-f', 'origin', 'master:main'], capture_output=True, text=True)
    f.write(f"STDOUT: {result.stdout}\n")
    f.write(f"STDERR: {result.stderr}\n")
    f.write(f"RETURN CODE: {result.returncode}\n\n")
    rc1 = result.returncode
    
    # Force push master
    f.write("Running: git push -f origin master\n")
    result = subprocess.run(['git', 'push', '-f', 'origin', 'master'], capture_output=True, text=True)
    f.write(f"STDOUT: {result.stdout}\n")
    f.write(f"STDERR: {result.stderr}\n")
    f.write(f"RETURN CODE: {result.returncode}\n\n")
    rc2 = result.returncode
    
    f.write(f"=== FINAL STATUS ===\n")
    f.write(f"master:main push: {'SUCCESS' if rc1 == 0 else 'FAILED'}\n")
    f.write(f"master push: {'SUCCESS' if rc2 == 0 else 'FAILED'}\n")

print("Log written to push_log.txt")
