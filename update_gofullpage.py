import re
import sys

file_path = r'e:\brkthru-digital-landing\assessments.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open(file_path, 'r', encoding='utf-16le') as f:
        content = f.read()

# Replace the block
pattern = re.compile(r'(<!-- Instruction Box \(Premium Styled\) -->[\s\S]*?</div>)', re.IGNORECASE)
new_block = '''<!-- Instruction Box (Premium Styled) -->
                        <div class="instruction-box bg-white text-black p-6 rounded-xl border-4 border-black">
                            <h2 class="text-xl font-bold mb-4 text-left text-black"><i class="fa-solid fa-file-pdf mr-2"></i>To Save Your Full Leadership Report (Best Quality):</h2>
                            <ol class="text-left text-black space-y-3 font-semibold text-lg list-decimal list-inside">
                                <li><strong>Open a NEW TAB</strong> in Google Chrome (Do not close this page!).</li>
                                <li>Search for and install the free <strong>"GoFullPage" Chrome Extension</strong>.</li>
                                <li>Return to this results page once installed.</li>
                                <li>Click the <strong>Puzzle Piece icon</strong> (Extensions) at the top right of your browser.</li>
                                <li>Find GoFullPage and click the <strong>Camera Icon</strong> to capture.</li>
                                <li>Wait for it to scan, then click the <strong>PDF icon</strong> to download.</li>
                            </ol>

                            <p class="warning-text mt-6 text-black font-bold text-left bg-yellow-100 p-2 rounded">
                                <i class="fa-solid fa-triangle-exclamation mr-2"></i> DO NOT CLOSE OR REFRESH THIS PAGE. 
                                <span class="block mt-1 font-normal opacity-90">Your results are generated dynamically. If you leave now or refresh, your results will be lost and you may be required to redo the assessment.</span>
                            </p>
                        </div>'''

if "Instruction Box" in content:
    content = pattern.sub(new_block, content, count=1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced instructions successfully.")
else:
    print("Could not find the instruction box block!")
    sys.exit(1)
