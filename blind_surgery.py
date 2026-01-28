import fileinput
import sys
import os

def surgery(filename):
    if not os.path.exists(filename):
        sys.stderr.write(f"File {filename} not found.\n")
        return

    in_nav = False
    in_footer = False
    nav_replaced = False
    footer_replaced = False
    
    # We use fileinput with inplace=True to modify the file line by line.
    # This avoids loading the whole file into memory.
    try:
        with fileinput.input(filename, inplace=True) as f:
            for line in f:
                # Handle <nav>...</nav>
                if '<nav' in line and not in_nav:
                    in_nav = True
                    continue
                if '</nav>' in line:
                    if in_nav:
                        in_nav = False
                        if not nav_replaced:
                            sys.stdout.write('<img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">\n')
                            nav_replaced = True
                        continue
                
                # Handle <footer>...</footer>
                if '<footer>' in line and not in_footer:
                    in_footer = True
                    continue
                if '</footer>' in line:
                    if in_footer:
                        in_footer = False
                        if not footer_replaced:
                            sys.stdout.write('<!-- Footer Cleaned -->\n')
                            footer_replaced = True
                        continue

                # Output the line if we're not inside a section being replaced
                if not in_nav and not in_footer:
                    sys.stdout.write(line)
        sys.__stderr__.write(f"Successfully processed {filename}\n")
    except Exception as e:
        sys.__stderr__.write(f"Error processing {filename}: {str(e)}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.stderr.write("Usage: python blind_surgery.py <filename>\n")
    else:
        surgery(sys.argv[1])
