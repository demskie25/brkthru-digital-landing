
import os

file_path = r'e:\brkthru-digital-landing\assessments.html'
search_term = b'function generatePDF()'

with open(file_path, 'rb') as f:
    content = f.read()
    idx = content.find(search_term)
    if idx != -1:
        # Find the end of the function (look for the next function or the end of script)
        # Assuming the function ends some distance later.
        # Let's just grab 2000 bytes from there.
        context = content[idx : idx + 2000]
        with open('found_function.txt', 'wb') as out:
            out.write(context)
        print(f"Found function at {idx}. Context saved to found_function.txt")
    else:
        print("Function not found with b'function generatePDF()'")
        # Try without parens
        idx2 = content.find(b'function generatePDF')
        if idx2 != -1:
             context = content[idx2 : idx2 + 2000]
             with open('found_function.txt', 'wb') as out:
                 out.write(context)
             print(f"Found function at {idx2}. Context saved to found_function.txt")
        else:
             print("Function not found at all.")
