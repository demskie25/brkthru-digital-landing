import sys

filename = 'e:/brkthru-digital-landing/assessments.html'
search_terms = ['html2pdf', 'emailjs', 'Download PDF', 'user-email-input']

try:
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        for i, line in enumerate(f, 1):
            for term in search_terms:
                if term.lower() in line.lower():
                    print(f"Line {i}: {line.strip()[:100]}")
except Exception as e:
    print(f"Error: {e}")
