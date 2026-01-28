import subprocess

cmds = [
    ['git', 'remote', '-v'],
    ['git', 'log', '--oneline', '-3'],
    ['git', 'branch', '-a'],
]

with open('git_check.txt', 'w') as f:
    for cmd in cmds:
        f.write(f"=== {' '.join(cmd)} ===\n")
        result = subprocess.run(cmd, capture_output=True, text=True)
        f.write(result.stdout + "\n")
        if result.stderr:
            f.write("STDERR: " + result.stderr + "\n")
        f.write("\n")

print("Done - check git_check.txt")
