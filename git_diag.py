import subprocess

def run_diag():
    with open('git_diag.txt', 'w', encoding='utf-8') as f:
        f.write("=== GIT STATUS ===\n")
        res = subprocess.run(['git', 'status'], capture_output=True, text=True)
        f.write(f"STDOUT: {res.stdout}\nSTDERR: {res.stderr}\nRC: {res.returncode}\n\n")

        f.write("=== GIT REMOTE ===\n")
        res2 = subprocess.run(['git', 'remote', '-v'], capture_output=True, text=True)
        f.write(f"STDOUT: {res2.stdout}\nSTDERR: {res2.stderr}\nRC: {res2.returncode}\n\n")
        
run_diag()
