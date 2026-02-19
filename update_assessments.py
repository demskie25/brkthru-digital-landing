import os

def final_assembly():
    source_path = r'e:\brkthru-digital-landing\start-enneagram.html'
    target_path = r'e:\brkthru-digital-landing\assessments.html'
    
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    with open(source_path, 'r', encoding='utf-8') as f:
        src = f.read()
    
    # 1. Header & CSS additions
    head_additions = """
    <link rel="stylesheet" href="universal-header.css">
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <style>
        [x-cloak] { display: none !important; }
        .backdoor-indicator {
            position: fixed; top: 0; left: 0; right: 0;
            background: #4A148C; color: #FFD700; text-align: center;
            font-size: 10px; font-weight: bold; z-index: 99999;
            padding: 4px; border-bottom: 2px solid #FFD700;
        }
    </style>
    """
    src = src.replace('<head>', '<head>\n    ' + head_additions)

    # 2. Alpine initialization & Universal Header
    alpine_init = """<body x-data="{ enneagramUnlocked: new URLSearchParams(window.location.search).get('status') === 'completed', backdoorClicks: 0 }">
    <div x-show="enneagramUnlocked" x-cloak class="backdoor-indicator uppercase tracking-widest">Master Access: Assessment Unlocked</div>
    """
    
    universal_header = """
    <!-- UNIVERSAL HEADER -->
    <nav class="univ-header">
        <div class="univ-container">
            <a href="index.html" class="univ-logo">
                <img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">
                <span class="univ-logo-accent">DIGITAL</span>
            </a>
            <div class="univ-nav">
                <a href="index.html" class="univ-nav-item">HOME</a>
                <a href="odyssey.html" class="univ-nav-item">OUR ODYSSEY</a>
                <a href="assessments.html" class="univ-nav-item active">ASSESSMENTS</a>
                <a href="shop.html" class="univ-nav-item">SHOP</a>
            </div>
            <div class="univ-utility">
                <a href="index.html#tour" class="univ-btn-tour">TOUR 2026</a>
            </div>
        </div>
    </nav>
    <div class="univ-spacer"></div>
    """
    
    src = src.replace('<body>', alpine_init + "\n" + universal_header)

    # 3. GATEKEEPER OVERLAY (Alpine version)
    src = src.replace('<div id="accessDeniedOverlay">', '<div id="accessDeniedOverlay" x-show="!enneagramUnlocked" x-cloak>')
    
    # Update HitPay Link in Overlay
    old_overlay_btn = '<a href="/assessments" class="btn btn-primary bg-white text-black font-bold">Go to Assessments</a>'
    new_overlay_btn = '<a href="https://hitpay.app/pay/brkthru" class="btn btn-primary bg-white text-black font-bold">Unlock Access via HitPay</a>'
    src = src.replace(old_overlay_btn, new_overlay_btn)

    # 4. MAIN APP CONTENT (Alpine version)
    src = src.replace('<div id="appContent" class="hidden">', '<div id="appContent" x-show="enneagramUnlocked" x-cloak>')

    # 5. Backdoor Trigger on Overlay Heading
    overlay_h1 = '<h1 class="text-4xl font-bold mb-4">Access Restricted</h1>'
    backdoor_h1 = '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl font-bold mb-4 cursor-pointer select-none active:scale-95 transition-transform">Access Restricted</h1>'
    src = src.replace(overlay_h1, backdoor_h1)

    # Secondary Backdoor on Main Heading
    old_h1 = '<h1 class="text-4xl main-title text-center">Meta-Programs Assessment for Leaders</h1>'
    new_h1 = '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl main-title text-center cursor-pointer select-none">Meta-Programs Assessment for Leaders</h1>'
    src = src.replace(old_h1, new_h1)

    # 6. Inject Email Backend Logic (with BCC)
    backend_script = """
        async function sendResultsToBackend(userData) {
            console.log("Initiating backend sync...");
            const url = 'https://script.google.com/macros/s/AKfycbxyWY3MHZSKq7jQBqYS6duo2zageOFGendaJbzYEDZn1fs4wCeFy91gt5af0aqqpEq-3A/exec'; 
            
            const formData = new URLSearchParams();
            for (const key in userData) {
                if (typeof userData[key] === 'object') {
                    formData.append(key, JSON.stringify(userData[key]));
                } else {
                    formData.append(key, userData[key]);
                }
            }
            // CRITICAL: Inject BCC to Brkthru Consulting as requested
            formData.append('bcc', 'brkthru.consulting@gmail.com');
            formData.append('notification_type', 'enneagram_report_v26');
            formData.append('project', 'Brkthru Digital V119');

            try {
                await fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });
                console.log("Results synced successfully (BCC enabled).");
                alert("Results captured! A profile summary has been sent to your email and our consulting team.");
            } catch (e) {
                console.error("Reporting error:", e);
                alert("Data reached the gateway. If you don't receive an email within 5 minutes, please download the PDF manually.");
            }
        }
    """
    
    # Inject into the script section
    marker = "const circularDiagramSvg = document.getElementById('enneagramCircleSvg');"
    src = src.replace(marker, backend_script + "\n        " + marker)

    # 7. Update Finish Button to trigger backend send
    # Exact match from start-enneagram.html
    old_finish = """        document.getElementById('finishButton').onclick = () => {
            const fs = {}; for(let i=1; i<=9; i++) fs[i] = 0;
            userAnswers.forEach((ans, i) => { if(ans !== undefined) questions[i].scoring[ans].forEach(t => fs[t]++); });
            displayResults(fs);
        };"""
    
    new_finish = """        document.getElementById('finishButton').onclick = async () => {
            const fs = {}; for(let i=1; i<=9; i++) fs[i] = 0;
            userAnswers.forEach((ans, i) => { if(ans !== undefined) questions[i].scoring[ans].forEach(t => fs[t]++); });
            
            // Prepare Data for Backend
            const reportData = {
                ...participantData,
                scores: fs,
                timestamp: new Date().toISOString(),
                source: 'Brkthru Digital Assessments V119'
            };
            
            // Trigger Backend Sync
            await sendResultsToBackend(reportData);
            
            displayResults(fs);
        };"""
    src = src.replace(old_finish, new_finish)

    # 8. Visual Refinements
    old_return = '<button id="returnButton" class="btn btn-primary w-full md:w-auto mt-12 py-4 px-10 text-lg">Return to Website</button>'
    new_return = '<div class="flex justify-center mt-12"><button id="returnButton" class="btn btn-primary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button></div>'
    src = src.replace(old_return, new_return)

    # Cache Busting V119
    src = src.replace('<title>Enneagram Assessment for Leaders</title>', '<title>Enneagram Assessment for Leaders (V119)</title>')

    # 9. Safety Keyword Check
    if 'Full Leadership Intelligence Report' not in src:
        print("Warning: Content missing!")

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(src)

    print("Success: Generated assessments.html with V119 logic")

if __name__ == "__main__":
    final_assembly()
