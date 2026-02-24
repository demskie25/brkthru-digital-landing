import sys

filename = 'e:/brkthru-digital-landing/assessments.html'
output_file = 'e:/brkthru-digital-landing/snippet_context.txt'

search_terms = ['html2pdf', 'emailjs', 'Download PDF', 'user-email-input']

try:
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
    
    found_indices = []
    for i, line in enumerate(lines):
        for term in search_terms:
            if term.lower() in line.lower():
                found_indices.append(i)
                break
    
    with open(output_file, 'w', encoding='utf-8') as out:
        if not found_indices:
            out.write("No keywords found.")
        else:
            written_lines = set()
            for idx in found_indices:
                start = max(0, idx - 50)
                end = min(len(lines), idx + 50)
                out.write(f"\n--- Context around line {idx + 1} ---\n")
                for i in range(start, end):
                    if i not in written_lines:
                        out.write(f"{i+1}: {lines[i]}")
                        written_lines.add(i)
                out.write("\n")
    print(f"Extraction complete. Found {len(found_indices)} matches.")
except Exception as e:
    print(f"Error: {e}")
