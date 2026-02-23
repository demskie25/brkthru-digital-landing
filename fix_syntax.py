
import os
import re

target_path = r'e:\brkthru-digital-landing\assessments.html'

with open(target_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the invalid message string block and fix the newlines
# We look for: message: "ENNEAGRAM LEADERSHIP PROFILE ... page.",
# The issue is the actual newlines between quotes.

pattern = re.compile(r'(message: "ENNEAGRAM LEADERSHIP PROFILE)(.*?)(\.?,",\s+raw_data:)', re.DOTALL)

def fix_newlines(match):
    prefix = match.group(1)
    body = match.group(2)
    suffix = match.group(3)
    # Replace real newlines with \n
    fixed_body = body.replace('\n', '\\n')
    return prefix + fixed_body + suffix

if pattern.search(content):
    content = pattern.sub(fix_newlines, content)
    print("Success: Fixed newlines in message string.")
else:
    # Fallback: specific line-by-line replacement for the known botched injection
    old_text = 'message: "ENNEAGRAM LEADERSHIP PROFILE\n---------------------------\nName: " + fullName + "\nPrimary Type: " + topTypeName + "\n\nScore Breakdown:\n" + Object.entries(scores).map(([t, s]) => "Type " + t + ": " + s).join("\n") + "\n\nThe full PDF report is available for download on the assessment page.",'
    # Wait, the Python script likely converted \\n to \n in the previous run.
    # Let's try a simpler approach: finding the specific block between 1640 and 1660 and join lines with \n
    
    # We'll just look for the start and end and replace the inner content
    start_marker = 'message: "ENNEAGRAM LEADERSHIP PROFILE'
    end_marker = 'The full PDF report is available for download on the assessment page.",'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1 and start_idx < end_idx:
        block = content[start_idx : end_idx + len(end_marker)]
        fixed_block = block.replace('\n', '\\n')
        # However, we don't want to replace the newline at the end of the line if there is one
        # but the whole thing is inside the 'pabblyPayload' object definition.
        content = content[:start_idx] + fixed_block + content[end_idx + len(end_marker):]
        print("Success: Fixed newlines using index markers.")
    else:
        print("Warning: Could not find message block to fix.")

with open(target_path, 'w', encoding='utf-8') as f:
    f.write(content)
