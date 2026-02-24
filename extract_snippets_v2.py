
import os

file_path = 'assessments.html'
keywords = [b'generatePDF', b'html2pdf', b'emailjs']

results = []
try:
    if not os.path.exists(file_path):
        results.append(f"Error: {file_path} not found in {os.getcwd()}")
    else:
        with open(file_path, 'rb') as f:
            content = f.read()
            for kw in keywords:
                idx = -1
                while True:
                    idx = content.find(kw, idx + 1)
                    if idx == -1:
                        break
                    # Extract 1000 bytes context
                    start = max(0, idx - 500)
                    end = min(len(content), idx + 2000)
                    results.append(f"--- Match for {kw.decode()} at {idx} ---")
                    results.append(content[start:end].decode('utf-8', errors='ignore'))
                    results.append("-" * 80)
                
    with open('snippet_results_v2.txt', 'w', encoding='utf-8') as out:
        out.write("\n".join(results))
    print(f"Extraction complete. Found {len(results)//3} snippets.")
except Exception as e:
    with open('snippet_error.txt', 'w') as out:
        out.write(str(e))
    print(f"Error: {e}")
