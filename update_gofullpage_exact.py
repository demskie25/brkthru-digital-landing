import sys

file_path = r'e:\brkthru-digital-landing\assessments.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open(file_path, 'r', encoding='utf-16le') as f:
        content = f.read()

# The exact target string to replace from our previous edit
target = '''<!-- Instruction Box (Premium Styled) -->
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
                        </div>'''

# The new idiot-proof string
replacement = '''<!-- Instruction Box (Premium Styled) -->
                        <div class="instruction-box bg-white text-black p-6 rounded-xl border-4 border-black">
                            <h2 class="text-xl font-bold mb-4 text-left text-black"><i class="fa-solid fa-file-pdf mr-2"></i>To Save Your Full Leadership Report (Best Quality):</h2>
                            <ol class="text-left text-black space-y-4 font-semibold text-lg list-decimal list-inside">
                                <li><strong>Open a NEW TAB</strong> in Google Chrome (Do not close this page!).</li>
                                <li>Search for and install the free <strong>"GoFullPage" Chrome Extension</strong>.</li>
                                <li>Return to this results page once installed.</li>
                                <li>Click the <strong>Puzzle Piece icon</strong> (Extensions) at the top right of your browser.</li>
                                <li>Find GoFullPage and click the <strong>Camera Icon</strong> to capture.</li>
                                <li>Wait for it to scan, then click the <strong>PDF icon</strong> to download.</li>
                            </ol>

                            <p class="warning-text mt-6 text-black font-bold text-left bg-yellow-100 p-3 rounded">
                                <i class="fa-solid fa-triangle-exclamation mr-2 text-yellow-600"></i> DONT CLOSE OR REFRESH THIS PAGE. 
                                <span class="block mt-1 font-normal opacity-90">Your results are generated dynamically. If you leave now, they will be permanently lost and you may have to pay again.</span>
                            </p>
                        </div>'''

if target in content:
    content = content.replace(target, replacement)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced instructions successfully.")
else:
    print("Target section not found!")
    # Let's do a fallback that finds `<div class="instruction-box` ... and replaces it if the first fails
    start_str = '<!-- Instruction Box (Premium Styled) -->'
    end_str = '</button>'
    start_idx = content.find(start_str)
    end_idx = content.find(end_str, start_idx)
    if start_idx != -1 and end_idx != -1:
        content = content[:start_idx] + replacement + '\n                    ' + content[end_idx:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Replaced instructions successfully using fallback index method.")
    else:
        sys.exit(1)
