import os

# Target file
target_file = r"e:\brkthru-digital-landing\assessments.html"

# Read the content
try:
    with open(target_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Update x-data and results-ready trigger
    target1 = '''<div id="appContent" x-show="enneagramUnlocked" x-cloak x-data="{ hasFinished: false, currentStep: 'intro' }"
        @results-ready.window="hasFinished = true" @quiz-start.window="currentStep = 'quiz'">'''

    replacement1 = '''<div id="appContent" x-show="enneagramUnlocked" x-cloak x-data="{ hasFinished: false, currentStep: 'intro', showGoFullPagePopup: false, showDetailedInstructions: false }"
        @results-ready.window="hasFinished = true; showGoFullPagePopup = true" @quiz-start.window="currentStep = 'quiz'">'''

    if target1 in content:
        content = content.replace(target1, replacement1)
        print("Success: Updated x-data")
    else:
        print("Error: Could not find target1")

    # 2. Add the modals
    target2 = '''                <div class="flex justify-center mt-12"><button id="returnButton"
                        class="btn btn-primary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button>
                </div>
            </div>
        </div>'''

    replacement2 = target2 + '''

        <!-- GoFullPage Initial Popup -->
        <div x-show="showGoFullPagePopup && !showDetailedInstructions" x-transition 
            class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-2xl">
            <div class="bg-black/95 backdrop-blur-xl border-2 border-yellow-500/50 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none"></div>
                <div class="flex items-center gap-4 relative z-10 text-center md:text-left">
                    <div class="hidden md:flex w-12 h-12 bg-yellow-500/20 rounded-full items-center justify-center shrink-0">
                        <i class="fa-solid fa-triangle-exclamation text-yellow-500 text-xl"></i>
                    </div>
                    <div>
                        <p class="text-white font-bold text-lg leading-tight">If you don't want to lose this report, do not close or refresh this page.</p>
                        <p class="text-yellow-500/80 text-sm mt-1">Your results are dynamic and not saved on our server.</p>
                    </div>
                </div>
                <button @click="showDetailedInstructions = true" 
                    class="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 whitespace-nowrap relative z-10 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                    To Save Your Full Enneagram Report, click here
                </button>
                <button @click="showGoFullPagePopup = false" class="absolute top-2 right-4 text-white/30 hover:text-white transition-colors">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>

        <!-- GoFullPage Detailed Instructions Modal -->
        <div x-show="showDetailedInstructions" x-cloak 
            class="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div @click="showDetailedInstructions = false" class="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"></div>
            
            <div class="bg-white rounded-[2rem] shadow-2xl relative z-10 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <!-- Header -->
                <div class="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white relative">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
                    <div class="flex justify-between items-start relative z-10">
                        <div>
                            <span class="inline-block px-3 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full mb-3">Save Instructions</span>
                            <h3 class="text-3xl font-black">How to Save Your Report</h3>
                            <p class="text-white/60 mt-2 font-medium italic">Follow these steps carefully to ensure 100% resolution.</p>
                        </div>
                        <button @click="showDetailedInstructions = false" class="text-white/40 hover:text-white transition-colors">
                            <i class="fa-solid fa-circle-xmark text-3xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Steps -->
                <div class="p-8 space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start">
                            <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0 font-black">1</div>
                            <div>
                                <h4 class="font-bold text-slate-900">Open a NEW TAB</h4>
                                <p class="text-slate-500 text-xs mt-1">In Google Chrome. <span class="text-red-500 font-bold">Do not close this page.</span></p>
                            </div>
                        </div>
                        <div class="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start">
                            <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0 font-black">2</div>
                            <div>
                                <h4 class="font-bold text-slate-900">Install Extension</h4>
                                <p class="text-slate-500 text-xs mt-1">Search/Install free <span class="font-bold underline">"GoFullPage"</span> extension.</p>
                            </div>
                        </div>
                        <div class="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start">
                            <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0 font-black">3</div>
                            <div>
                                <h4 class="font-bold text-slate-900">Find Camera Icon</h4>
                                <p class="text-slate-500 text-xs mt-1">Click the extension (camera) while on this page.</p>
                            </div>
                        </div>
                        <div class="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start">
                            <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0 font-black">4</div>
                            <div>
                                <h4 class="font-bold text-slate-900">Download PDF</h4>
                                <p class="text-slate-500 text-xs mt-1">Wait for scan, then click the PDF icon to save.</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                        <div class="shrink-0">
                            <i class="fa-solid fa-shield-halved text-yellow-600 text-4xl"></i>
                        </div>
                        <div class="text-center md:text-left">
                            <p class="text-yellow-950 font-black text-sm uppercase tracking-tight">Security Check Required</p>
                            <p class="text-yellow-800 text-xs mt-1 leading-relaxed">
                                Because your results are generated in real-time on your computer, closing this page clears the data. 
                                <span class="font-bold">Using GoFullPage is the only way to capture the high-resolution charts.</span>
                            </p>
                        </div>
                    </div>

                    <button @click="showDetailedInstructions = false" 
                        class="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg transition-transform hover:scale-[1.02] shadow-xl">
                        I Understand, Take Me Back to My Report
                    </button>
                </div>
            </div>
        </div>'''

    if target2 in content:
        content = content.replace(target2, replacement2)
        print("Success: Added modals")
    else:
        print("Error: Could not find target2")

    # Save back
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Files saved successfully.")
except Exception as e:
    print(f"Error: {e}")
