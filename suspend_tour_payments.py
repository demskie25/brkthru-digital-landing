import re

file_path = r'e:\brkthru-digital-landing\tour.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for the Pay Now button div
# Matches the div with the specific hitpay shop link
pattern = r'(<div onclick="window\.location\.href = \'https://hitpay\.shop/brkthru-ventures/product/\' \+ this\.closest\(\'\.glass\'\)\.querySelector\(\'select\'\)\.value;"\s+class="cursor-pointer flex-1 bg-white text-brand-navy py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-brand-amber transition-all">\s+Pay Now\s+</div>)'

# Replacement: wrap in comments
replacement = r'<!-- \1 -->'

new_content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully commented out Pay Now buttons.")
