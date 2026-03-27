import os

target_file = r"e:\brkthru-digital-landing\assessments.html"

with open(target_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Target section to remove (lines 1108 - 1131 approximately)
import re
pattern = re.compile(r'<!-- PDF Download Button -->\s*<div class="flex justify-between items-center mb-8 no-print">.*?</div>\s*</button>\s*</div>', re.DOTALL)

if pattern.search(content):
    content = pattern.sub('<div class="mb-12 no-print text-center"><h1 class="text-4xl font-black text-gold-main uppercase tracking-tighter">Full Report Generated</h1></div>', content)
    print("Success: Removed legacy download button")
else:
    # Try a more specific string match if regex fails
    target_str = '''                <!-- PDF Download Button -->
                <div class="flex justify-between items-center mb-8 no-print">
                    <h1 class="text-3xl font-black text-gold-main">Full Report Generated</h1>
                    <button type="button" id="download-btn"
                        class="w-full py-4 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg mt-6">'''
    if target_str in content:
        # If the start matches, we'll try to find the end of the div
        # This is riskier, so let's stick to a very specific block if possible
        pass
    print("Error: Could not find legacy download button section with exact pattern")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)
