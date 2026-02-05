import os
import re

replacements = {
    r'https://hitpay\.link/n6dx11': 'checkout.html?item=bundle',
    r'https://hitpay\.link/mhy8sc': 'checkout.html?item=book',
    r'https://hitpay\.link/9zlbvf': 'checkout.html?item=toolkit',
    r'https://hitpay\.link/y0ymoa': 'checkout.html?item=delegation'
}

def replace_in_file(filepath):
    try:
        # Try UTF-8 first
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            # Try UTF-16 second
            with open(filepath, 'r', encoding='utf-16') as f:
                content = f.read()
        except Exception as e:
            # print(f"Could not read {filepath}: {e}")
            return

    original_content = content
    modified = False
    for pattern, replacement in replacements.items():
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            modified = True
    
    if modified:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"SUCCESS: Updated {filepath}")
        except Exception as e:
            print(f"FAILED to write {filepath}: {e}")

# Search in the current directory and all subdirectories
for root, dirs, files in os.walk('.'):
    # Skip .git and node_modules
    if '.git' in dirs:
        dirs.remove('.git')
    if 'node_modules' in dirs:
        dirs.remove('node_modules')
        
    for file in files:
        if file.endswith(('.html', '.js', '.jsx', '.tsx', '.ts')):
            replace_in_file(os.path.join(root, file))
