import re
import sys
import os

def surgery(filename):
    if not os.path.exists(filename):
        sys.__stderr__.write(f"File {filename} not found.\n")
        return

    temp_filename = filename + ".tmp"
    in_nav = False
    in_footer = False
    
    # Regex patterns
    nav_start = re.compile(r'<nav', re.IGNORECASE)
    nav_end = re.compile(r'</nav>', re.IGNORECASE)
    footer_start = re.compile(r'<footer>', re.IGNORECASE)
    footer_end = re.compile(r'</footer>', re.IGNORECASE)

    try:
        with open(filename, 'r', encoding='utf-8', errors='ignore') as fin, \
             open(temp_filename, 'w', encoding='utf-8') as fout:
            
            for line in fin:
                # This is a bit tricky for one-liners, but let's assume the user's files 
                # have them on separate lines as seen in view_file.
                
                # Check for footer first (to avoid matching something inside nav if possible)
                if not in_footer:
                    if footer_start.search(line):
                        in_footer = True
                        fout.write('<!-- Footer Cleaned -->\n')
                        if footer_end.search(line):
                            in_footer = False
                        continue
                else:
                    if footer_end.search(line):
                        in_footer = False
                    continue

                if not in_nav:
                    if nav_start.search(line):
                        in_nav = True
                        fout.write('<img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">\n')
                        if nav_end.search(line):
                            in_nav = False
                        continue
                else:
                    if nav_end.search(line):
                        in_nav = False
                    continue

                if not in_nav and not in_footer:
                    fout.write(line)
        
        os.replace(temp_filename, filename)
        sys.__stderr__.write(f"Successfully processed {filename}\n")
    except Exception as e:
        sys.__stderr__.write(f"Error processing {filename}: {str(e)}\n" )

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.__stderr__.write("Usage: python blind_surgery.py <filename>\n")
    else:
        surgery(sys.argv[1])
