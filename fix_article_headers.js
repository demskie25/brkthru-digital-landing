const fs = require('fs');

// List of all article files
const articleFiles = [
    'article-case-alignment.html',
    'article-hallway-coach.html',
    'article-imposter.html',
    'article-leading-change.html',
    'article-listening-beyond.html',
    'article-managing-vs-coaching.html',
    'article-meaning-performance.html',
    'article-problem-solver.html',
    'article-roi-empathy.html',
    'article-smart-leaders.html',
    'article-state-management.html',
    'article-stop-asking-why.html',
    'article-template.html'
];

// The correct universal header HTML
const correctHeader = `    <!-- UNIVERSAL HEADER -->
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
                        <a href="coaching.html#adhd" class="univ-dropdown-link">ADHD &amp; Resilience</a>
                        <a href="coaching.html#relationships" class="univ-dropdown-link">Relationships</a>
                        <a href="coaching.html#career" class="univ-dropdown-link">Career Direction &amp; Transition</a>
                    </div>
                </div>

                <a href="resources.html" class="univ-nav-item active" id="nav-resources">RESOURCES</a>
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

// The correct footer logo
const correctFooterLogo = `            <a href="index.html" class="univ-logo">
              <img src="images/brkthru-logo.png" alt="BRKTHRU" class="univ-logo-img">
              <span class="univ-logo-accent">DIGITAL</span>
            </a>`;

// Mobile menu toggle script
const mobileMenuScript = `
    <script>
      function toggleMobileMenu() {
        const nav = document.querySelector('.univ-nav');
        const hamburger = document.querySelector('.univ-hamburger');
        nav.classList.toggle('open');
        hamburger.classList.toggle('active');
      }
    </script>`;

articleFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace the old header with the correct one
        // Pattern: from "<!-- 1. Header -->" or "<!-- UNIVERSAL HEADER -->" to "<!-- END UNIVERSAL HEADER -->"
        const headerPattern = /\s*<!-- 1\. Header -->[\s\S]*?<!-- END UNIVERSAL HEADER -->/;
        const headerPattern2 = /\s*<!-- UNIVERSAL HEADER -->\s*\n\s*<nav class="univ-header">[\s\S]*?<!-- END UNIVERSAL HEADER -->/;
        
        if (headerPattern.test(content)) {
            content = content.replace(headerPattern, '\n\n    <!-- 1. Header -->\n\n' + correctHeader);
            console.log(`✓ ${file}: Header pattern 1 replaced`);
        } else if (headerPattern2.test(content)) {
            content = content.replace(headerPattern2, correctHeader);
            console.log(`✓ ${file}: Header pattern 2 replaced`);
        } else {
            console.log(`✗ ${file}: Header pattern not found`);
        }
        
        // Replace old footer logo
        const oldFooterLogo = /<a href="index\.html" class="univ-logo">\s*<span class="univ-logo-accent">DIGITAL<\/span>\s*<\/a>/;
        if (oldFooterLogo.test(content)) {
            content = content.replace(oldFooterLogo, correctFooterLogo);
            console.log(`  ${file}: Footer logo also fixed`);
        }
        
        // Add mobile menu script if not present
        if (!content.includes('toggleMobileMenu')) {
            content = content.replace('</body>', mobileMenuScript + '\n  </body>');
            console.log(`  ${file}: Mobile menu script added`);
        }
        
        fs.writeFileSync(file, content, 'utf8');
    } catch (err) {
        console.log(`✗ ${file}: Error - ${err.message}`);
    }
});

console.log('\nDone! All article files processed.');
