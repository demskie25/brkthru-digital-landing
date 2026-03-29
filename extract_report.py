
import sys

def extract_app_content(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    start_tag = '<div id="appContent">'
    start_index = content.find(start_tag)
    if start_index == -1:
        # Try variation
        start_tag = '<div id=\'appContent\'>'
        start_index = content.find(start_tag)
    
    if start_index == -1:
        print("Could not find appContent div")
        return None
    
    content_from_start = content[start_index + len(start_tag):]
    
    # We need to find the matching closing div. 
    # Since it's a "whale", let's assume it ends before the next script or footer or just count braces if it's clean.
    # But usually a simple find for the next </div> might work if it's not nested.
    # Actually, the user says "copy ONLY the HTML content inside the appContent div".
    
    # Re-finding closing tag:
    # A simple way is to find the LAST </div> before </body> or just before script tags.
    # However, let's look for the closing div by balancing tags.
    
    stack = 1
    i = 0
    while stack > 0 and i < len(content_from_start):
        next_open = content_from_start.find('<div', i)
        next_close = content_from_start.find('</div>', i)
        
        if next_close == -1:
            break
            
        if next_open != -1 and next_open < next_close:
            stack += 1
            i = next_open + 4
        else:
            stack -= 1
            i = next_close + 6
            if stack == 0:
                return content_from_start[:next_close]
    
    return None

result = extract_app_content('assessbackup.html')
if result:
    with open('extracted_report.html', 'w', encoding='utf-8') as f:
        f.write(result)
    print("Successfully extracted content to extracted_report.html")
else:
    print("Failed to extract content")
