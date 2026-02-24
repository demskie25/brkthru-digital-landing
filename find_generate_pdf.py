
import os

file_path = r'e:\brkthru-digital-landing\assessments.html'
search_term = 'function generatePDF'

with open(file_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        if search_term in line:
            print(f"Match found at line {i}: {line.strip()[:100]}")
            # Try to read some lines after
            print("Next 20 lines:")
            for j in range(20):
                next_line = next(f, None)
                if next_line:
                    print(f"{i+j+1}: {next_line.strip()[:100]}")
                else:
                    break
            break
    else:
        print("Search term not found.")
