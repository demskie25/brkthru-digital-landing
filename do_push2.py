import subprocess

with open('push_result.txt', 'w', encoding='utf-8') as f:
    f.write("=== ADD ===\n")
    res = subprocess.run(['git', 'add', 'assessments.html', 'start-enneagram.html'], capture_output=True, text=True)
    f.write(res.stdout + "\n" + res.stderr + "\n" + str(res.returncode) + "\n\n")

    f.write("=== COMMIT ===\n")
    res = subprocess.run(['git', 'commit', '-m', 'V123: CSS Map explicit height fix'], capture_output=True, text=True)
    f.write(res.stdout + "\n" + res.stderr + "\n" + str(res.returncode) + "\n\n")

    f.write("=== PUSH ===\n")
    res = subprocess.run(['git', 'push', '-f', 'origin', 'master:main'], capture_output=True, text=True)
    f.write(res.stdout + "\n" + res.stderr + "\n" + str(res.returncode) + "\n\n")

print("Done")
