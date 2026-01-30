const fs = require('fs');
const path = require('path');

// THE GOLD STANDARD HEADER FROM index.html
const GOLD_STANDARD_HEADER = `
    <nav class="univ-header">
        <div class="univ-container">
            <!-- LOGO -->
            <a href="index.html" class="univ-logo">
                <img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">
                <span class="univ-logo-accent">DIGITAL</span>
            </a>

            <!-- MOBILE HAMBURGER -->
            <button class="univ-hamburger" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

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
                <a href="tour.html" class="univ-nav-item" id="nav-tour">TOUR</a>
            </div>

            <!-- UTILITY -->
            <div class="univ-utility">
                <div class="univ-currency">
                    <span class="active">USD</span> | <span>PHP</span>
                </div>
                <a href="tour.html" class="univ-btn-tour">TOUR 2026</a>
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
    'tour.html': 'nav-tour'
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
