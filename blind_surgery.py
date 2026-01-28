import fileinput
import sys
import os

def surgery(filename):
    if not os.path.exists(filename):
        sys.__stderr__.write(f"File {filename} not found.\n")
        return

    in_nav = False
    in_footer = False
    
    try:
        # Use a temporary file to write the results
        temp_filename = filename + ".tmp"
        with open(filename, 'r', encoding='utf-8', errors='ignore') as fin, \
             open(temp_filename, 'w', encoding='utf-8') as fout:
            
            for line in fin:
                # Handle <nav>...</nav>
                if '<nav' in line and not in_nav:
                    in_nav = True
                    # Replace with image IMMEDIATELY when entering a nav block
                    fout.write('<img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">\n')
                    continue
                
                if '</nav>' in line and in_nav:
                    in_nav = False
                    continue
                
                # Handle <footer>...</footer>
                if '<footer>' in line and not in_footer:
                    in_footer = True
                    fout.write('<!-- Footer Cleaned -->\n')
                    continue
                
                if '</footer>' in line and in_footer:
                    in_footer = False
                    continue

                # Output the line if we're not inside a section being replaced
                if not in_nav and not in_footer:
                    fout.write(line)
        
        # Replace the original file with the temp file
        os.replace(temp_filename, filename)
        sys.__stderr__.write(f"Successfully processed {filename}\n")
    except Exception as e:
        sys.__stderr__.write(f"Error processing {filename}: {str(e)}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.__stderr__.write("Usage: python blind_surgery.py <filename>\n")
    else:
        surgery(sys.argv[1])
