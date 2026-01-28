import os, subprocess, shutil, time, stat

def remove_readonly(func, path, excinfo):
    os.chmod(path, stat.S_IWRITE)
    func(path)

repo_url = "https://github.com/demskie25/brkthru-digital-landing.git"
files = [
    'index.html',
    'odyssey.html',
    'corporate.html',
    'coaching.html',
    'resources.html',
    'shop.html',
    'universal-header.css',
    'v2_style.css',
    'images/'
]


def run(cmd):
    cmd_str = ' '.join(cmd)
    print(f"Running: {cmd_str}")
    with open('deploy_log.txt', 'a') as f:
        f.write(f"\n--- {cmd_str} ---\n")
    # Using shell=True and manual redirection to file for debugging
    try:
        res = os.system(f"{cmd_str} >> deploy_log.txt 2>&1")
        if res != 0:
            raise Exception(f"Command failed with exit code {res}")
    except Exception as e:
        print(f"ERROR: {e}")
        raise


try:
    # 1. Kill the poison
    if os.path.exists('.git'): 
        shutil.rmtree('.git', onerror=remove_readonly)
    if os.path.exists('../deploy_temp'): 
        shutil.rmtree('../deploy_temp', onerror=remove_readonly)
    
    # 2. Fresh initialization
    run(['git', 'init'])
    try:
        run(['git', 'checkout', '-b', 'master'])
    except:
        run(['git', 'branch', '-M', 'master'])
    run(['git', 'remote', 'add', 'origin', repo_url])
    
    # 3. Surgical Add
    for f in files:
        if os.path.exists(f): run(['git', 'add', f])
    
    # 4. Final Force Push to BOTH branches
    run(['git', 'commit', '-m', 'Fix: Clinical Definitive Fix - Base64 Embedding and multi-branch push'])
    run(['git', 'push', '-f', 'origin', 'master'])
    run(['git', 'push', '-f', 'origin', 'master:main']) # Force main as well
    print("DEPLOYMENT SUCCESSFUL to both master and main")
except Exception as e:
    print(f"CRITICAL FAILURE: {e}")
