with open('index.html', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

with open('head_of_index.txt', 'w', encoding='utf-8') as f:
    for i, line in enumerate(lines[:60], 1):
        f.write(f"{i}: {line}")

print(f"Total lines in index.html: {len(lines)}")
print("First 60 lines written to head_of_index.txt")
