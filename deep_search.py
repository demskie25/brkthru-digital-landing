import os

search_dir = r"e:\brkthru-digital-landing"
search_strings = ["notebook-chat-container", "Resources - Brkthru", "73263c60"]

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".html") or file.endswith(".js"):
            full_path = os.path.join(root, file)
            try:
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    for s in search_strings:
                        if s in content:
                            print(f"FOUND '{s}' in: {full_path}")
            except Exception as e:
                pass
