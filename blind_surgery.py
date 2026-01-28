import sys
import os

def surgery(filename):
    log_file = "surgery_log.txt"
    with open(log_file, "a") as log:
        log.write(f"Starting surgery on {filename}\n")
        try:
            with open(filename, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
            
            new_lines = []
            in_nav = False
            in_footer = False
            
            for line in lines:
                # Check for nav
                if not in_nav and '<nav' in line.lower():
                    in_nav = True
                    new_lines.append('<img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">\n')
                    if '</nav>' in line.lower():
                        in_nav = False
                    continue
                
                if in_nav:
                    if '</nav>' in line.lower():
                        in_nav = False
                    continue
                
                # Check for footer
                if not in_footer and '<footer>' in line.lower():
                    in_footer = True
                    new_lines.append('<!-- Footer Cleaned -->\n')
                    if '</footer>' in line.lower():
                        in_footer = False
                    continue
                
                if in_footer:
                    if '</footer>' in line.lower():
                        in_footer = False
                    continue
                
                new_lines.append(line)
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            
            log.write(f"Finished surgery on {filename}. New size: {len(new_lines)} lines\n")
        except Exception as e:
            log.write(f"Error on {filename}: {str(e)}\n")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        surgery(sys.argv[1])
