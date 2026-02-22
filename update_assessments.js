const fs = require('fs');

const sourcePath = 'start-enneagram.html';
const targetPath = 'assessments.html';

if (!fs.existsSync(sourcePath)) {
    console.error(`Error: ${sourcePath} not found`);
    process.exit(1);
}

let src = fs.readFileSync(sourcePath, 'utf8');

// 1. Header & CSS additions
const headAdditions = `
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
`;
src = src.replace('<head>', `<head>\n    ${headAdditions}`);

// 2. Alpine initialization & Universal Header
const alpineInit = `<body x-data="{ enneagramUnlocked: new URLSearchParams(window.location.search).get('status') === 'completed', backdoorClicks: 0 }">
    <div x-show="enneagramUnlocked" x-cloak class="backdoor-indicator uppercase tracking-widest">Master Access: Assessment Unlocked</div>
`;

const universalHeader = `
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
`;

src = src.replace('<body>', `${alpineInit}\n${universalHeader}`);

// 3. GATEKEEPER OVERLAY (Alpine version)
src = src.replace('<div id="accessDeniedOverlay">', '<div id="accessDeniedOverlay" x-show="!enneagramUnlocked" x-cloak>');

// Update HitPay Link in Overlay - USING ROBUST REGEX REPLACEMENT
// Matches "Go to Assessments" button regardless of whitespace
const overlayBtnRegex = /<a href="\/assessments" class="btn btn-primary[^>]*>Go to Assessments<\/a>/;
const newOverlayBtn = '<a href="checkout.html?item=enneagram" class="btn btn-primary bg-white text-black font-bold">Unlock Access via HitPay</a>';
src = src.replace(overlayBtnRegex, newOverlayBtn);

// 4. MAIN APP CONTENT (Alpine version)
src = src.replace('<div id="appContent" class="hidden">', '<div id="appContent" x-show="enneagramUnlocked" x-cloak>');

// 5. Backdoor Trigger on Overlay Heading
const overlayH1 = '<h1 class="text-4xl font-bold mb-4">Access Restricted</h1>';
const backdoorH1 = '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl font-bold mb-4 cursor-pointer select-none active:scale-95 transition-transform">Access Restricted</h1>';
src = src.replace(overlayH1, backdoorH1);

// Secondary Backdoor on Main Heading
const oldH1 = '<h1 class="text-4xl main-title text-center">Meta-Programs Assessment for Leaders</h1>';
const newH1 = '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl main-title text-center cursor-pointer select-none">Meta-Programs Assessment for Leaders</h1>';
src = src.replace(oldH1, newH1);

// 6. Return Button Logic
const oldReturn = '<button id="returnButton" class="btn btn-primary w-full md:w-auto mt-12 py-4 px-10 text-lg">Return to Website</button>';
const newReturn = '<div class="flex justify-center mt-12"><button id="returnButton" class="btn btn-primary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button></div>';
src = src.replace(oldReturn, newReturn);

// 7. Inject Email Backend Logic (using append approach)
const backendInjection = `
    <!-- INJECTED BACKEND LOGIC V119 -->
    <script>
        // Define Backend Sync Function
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
                // We use no-cors to interact with Apps Script redirection silently
                await fetch(url, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                });
                console.log("Results synced successfully (BCC enabled).");
            } catch (e) {
                console.error("Reporting error:", e);
                alert("Note: Data reached the gateway, but handshake failed. Please download the PDF manualy if email doesn't arrive.");
            }
        }

        // Override Finish Button Handler safely
        (function() {
            const btn = document.getElementById('finishButton');
            if(btn) {
                btn.onclick = async () => {
                   // Reuse global variables from original script
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
                    
                    // Call Original Display Logic (defined in previous script)
                    displayResults(fs);
                };
                console.log("Finish Button Logic Updated for V119");
            } else {
                console.error("Finish Button not found for V119 injection");
            }
        })();
    </script>
`;

// Append before body closing tag
src = src.replace('</body>', `${backendInjection}\n</body>`);

// Cache Busting V119 - Update Title for Version
src = src.replace('<title>Enneagram Assessment for Leaders</title>', '<title>Enneagram Assessment for Leaders (V120)</title>');

fs.writeFileSync(targetPath, src, 'utf8');
console.log("Success: Generated assessments.html with V120 logic (Premium Checkout Redirect)");
