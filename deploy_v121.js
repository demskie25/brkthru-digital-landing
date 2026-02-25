const fs = require('fs');

console.log("Starting V123 Deployment (Enneagram Reliability & PDF Upgrade)...");

// 1. GENERATE CHECKOUT.HTML (V123 with Link Stabilization)
const checkoutContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Review | Brkthru Coaching</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root { 
            --brand-navy: #0f172a;
            --brand-amber: #f59e0b;
            --brand-blue: #1e40af;
        }
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #1e293b; }
        h1, h2, h3 { font-family: 'Poppins', sans-serif; }
        .glass-card { 
            background: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(20px); 
            border: 1px solid rgba(255, 255, 255, 0.4); 
            box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.1); 
        }
        .hero-gradient { background: radial-gradient(circle at top right, #eff6ff 0%, #ffffff 100%); }
        
        .btn-premium { 
            background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%) !important;
            color: #ffffff !important; 
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            font-weight: 800 !important;
            padding: 20px !important;
            border-radius: 12px !important;
            text-decoration: none !important;
            font-size: 1.1rem !important;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: 0 10px 20px -5px rgba(30, 64, 175, 0.3) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-premium:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -10px rgba(30, 64, 175, 0.4) !important;
            filter: brightness(1.1);
        }
        .back-link {
            color: #64748b;
            font-size: 0.875rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 99px;
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .back-link:hover {
            color: #1e40af;
            transform: translateX(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 99px;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .badge-premium { background: rgba(245, 158, 11, 0.1); color: #b45309; border: 1px solid rgba(245, 158, 11, 0.2); }
    </style>
</head>
<body class="hero-gradient min-h-screen flex flex-col">
    <header class="w-full bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="index.html" class="back-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Return to Leadership Library
            </a>
            <a href="index.html">
                <img src="images/brkthru-logo.png" alt="Brkthru" class="h-8">
            </a>
        </div>
    </header>

    <main class="flex-grow max-w-7xl mx-auto w-full p-6 lg:p-12">
        <div class="grid lg:grid-cols-12 gap-12 items-start">
            
            <!-- LEFT COLUMN: EDUCATION & PROOF -->
            <div class="lg:col-span-7 space-y-10">
                <div class="space-y-4">
                    <div class="badge badge-premium">Instant Digital Access Included</div>
                    <h1 id="display-title" class="text-4xl lg:text-5xl font-black text-slate-900 leading-tight"></h1>
                    <p class="text-xl text-slate-500 font-medium leading-relaxed">The complete system for strategically humane leadership.</p>
                </div>

                <!-- VALUE PILLARS -->
                <div class="grid sm:grid-cols-2 gap-6">
                    <div class="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div class="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                            <svg class="text-amber-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <h3 class="font-bold text-slate-900 mb-2">The Archer (Mindset)</h3>
                        <p class="text-sm text-slate-500 leading-relaxed">Master the internal cognitive OS that determines your leadership potential.</p>
                    </div>
                    <div class="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                            <svg class="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                        </div>
                        <h3 class="font-bold text-slate-900 mb-2">The Scalpel (Machinery)</h3>
                        <p class="text-sm text-slate-500 leading-relaxed">Surgical precision tools, scripts, and procedures for real-world execution.</p>
                    </div>
                </div>

                <!-- TESTIMONIAL FEATURE -->
                <div class="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-6 opacity-10">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.995 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.982z"/></svg>
                    </div>
                    <div class="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                        <div class="shrink-0 text-center">
                            <img src="images/brkthru-logo.png" alt="Google" class="h-6 w-auto mb-4 opacity-50 grayscale invert brightness-0">
                            <div class="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">Used by Professionals @</div>
                            <div class="text-sm font-black text-white px-3 py-1 bg-white/10 rounded mt-1">Googleplex</div>
                        </div>
                        <div class="space-y-4">
                            <p class="text-lg italic text-slate-200">"Love del Rosario uses the World Class Coach framework as her 'virtual mentor' to manage stakeholders and lead with precision at the world's most respected tech giant."</p>
                            <div class="flex items-center gap-3">
                                <div>
                                    <p class="font-bold text-amber-500">Love del Rosario</p>
                                    <p class="text-xs text-slate-400 uppercase tracking-wider">Program Manager @ Google</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT COLUMN: CHECKOUT ACTION -->
            <div class="lg:col-span-5 sticky top-32">
                <div class="glass-card rounded-[2.5rem] p-10 lg:p-12">
                    <div class="flex items-center gap-6 mb-10">
                        <div class="relative w-24 shrink-0 shadow-2xl rounded-lg overflow-hidden border border-slate-100">
                            <img id="product-image" src="" alt="Product" class="w-full h-auto">
                        </div>
                        <div>
                            <p class="text-[0.6rem] font-black text-amber-600 uppercase tracking-widest mb-1">Your Order</p>
                            <p id="product-name-aside" class="font-bold text-slate-900 leading-tight"></p>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-slate-500 font-medium">Digital Edition Access</span>
                            <span class="text-slate-900 font-bold">Included</span>
                        </div>
                        <div class="flex justify-between items-center text-sm pb-8 border-b border-slate-100">
                            <span class="text-slate-500 font-medium">Leadership Library License</span>
                            <span class="text-slate-900 font-bold">Lifetime</span>
                        </div>
                        <div class="flex justify-between items-end pt-2">
                            <div>
                                <p class="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Investment</p>
                                <p id="product-price" class="text-5xl font-black text-slate-900 tracking-tight"></p>
                            </div>
                        </div>
                    </div>

                    <!-- CTA AREA -->
                    <div class="mt-10 space-y-6">
                        <a id="pay-link" href="" target="_blank" rel="noopener noreferrer" class="btn-premium">
                           Complete Secure Checkout
                        </a>
                        
                        <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                            <p class="text-[0.7rem] text-blue-800 leading-relaxed text-center font-medium">
                                <span class="font-bold">Next Step:</span> Clicking above will open our <strong>Secure HitPay Gateway</strong> in a new tab. Please keep this window open to return to our library after completion.
                            </p>
                        </div>

                        <div class="flex justify-center items-center gap-6 pt-2">
                            <div class="flex items-center gap-1.5 grayscale opacity-60">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <span class="text-[0.6rem] font-black uppercase tracking-widest">SSL SECURED</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p class="mt-8 text-center text-slate-400 text-[0.65rem] max-w-xs mx-auto leading-relaxed">
                    By completing this purchase, you'll receive instant access to the digital assets in your verified library dashboard.
                </p>
            </div>
        </div>
    </main>

    <script>
        const products = {
            'bundle': { 
                name: 'The Twin Bundle: WCC + Toolkit', 
                price: 'PHP 649.00', 
                img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc7b474d6eac960eccf.jpeg', 
                link: 'https://hitpay.link/n6dx11' 
            },
            'book': { 
                name: 'World-Class Coach (10th Anniv)', 
                price: 'PHP 399.00', 
                img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc667454159afb8d237.jpeg', 
                link: 'https://hitpay.link/mhy8sc' 
            },
            'toolkit': { 
                name: 'The Coaching Field Toolkit', 
                price: 'PHP 359.00', 
                img: 'https://img-thumb.mailinblue.com/10571077/images/content_library/original/69804bc73dad4cc88c5856e7.jpeg', 
                link: 'https://hitpay.link/9zlbvf' 
            },
            'enneagram': {
                name: 'Enneagram Assessment',
                price: 'PHP 299.00',
                img: 'images/maps.jpg', 
                link: 'https://hit-pay.com/brkthru-ventures/product/enneagram-assessment'
            }
        };
        window.onload = () => {
            const params = new URLSearchParams(window.location.search);
            const itemKey = params.get('item') || 'bundle';
            const product = products[itemKey];
            if (product) {
                document.getElementById('display-title').innerText = product.name;
                document.getElementById('product-name-aside').innerText = product.name;
                document.getElementById('product-price').innerText = product.price;
                document.getElementById('product-image').src = product.img;
                
                // STABILIZATION: Force no-referrer to bypass HitPay blank "lander" 이슈
                const payLink = document.getElementById('pay-link');
                payLink.href = product.link;
                payLink.setAttribute('rel', 'noopener noreferrer');
            }
        };
    </script>
</body>
</html>`;

try {
    fs.writeFileSync('checkout.html', checkoutContent, { encoding: 'utf8' });
    fs.writeFileSync('public/checkout.html', checkoutContent, { encoding: 'utf8' });
    console.log("SUCCESS: checkout.html (V123 Link Stabilized)");
} catch (e) {
    console.error("Error writing checkout.html:", e);
}


// 2. GENERATE ASSESSMENTS.HTML (V123)
try {
    const sourcePath = 'start-enneagram.html';
    const targetPath = 'assessments.html';

    if (!fs.existsSync(sourcePath)) {
        throw new Error(`${sourcePath} not found`);
    }

    let src = fs.readFileSync(sourcePath, 'utf8');

    // 1. Header & CSS additions (Refined for V123)
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
            /* PDF Branding Styles (V123 Fidelity Fix) */
            .pdf-only { display: none; }
            .pdf-rendering .pdf-only { display: block !important; }
            
            /* Prevention of premature cuts */
            .pdf-rendering .report-card { 
                page-break-inside: avoid !important; 
                margin-bottom: 30px !important;
            }
            .pdf-rendering h1, .pdf-rendering h2, .pdf-rendering h3 { 
                page-break-after: avoid !important; 
            }
            
            /* Enlarge the map for PDF */
            .pdf-rendering .circular-diagram-container {
                page-break-before: always !important;
                padding-top: 50px !important;
            }
            .pdf-rendering #enneagramCircleSvg {
                width: 100% !important;
                max-width: 650px !important;
                margin: 0 auto !important;
                height: auto !important;
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
    src = src.replace(/<a href="\/assessments"[^>]*>Go to Assessments<\/a>/, '<a href="https://hit-pay.com/brkthru-ventures/product/enneagram-assessment" class="btn btn-primary bg-white text-black font-bold">Unlock Access via HitPay</a>');
    
    // 4. MAIN APP CONTENT (Alpine version)
    src = src.replace('<div id="appContent" class="hidden">', '<div id="appContent" x-show="enneagramUnlocked" x-cloak>');

    // 5. Backdoor Trigger
    src = src.replace('<h1 class="text-4xl font-bold mb-4">Access Restricted</h1>', '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl font-bold mb-4 cursor-pointer select-none">Access Restricted</h1>');
    src = src.replace('<h1 class="text-4xl main-title text-center">Meta-Programs Assessment for Leaders</h1>', '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl main-title text-center cursor-pointer select-none">Meta-Programs Assessment for Leaders</h1>');

    // 6. Return Button Logic
    const oldReturn = '<button id="returnButton" class="btn btn-primary w-full md:w-auto mt-12 py-4 px-10 text-lg">Return to Website</button>';
    const newReturn = '<div class="flex justify-center mt-12"><button id="returnButton" class="btn btn-primary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button></div>';
    src = src.replace(oldReturn, newReturn);

    // 7. Inject V123 Logic (Zero-Handshake Pabbly + Premium PDF)
    const v123Logic = `
        <!-- V123 RELIABILITY & REPORTING ENGINE -->
        <script>
            const BRKTHRU_LOGO_B64 = "iVBORw0KGgoAAAANSUhEUgAAAlgAAADRCAYAAAAQRszlAAAAAXNSR0IArs4c6QAAIABJREFUeF7sfQdgVFX2/rmvTC/pvSeEUJMQAiRACB3WRbEEEbtrXXuvu0bXte26unaw4VpXRKRZVkVsi4ooIkgv6X2S6TOv3f//3jcTWX+4C0pigDsuO0nmzXv3fu/Om++d853vIGAPhgBDgCHAEGAIMAQYAgyBw4oAOqx7YztjCAxsBMh6xwN7iGx0DAGGAEOAIXA0IDAQCBb70jsaVtLAmcNPrSe2zgbOOWIjYQgwBBgCRz0C/U2wUG11NQ/V1Vptba121KPLJvhrIhBd2/tHrBjJ+jXPCDs2Q4AhwBA4hhDoN4J1VfU5MR7w3phfWFi0b9fez5EVPbNo5SudxxDWbKq/AgIXll0o+lKabLLfIi9Zu8T3KwyBHZIhwBBgCDAEjkEE+pxgYQCEAPDFU2rSv9u5Y/XM38wu3vz9ZslptH8mAr84yWx5vXblosAxiD2b8uFHIBqhQtXV1bwQRvOKhg07xWjgU9Z9vk5KjEu8Z/n7q989/Idle2QIMAQYAgwBhsB/ItDnBCt6uAvH12Rtr9+zMiM9feTkqknw7/VfgDPRqYUCwXcNmvDg399a/D4TILPlebgQqB45NmNHQ93q6TNnjXTabPCvd1fDsKFFX4dl7YJVa979+nAdh+2HIcAQYAgwBBgCB0Kg3wjWueUnZO5q2Lc6Mzl9RGpSCi4eVQLL31qBCkYWgobUbgiqCwXN+Nd7lj3WxU4VQ+CXIjC+uHzY9j17VyfFJ2b7fV6cmpyEU9MSOWesY4Pf4z19yTvvbP+lx2DvZwgwBBgCDAGGwE8h0G8Eq2bob1KaO5pWZaWml6lBmQqPjzv+OPjw4w8gITMJiTYBUhKSP+rucF1X+8KjX0VTi2S7/X9mp5IhcDAIjC8Zd3ZDY+MTMU6nOej3YYfTBjk5GZCRk4naWtvuVg2mO5YsWSIdzL7YNgwBhgBDgCHAEDhUBPqNYJ2YPyOpxdO6PCclfVzYG8SSLwSiKELNafNg3fpPwRxrBmwClJObuyPU5bnsuqcfeO8gJsOqwg4CpGNtk6KiongzMr/Q1tIyOzEhAbu7XZCZngrJaYmQnJGEMGi7uts9J7+yYsWmYw0bNl+GAEOAIcAQ6B8E+o1g1RRMTKxzdS3Py8qtCHcHccgTAIvJAl6vD5913hlo07avwRf2YmuijUtITXCZwfSgv8v12M0vP9HNIlj9sxiOhqNMHj95sMfrOdtqtV2z8/ttxqSEJHD3dOOs7DRISIjBmTmpHCegttaWzlNeWbbq06NhzmwODAGGAEOAITDwEOg3gkUiWI2uhjcJwVI8Eg57JBAAgdFsBZ/fDVVTKiExPR7eX/svyBmWh0BEODs9c6Wrw33nzU8/sGHgQcdGNAARQFUVVVfYHNZar9sfs2vrdpwYn0gIFuTkZkBCohMyslKRIHKu9vbOmheWrFwzAOfAhsQQYAgwBBgCRwEC/UqwmlwNK3Iy8sYqXgnLPgU4QCCKRgBOBV5AkJ6TCjNmTYOXl7wA6XnpoBo0yCnMaw52+e6Xwz3P37RokfsowJxNoY8QKCsrE61G66Mxcc4LOlq70J7tO3FKYhJ43d0oJz8Lx8TaISsnHYlGQ6ClqeWsF5euXNpHQ2G7ZQgwBBgCDIFjHIF+I1i/yalO6XJ3rsrJzCnT/CoOuUMg8gbgeR4EAw+iyAPiNHA4LTDvjFPhxVcWQ2JWMmgmDaXkpCs+l+fNgMd/013PL9p9jJ8zNv2fQGDOnDkWd7f7DavVMrOzrRM37KmH9JRU5Opsx/mFueCIsZFIFuKNotzS0HL9i0tXPMysQdhyYggwBBgCDIG+QKDfCNZJQyamNrR2ryrIzBkFQcBhnwQc8GA0G0AQBCp4B6yC1WYCt7cbLrn8Enj7/VXQ6m6D+Mx4lJCeDCFJ2uTv6rn+T88ueo+Yl/YFIGyfRy4Cx48/3t7D9awyGA1VrrYu3NLQCKmJqdDj6oRBRYPAEWNFaenJYLCYlaZ9dXcWlvjvqa1dqxy5M2YjZwgwBBgCDIGBikC/EayanOqUenfn6sKcwlE4qFKCZTIYgRcFMBgEEAQD4nmEEWhgMhvB7XXDzOOmQ0jzwZp1ayE1NxVMcTYkmkztPa1d92bz2qMXLVokD1Rg2bj6H4Hq6uoYSZJWmkymCYRgtTe3oNTEVBwlWBabEXJyMxFnENWm+sY7FcF0L7Nq6P/zxI7IEGAIMASOBQT6jWAdnzs1ub2nfXlRftFY7JOxpiAQeQFEo06wOE4AnkfA8RzwPAdYwxCWAzBi1HBITE+Et9ashrS8DOBsArLFO6GrsfMps8L/4dan/972oxPFrBuOhZV7gDlOmDAhVgpLqyxmc2VXWyfuau2EjORU3OXqQEXDisBsNUB2TgYCgVeb6hvuKGIRrGN0pbBpMwQYAgyBvkeg3wjWiUVT49tau94YVjSkCgIYI8wBjzgwW02AkJ7tI2lCQrAQQsAhAJ7jwB8KQEpmElRMGgfPvfIspOelgWbkUGJ6Kni73WuDbv8Nf3rq8fV9DxU7wkBHYOrUqfHuHvdqs8k0tqfDjTtb2yAzJQ1393ShYcOGgGDmKcFCooAb6+ruUEXrXUuWLFEH+rzY+BgCDAGGAEPgyEOgXwlWZ2fP64PzB1WbsQljFSjBMphEPXIliMAhDALPU90xh3jQVA2AkC8Og4xkOGXBKfD6ildBEzXgrUZIyU5Hiqru6WnsuLr2qUdXHHnwsxEfTgQmTpyY6HV737JYzKM9XV7c3dFJCBa4ujuhuHgEYEGDrOxUxBlFaKlr+csgwXhbLXNzP5yngO2LIcAQYAgwBCII9BvBOq1wTkJDZxOJYE0kBItEsHRxOw8GkQcVAyVagDGNYmEVA8eRaBYHGmFjHIawFoKT58+FdV/+G5q6WwCMABmD8pCCtY7uhvZLbn/y76zs/hhe2pWVlUk+j+8tm81a5u7qwd3tLshKTQd3jwtGFA8HzKmQmZMKBqsZ7dtT92gqb77hwSVLgscwZGzqDAGGAEOAIdBHCPQbwSR9CWydmTIOVgmdakwIFjvOsCyMmj0gmo4JLa2tUNtUAzqngd3nhIT0JKZxFaaq1lReu8rFOx7+oOSbAQtF/tRYXTx0VnxECK3Kycg67dTjT6YVe8vBIcnAugiZYr1p8s7EOw/onMQ9Qed1qKyvgja1m/RE+ypcnPuspz55de8Bv+sXEbRfeoYzUsc5ulXlH067a/rEEWNpRWkFiMhx6dcw45j2EENLLP5PTGqGlyVIz8skVY11VaAas575bvWOX/p9A/n59MyRvpruzkePnTzx0pq";

            // --- 1. ZERO-HANDSHAKE PABBLY SYNC ---
            function submitToPabblyHidden(payload) {
                console.log("V123: Zero-Handshake Pabbly Sync Initiated...");
                const iframeName = 'pabbly_sync_frame_' + Date.now();
                const iframe = document.createElement('iframe');
                iframe.name = iframeName;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzNTA0MzQ1MjZiNTUzNjUxMzYi_pc';
                form.target = iframeName;

                for (const key in payload) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = typeof payload[key] === 'object' ? JSON.stringify(payload[key]) : payload[key];
                    form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();
                setTimeout(() => {
                    if(document.body.contains(form)) document.body.removeChild(form);
                    if(document.body.contains(iframe)) document.body.removeChild(iframe);
                    console.log("Pabbly Sync Cleanup Complete.");
                }, 5000);
            }

            // --- 2. PREMIUM PDF GENERATION ENGINE ---
            window.generatePDF = function() {
                const element = document.getElementById('pdfContentArea');
                const userName = (participantData && participantData.firstName) ? (participantData.firstName + ' ' + participantData.familyName) : 'Leader';
                
                // Activate Rendering Mode
                element.classList.add('pdf-rendering');

                const opt = {
                    margin:       [1.0, 0.75, 1.0, 0.75], // Slightly larger margins for branding
                    filename:     'Enneagram_Report_' + userName.replace(/\\s+/g, '_') + '.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
                    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
                };

                html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
                    const totalPages = pdf.internal.getNumberOfPages();
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    
                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i);
                        
                        // Header: Branding Text
                        pdf.setFontSize(8);
                        pdf.setTextColor(150);
                        pdf.text('Full Enneagram Report for ' + userName + ' | Brkthru Digital V123', pageWidth/2, 0.5, { align: 'center' });
                        
                        // Footer Line
                        pdf.setDrawColor(230);
                        pdf.line(0.75, pageHeight - 0.75, pageWidth - 0.75, pageHeight - 0.75);
                        
                        // Footer: Logo (Manual Draw)
                        try {
                            pdf.addImage(BRKTHRU_LOGO_B64, 'PNG', 0.75, pageHeight - 0.65, 1.2, 0.4);
                        } catch(e) { console.error("Logo Draw Error", e); }
                        
                        // Footer: Link
                        pdf.setTextColor(30, 64, 175); // Brand Blue
                        pdf.textWithLink('brkthrucoaching.com', 2.1, pageHeight - 0.45, { url: 'https://brkthrucoaching.com' });
                        
                        // Footer: Page Numbers
                        pdf.setTextColor(150);
                        pdf.text('Page ' + i + ' of ' + totalPages, pageWidth - 0.75, pageHeight - 0.45, { align: 'right' });
                    }
                }).save().then(() => {
                    element.classList.remove('pdf-rendering');
                });
            };

            // --- 3. DUAL-BACKEND SYNC WRAPPER ---
            async function sendResultsToBackend(userData) {
                console.log("V123: Triggering Dual-Backend Sync...");
                const fullName = userData.firstName + ' ' + userData.familyName;
                const summary = 'Enneagram Results: ' + JSON.stringify(userData.scores);

                const pabblyPayload = {
                    name: fullName,
                    email: userData.email,
                    bcc: 'brkthru.consulting@gmail.com',
                    company: userData.company || 'N/A',
                    position: userData.position || 'N/A',
                    source: 'Enneagram Assessment V123 (Build-Injected)',
                    message: summary,
                    raw_data: JSON.stringify(userData)
                };

                submitToPabblyHidden(pabblyPayload);
                alert("Results captured! Please download your PDF report below.");
            }

            // Sync with Finish Button
            (function() {
                const poll = setInterval(() => {
                    const btn = document.getElementById('finishButton');
                    if(btn) {
                        btn.onclick = async () => {
                             const fs = {}; for(let i=1; i<=9; i++) fs[i] = 0;
                             userAnswers.forEach((ans, i) => { if(ans !== undefined) questions[i].scoring[ans].forEach(t => fs[t]++); });
                             const reportData = { ...participantData, scores: fs, timestamp: new Date().toISOString() };
                             await sendResultsToBackend(reportData);
                             displayResults(fs);
                        };
                        clearInterval(poll);
                    }
                }, 100);
            })();
        </script>
    `;

    src = src.replace('</body>', `${v123Logic}\n</body>`);
    
    // Robust Title Replacement
    src = src.replace(/<title>.*<\/title>/, '<title>Enneagram Assessment for Leaders (V123)</title>');

    fs.writeFileSync(targetPath, src, 'utf8');
    console.log("SUCCESS: assessments.html (V123 Upgrade)");

} catch (e) {
    console.error("Error updating assessments.html:", e);
}

