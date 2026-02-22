import subprocess

def run(cmd):
    print(f"Running: {' '.join(cmd)}")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.stdout: print("OUT:", res.stdout)
    if res.stderr: print("ERR:", res.stderr)
    return res.returncode

run(['git', 'add', 'start-enneagram.html', 'assessments.html', 'patch_pdf.js'])
run(['git', 'commit', '-m', 'V123: Critical fix for PDF rendering (html2canvas svg explicit dimensions, await generation)'])
run(['git', 'push', '-f', 'origin', 'master:main'])
run(['git', 'push', '-f', 'origin', 'master'])
print("Deployment script finished.")
