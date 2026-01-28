import subprocess
import os

def run(cmd):
    try:
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return f"--- {cmd} ---\nSTDOUT:\n{res.stdout}\nSTDERR:\n{res.stderr}\n"
    except Exception as e:
        return f"--- {cmd} ---\nERROR: {e}\n"

with open('git_audit.txt', 'w') as f:
    f.write(run('git branch -a'))
    f.write(run('git remote show origin'))
    f.write(run('git log -n 5 --oneline'))
    f.write(run('git remote -v'))
