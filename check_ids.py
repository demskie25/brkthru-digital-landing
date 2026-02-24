import re

filename = 'e:/brkthru-digital-landing/assessments.html'
output_file = 'e:/brkthru-digital-landing/id_check.txt'

try:
    with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all IDs
    ids = re.findall(r'id=["\'](.*?)["\']', content)
    # Find all inputs
    inputs = re.findall(r'<input.*?>', content, re.DOTALL | re.IGNORECASE)
    # Find the Download PDF button
    button = re.findall(r'<button.*?>.*?Download PDF.*?</button>', content, re.DOTALL | re.IGNORECASE)
    
    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("--- Relevant IDs ---\n")
        for id_val in ids:
            if 'email' in id_val.lower():
                out.write(f"ID: {id_val}\n")
        
        out.write("\n--- Relevant Inputs ---\n")
        for input_tag in inputs:
            if 'email' in input_tag.lower():
                out.write(f"Input: {input_tag.strip()}\n")
                
        out.write("\n--- Download PDF Button ---\n")
        for btn in button:
            out.write(f"Button: {btn.strip()}\n")

    print(f"Check complete. Result in {output_file}")
except Exception as e:
    print(f"Error: {e}")
