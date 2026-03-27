import os

target_file = r"e:\brkthru-digital-landing\start-enneagram.html"

with open(target_file, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Target button to insert before
target_btn = '<button id="proceedToAssessmentButton" class="btn btn-primary w-full mt-8 text-xl h-16 shadow-xl">Begin\n                    Assessment</button>'

system_check_html = '''
                <!-- SYSTEM CHECK BOX (V74) -->
                <div class="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm">
                    <div class="bg-amber-100 p-3 rounded-full shrink-0">
                        <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-black text-amber-900 uppercase tracking-tight text-sm mb-1">System Check Recommended</h4>
                        <p class="text-amber-800 text-sm leading-relaxed">
                            This assessment generates complex, high-resolution leadership charts. <strong>Use Desktop Google Chrome or Microsoft Edge for the most reliable results and saving experience.</strong>
                        </p>
                    </div>
                </div>
                '''

if target_btn in content:
    content = content.replace(target_btn, system_check_html + target_btn)
    print("Success: Added System Check to start-enneagram.html")
else:
    print("Error: Could not find proceedToAssessmentButton")

with open(target_file, 'w', encoding='utf-8') as f:
    f.write(content)
