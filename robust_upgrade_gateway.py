import os
import re

files = [
    'e:/brkthru-digital-landing/assessments.html',
    'e:/brkthru-digital-landing/start-enneagram.html',
    'e:/brkthru-digital-landing/live_assessments_debug.html',
    'e:/brkthru-digital-landing/live_check.html',
    'e:/brkthru-digital-landing/live_check2.html',
    'e:/brkthru-digital-landing/live_check3.html'
]

premium_html = """
    <!-- 1. PREMIUM GATEKEEPER OVERLAY -->
    <div id="accessDeniedOverlay" x-show="!enneagramUnlocked" x-cloak class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
        <!-- Premium Background -->
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('images/enneagram logo.jpg');"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-slate-900/90 backdrop-blur-md"></div>
        
        <!-- Premium Card -->
        <div class="glass-card max-w-md w-full rounded-[3rem] p-10 lg:p-14 relative z-10 bg-white/95 backdrop-blur-2xl border border-white/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <div class="flex justify-center mb-8">
                <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[0.65rem] font-black uppercase tracking-[0.2em]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Premium Access Key
                </span>
            </div>
            <div class="text-center mb-10">
                <h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-4 cursor-pointer select-none">
                    Unlock Your <span class="text-blue-700">Inner Core.</span>
                </h1>
                <p class="text-slate-500 font-medium leading-relaxed">
                    You are one transaction away from revealing the cognitive machinery that drives your leadership style.
                </p>
            </div>
            <div class="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100 flex items-center justify-between">
                <div>
                    <p class="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-1">One-Time License</p>
                    <div class="flex items-baseline gap-1">
                        <span class="text-slate-900 font-black text-3xl">₱299</span>
                        <span class="text-slate-400 font-bold text-sm">.00</span>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-[0.6rem] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Lifetime</span>
                </div>
            </div>
            <div class="space-y-6">
                <a href="https://hitpay.app/pay/brkthru" class="block w-full py-5 rounded-2xl text-white font-black text-lg uppercase tracking-wider text-center bg-blue-700 shadow-xl hover:bg-blue-800 transition-all font-bold">
                    Unlock Access Now
                </a>
                <div class="flex items-center justify-center gap-3 grayscale opacity-40">
                    <img src="images/brkthru-logo.png" alt="BRKTHRU" class="h-4 opacity-50">
                    <span class="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">Secure Gateway</span>
                </div>
            </div>
            <p class="mt-10 text-center text-slate-400 text-[0.65rem] leading-relaxed">
                Payment verified by <strong>HitPay</strong>. Your assessment dashboard will activate immediately upon completion.
            </p>
        </div>
    </div>
"""

new_css = """
        #accessDeniedOverlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 9999;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
        }
"""

old_css_pattern = re.compile(r'#accessDeniedOverlay\s*{[^{}]*background:[^;}]*rgba\(0,0,0,0\.95\)[^}]*}', re.DOTALL)
old_gate_pattern = re.compile(r'<div id="accessDeniedOverlay" x-show="!enneagramUnlocked" x-cloak>.*?Access Restricted.*?</a>\s*</div>\s*</div>', re.DOTALL)

for fpath in files:
    if not os.path.exists(fpath): continue
    print(f"Processing {fpath}...")
    try:
        # Detect encoding and read
        with open(fpath, 'rb') as f:
            raw = f.read()
        
        content = None
        if raw.startswith(b'\xff\xfe'):
            content = raw.decode('utf-16')
            print(f"Decoded {fpath} as UTF-16LE")
        elif b'\x00' in raw[:100]:
            try:
                content = raw.decode('utf-16')
                print(f"Decoded {fpath} as UTF-16 (no BOM)")
            except: pass
        
        if content is None:
            try:
                content = raw.decode('utf-8')
                print(f"Decoded {fpath} as UTF-8")
            except:
                content = raw.decode('latin-1')
                print(f"Decoded {fpath} as Latin-1")

        # Upgrade Content
        orig_len = len(content)
        content = old_css_pattern.sub(new_css, content)
        content = old_gate_pattern.sub(premium_html, content)
        
        if len(content) != orig_len:
            print(f"Successfully upgraded {fpath}")
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            print(f"No changes made to {fpath} (pattern not found)")
            # Still save as UTF-8 if it was UTF-16
            if b'\x00' in raw[:100]:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Converted {fpath} to UTF-8 regardless")

    except Exception as e:
        print(f"Error processing {fpath}: {e}")

print("Robust upgrade complete.")
