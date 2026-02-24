
import os

file_path = r'e:\brkthru-digital-landing\assessments.html'
keywords = [b'generatePDF', b'html2pdf', b'emailjs']

with open(file_path, 'rb') as f:
    chunk_size = 1024 * 1024  # 1MB chunks
    overlap = 1024  # 1KB overlap to handle keywords split across chunks
    offset = 0
    
    while True:
        chunk = f.read(chunk_size)
        if not chunk:
            break
            
        for kw in keywords:
            idx = chunk.find(kw)
            if idx != -1:
                print(f"Match found for '{kw.decode()}' at approximate byte offset {offset + idx}")
                # Print a bit of context
                start = max(0, idx - 100)
                end = min(len(chunk), idx + 500)
                print(f"Context: {chunk[start:end]!r}")
                print("-" * 50)
                
        offset += len(chunk) - overlap
        if len(chunk) < chunk_size:
            break
        f.seek(offset)
