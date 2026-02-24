
import os

file_path = r'e:\brkthru-digital-landing\assessments.html'
search_term = b'onclick="generatePDF()"'

with open(file_path, 'rb') as f:
    content = f.read()
    idx = content.find(search_term)
    if idx != -1:
        print(f"Found '{search_term.decode()}' at byte offset {idx}")
        # Find line number
        line_num = content[:idx].count(b'\n') + 1
        print(f"Line number: {line_num}")
        print(f"Context: {content[idx - 100 : idx + 300]!r}")
    else:
        print(f"'{search_term.decode()}' not found")
