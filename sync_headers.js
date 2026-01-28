const fs = require('fs');
const path = require('path');

// THE GOLD STANDARD HEADER FROM index.html
const GOLD_STANDARD_HEADER = `
    <nav class="univ-header">
        <div class="univ-container">
            <!-- LOGO -->
            <a href="index.html" class="univ-logo">
                <img src="data:image/png;base64,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" alt="BRKTHRU" class="univ-logo-img">
                <span class="univ-logo-accent">DIGITAL</span>
            </a>

            <!-- NAV LINKS -->
            <div class="univ-nav">
                <a href="index.html" class="univ-nav-item" id="nav-home">HOME</a>
                <a href="odyssey.html" class="univ-nav-item" id="nav-odyssey">OUR ODYSSEY</a>
                
                <div class="univ-dropdown-container">
                    <a href="corporate.html" class="univ-nav-item" id="nav-corporate">CORPORATE</a>
                    <div class="univ-dropdown-menu">
                        <a href="corporate.html#leadership" class="univ-dropdown-link">Leadership Edge</a>
                        <a href="corporate.html#alignment" class="univ-dropdown-link">Systemic Alignment</a>
                        <a href="corporate.html#excellence" class="univ-dropdown-link">Customer Excellence</a>
                    </div>
                </div>

                <div class="univ-dropdown-container">
                    <a href="coaching.html" class="univ-nav-item" id="nav-coaching">COACHING</a>
                    <div class="univ-dropdown-menu">
                        <a href="coaching.html#executive" class="univ-dropdown-link">Executive Coaching</a>
                        <a href="coaching.html#sports" class="univ-dropdown-link">Sports Performance</a>
                        <a href="coaching.html#adhd" class="univ-dropdown-link">ADHD & Resilience</a>
                        <a href="coaching.html#relationships" class="univ-dropdown-link">Relationships</a>
                        <a href="coaching.html#career" class="univ-dropdown-link">Career Direction & Transition</a>
                    </div>
                </div>

                <a href="resources.html" class="univ-nav-item" id="nav-resources">RESOURCES</a>
                <a href="shop.html" class="univ-nav-item" id="nav-shop">SHOP</a>
            </div>

            <!-- UTILITY -->
            <div class="univ-utility">
                <div class="univ-currency">
                    <span class="active">USD</span> | <span>PHP</span>
                </div>
                <a href="index.html#tour" class="univ-btn-tour">TOUR 2026</a>
            </div>
        </div>
    </nav>
    <div class="univ-spacer"></div>
    <!-- END UNIVERSAL HEADER -->`;

const NAV_MAP = {
    'index.html': 'nav-home',
    'odyssey.html': 'nav-odyssey',
    'corporate.html': 'nav-corporate',
    'coaching.html': 'nav-coaching',
    'resources.html': 'nav-resources',
    'shop.html': 'nav-shop'
};

const rootDir = process.cwd();
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    
    // Regular expression to find the universal header block
    // We look for <!-- UNIVERSAL HEADER --> and <!-- END UNIVERSAL HEADER -->
    const headerRegex = /<!-- UNIVERSAL HEADER -->[\s\S]*?<!-- END UNIVERSAL HEADER -->/g;
    
    if (headerRegex.test(content)) {
        console.log(`Syncing header for ${file}...`);
        
        let customHeader = GOLD_STANDARD_HEADER;
        const activeId = NAV_MAP[file];
        
        if (activeId) {
            // Apply gold color to the active link
            const idRegex = new RegExp(`id="${activeId}"`, 'g');
            customHeader = customHeader.replace(idRegex, `id="${activeId}" style="color: #D4AF37 !important;"`);
        }
        
        const newContent = content.replace(headerRegex, `<!-- UNIVERSAL HEADER -->${customHeader}`);
        fs.writeFileSync(path.join(rootDir, file), newContent, 'utf8');
    } else {
        console.log(`No universal header marker found in ${file}. Skipping.`);
    }
});

console.log('Sync complete.');
