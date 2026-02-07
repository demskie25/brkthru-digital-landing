const fs = require('fs');
const path = require('path');

const HEADER_TEMPLATE = `
    <!-- SVG FILTER REGISTRY -->
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="univ-remove-white" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1.1 -1.1 -1.1 3 0" />
        </filter>
      </defs>
    </svg>

    <!-- UNIVERSAL HEADER -->
    <nav class="univ-header">
        <div class="univ-container">
            <!-- LOGO -->
            <a href="index.html" class="univ-logo">
                <img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">
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
                <a href="javascript:void(0)" onclick="window.open('https://youtu.be/ICr8WGQbpjc', '_blank')" class="univ-btn-video">WATCH LOVE'S VIDEO</a>
                <div class="univ-currency">
                    <span class="active">USD</span> | <span>PHP</span>
                </div>
                <a href="index.html#tour" class="univ-btn-tour">TOUR 2026</a>
            </div>
        </div>
    </nav>
    <div class="univ-spacer"></div>
    <!-- END UNIVERSAL HEADER -->
`;

function cleanFile(filePath) {
    console.log(`Processing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex for universal header block
    const headerRegex = /<!-- UNIVERSAL HEADER -->[\s\S]*?<!-- END UNIVERSAL HEADER -->/gi;
    // Regex for SVG registry block
    const svgRegex = /<!-- SVG FILTER REGISTRY -->\s*<svg[^>]*>[\s\S]*?<\/svg>/gi;

    // Remove all instances
    content = content.replace(headerRegex, '');
    content = content.replace(svgRegex, '');

    // Clean up excessive whitespace/newlines
    content = content.replace(/\n\s*\n\s*\n+/g, '\n\n');

    // Insert one fresh copy after <body> tag
    const bodyRegex = /<body[^>]*>/i;
    const bodyMatch = content.match(bodyRegex);
    if (bodyMatch) {
        const bodyEnd = bodyMatch.index + bodyMatch[0].length;
        content = content.slice(0, bodyEnd) + "\n" + HEADER_TEMPLATE + "\n" + content.slice(bodyEnd);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  Successfully updated ${filePath}`);
    } else {
        console.log(`  WARNING: Could not find <body> tag in ${filePath}`);
    }
}

const files = [
    'index.html', 'odyssey.html', 'corporate.html', 
    'coaching.html', 'resources.html', 'shop.html'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        cleanFile(f);
    } else {
        console.log(`File not found: ${f}`);
    }
});
