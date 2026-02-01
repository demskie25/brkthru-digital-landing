file_path = r'e:\brkthru-digital-landing\tour.html'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Target ranges (0-indexed in list)
# Line 833-836 (Original lines 833-836)
# Line 868-871 (Original lines 868-871)

# Note: Line numbers in view_file are 1-indexed.
# 833: index 832
# 836: index 835
# 868: index 867
# 871: index 870

def comment_range(lines, start_idx, end_idx):
    lines[start_idx] = '                        <!-- ' + lines[start_idx].lstrip()
    lines[end_idx] = lines[end_idx].rstrip() + ' -->\n'

# Comment first button
comment_range(lines, 832, 835)

# Comment second button
comment_range(lines, 867, 870)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Successfully commented out Pay Now buttons via line indexing.")
