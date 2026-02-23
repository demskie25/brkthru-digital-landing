
import os

path = r'e:\brkthru-digital-landing\assessments.html'
if not os.path.exists(path):
    print(f"File not found: {path}")
    exit(1)

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find the block with flexibility for line endings and minor spacing
# We look for the end of the try block in sendResultsToBackend
target_patterns = [
    'alert("Results captured! A profile summary has been sent to your email and our consulting team.");\n                }\n            }',
    'alert("Results captured! A profile summary has been sent to your email and our consulting team.");\r\n                }\r\n            }'
]

replacement_base = 'alert("Results captured! A profile summary has been sent to your email and our consulting team.");\n                } catch (e) {\n                    console.error("V128 Sync Error:", e);\n                    alert("Note: Data reached the gateway, but confirmation failed. Please download your PDF manually if the email doesn't arrive.");\n                }\n            }'

fixed = False
for target in target_patterns:
    if target in content:
        replacement = replacement_base
        if '\r\n' in target:
            replacement = replacement.replace('\n', '\r\n')
        
        content = content.replace(target, replacement)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"FIXED with pattern: {bool(target)}")
        fixed = True
        break

if not fixed:
    print("TARGET NOT FOUND. Checking sendResultsToBackend end...")
    # Check if maybe it's already there or if indentation is different
    if "V128 Sync Error:" in content:
        print("Catch block already exists.")
    else:
        # Fallback: find the last occurrence of the success alert and close the try block there
        print("Attempting fallback replacement...")
        # Since the file is 6MB, we'll be careful.
