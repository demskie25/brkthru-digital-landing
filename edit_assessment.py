import re
import sys

file_path = r'e:\brkthru-digital-landing\assessments.html'
log_path = r'e:\brkthru-digital-landing\log.txt'

with open(log_path, 'w') as log:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        log.write("Read UTF-8\n")
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='utf-16le') as f:
            content = f.read()
        log.write("Read UTF-16LE\n")

    # Replace download button and modal instructions
    pattern = re.compile(r'(<button type="button" id="download-btn"[\s\S]*?</button>)', re.IGNORECASE)
    match = pattern.search(content)
    if match:
        log.write("Found download-btn block\n")
        new_block = '''<button type="button" id="download-btn"
                        class="w-full py-4 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg mt-6">
                        <!-- Instruction Box (Premium Styled) -->
                        <div class="instruction-box bg-white text-black p-6 rounded-xl border-4 border-black">
                            <h2 class="text-xl font-bold mb-4 text-left text-black"><i class="fa-solid fa-file-pdf mr-2"></i>To Save Your Full Leadership Report (Best Quality):</h2>
                            <ol class="text-left text-black space-y-2 font-semibold text-lg list-decimal list-inside">
                                <li>Use Desktop.</li>
                                <li>Click GoFullPage Camera Icon.</li>
                                <li>Download the PDF.</li>
                            </ol>

                            <p class="warning-text mt-6 text-black font-bold text-left bg-yellow-100 p-2 rounded">
                                <i class="fa-solid fa-triangle-exclamation mr-2"></i> DO NOT CLOSE OR REFRESH THIS PAGE. 
                                <span class="block mt-1 font-normal opacity-90">Your results are generated dynamically. If you leave now or refresh, your results will be lost and you may be required to redo the assessment.</span>
                            </p>
                        </div>
                    </button>'''
        content = content.replace(match.group(1), new_block)
    else:
        log.write("download-btn block NOT FOUND\n")

    # Look for "Email this page", "Browser Share button", "Save as PDF" references
    for ph in ['Email this page', 'Browser Share', 'Save as PDF', 'Email']:
        m = re.findall(r'.{0,40}' + re.escape(ph) + r'.{0,40}', content, re.IGNORECASE | re.DOTALL)
        for mm in m:
            log.write(f"FOUND Phrase '{ph}': {repr(mm)}\n")
            
    # And replace them specifically if they exist in the UI that we didn't just remove
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
