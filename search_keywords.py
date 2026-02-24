
import os

file_path = r'e:\brkthru-digital-landing\assessments.html'
keywords = ['generatePDF', 'html2pdf', 'emailjs']

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    for i, line in enumerate(f, 1):
        for kw in keywords:
            if kw in line:
                print(f"Match found for '{kw}' at line {i}: {line.strip()[:150]}")
