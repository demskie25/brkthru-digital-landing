import os

def final_assembly():
    source_path = r'e:\brkthru-digital-landing\start-enneagram.html'
    target_path = r'e:\brkthru-digital-landing\assessments.html'
    
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found")
        return

    with open(source_path, 'r', encoding='utf-8') as f:
        src = f.read()
    
    # Header & CSS additions
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
    src = src.replace('<head>', f'<head>\n    {head_additions}')

    # Alpine initialization - managing both backdoor and gatekeeper bypass
    alpine_init = """<body x-data="{ enneagramUnlocked: false, backdoorClicks: 0 }">
    <div x-show="enneagramUnlocked" x-cloak class="backdoor-indicator uppercase tracking-widest">Master Access: Assessment Unlocked</div>
    """
    src = src.replace('<body>', alpine_init)

    # Universal Header
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
    src = src.replace('<body x-data="{ enneagramUnlocked: false, backdoorClicks: 0 }">', 
                      f'<body x-data="{{ enneagramUnlocked: false, backdoorClicks: 0 }}">\n{universal_header}')

    # 1. GATEKEEPER OVERLAY (Alpine version)
    src = src.replace('<div id="accessDeniedOverlay">', '<div id="accessDeniedOverlay" x-show="!enneagramUnlocked" x-cloak>')
    
    # 2. MAIN APP CONTENT (Alpine version)
    src = src.replace('<div id="appContent" class="hidden">', '<div id="appContent" x-show="enneagramUnlocked" x-cloak>')

    # Backdoor Trigger on Overlay Heading
    # Simplified to just update the Alpine state
    overlay_h1 = '<h1 class="text-4xl font-bold mb-4">Access Restricted</h1>'
    backdoor_h1 = '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl font-bold mb-4 cursor-pointer select-none active:scale-95 transition-transform">Access Restricted</h1>'
    src = src.replace(overlay_h1, backdoor_h1)

    # Secondary Backdoor on Main Heading (Redundancy)
    old_h1 = '<h1 class="text-4xl main-title text-center">Meta-Programs Assessment for Leaders</h1>'
    new_h1 = '<h1 @click="backdoorClicks++; if(backdoorClicks >= 6) { enneagramUnlocked = true; backdoorClicks = 0; }" class="text-4xl main-title text-center cursor-pointer select-none">Meta-Programs Assessment for Leaders</h1>'
    src = src.replace(old_h1, new_h1)

    # Centered Return Button refinement
    old_return = '<button id="returnButton" class="btn btn-primary w-full md:w-auto mt-12 py-4 px-10 text-lg">Return to Website</button>'
    new_return = '<div class="flex justify-center mt-12"><button id="returnButton" class="btn btn-primary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button></div>'
    src = src.replace(old_return, new_return)

    # Safety Keyword Check
    if 'Full Leadership Intelligence Report' not in src:
        print("Warning: Content missing!")

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(src)

    print("Success")

if __name__ == "__main__":
    final_assembly()
