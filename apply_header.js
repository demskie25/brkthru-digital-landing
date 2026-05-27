const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const newHeader = `
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
                <a href="assessments.html" class="univ-nav-item" id="nav-assessments">ASSESSMENTS</a>
                <a href="shop.html" class="univ-nav-item" id="nav-shop">SHOP</a>
            </div>

            <!-- UTILITY -->
            <div class="univ-utility">
                <a href="javascript:void(0)" onclick="window.open('https://youtu.be/ICr8WGQbpjc', '_blank')" class="univ-btn-video">WATCH LOVE'S VIDEO</a>
                <div class="univ-currency">
                    <span class="active">USD</span> | <span>PHP</span>
                </div>
                <a href="index.html#tour" class="univ-btn-tour">TOUR 2027</a>
            </div>
        </div>
    </nav>
    <div class="univ-spacer"></div>

    <!-- Mobile Menu Toggle Script -->
    <script>
      function toggleMobileMenu() {
        const nav = document.querySelector('.univ-nav');
        const hamburger = document.querySelector('.univ-hamburger');
        if (nav && hamburger) {
          nav.classList.toggle('mobile-open');
          hamburger.classList.toggle('active');
        }
      }
      
      // Close menu when clicking a link
      document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('.univ-nav-item, .univ-dropdown-link');
        links.forEach(link => {
          link.addEventListener('click', () => {
            const nav = document.querySelector('.univ-nav');
            const hamburger = document.querySelector('.univ-hamburger');
            if (nav) nav.classList.remove('mobile-open');
            if (hamburger) hamburger.classList.remove('active');
          });
        });
      });
    </script>
    <!-- END UNIVERSAL HEADER -->
`;

console.log("Starting header update...");

fs.readdir(rootDir, (err, files) => {
  if (err) return console.error(err);

  files.forEach((file) => {
    if (path.extname(file) === ".html" && file !== "index_legacy.html") {
      const filePath = path.join(rootDir, file);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return console.error(err);

        let content = data;

        // 1. Add CSS
        if (!content.includes("universal-header.css")) {
          content = content.replace(
            "</head>",
            '<link rel="stylesheet" href="universal-header.css?v=1.1">\n</head>',
          );
        } else {
            content = content.replace('href="universal-header.css"', 'href="universal-header.css?v=1.1"');
        }

        // 2. Replace Header - Regex Logic (Global)
        const universalHeaderRegex =
          /<!-- UNIVERSAL HEADER -->[\s\S]*?<!-- END UNIVERSAL HEADER -->/gi;

        if (universalHeaderRegex.test(content)) {
          console.log(`Updating existing Universal Header in ${file}`);
          content = content.replace(universalHeaderRegex, newHeader);
        } else {
          // Fallback logic for first install
          const bodyRegex = /<body[^>]*>/i;
          const bodyMatch = content.match(bodyRegex);
          if (bodyMatch) {
            const bodyStart = bodyMatch.index + bodyMatch[0].length;
            const bodyContent = content.slice(bodyStart);

            // Find first <nav> or <header>
            const navRegex = /<nav[\s\S]*?<\/nav>/i;
            const headerRegex = /<header[\s\S]*?<\/header>/i;

            const navMatch = bodyContent.match(navRegex);
            const headerMatch = bodyContent.match(headerRegex);

            let targetSplit = null;
            if (navMatch && headerMatch) {
              targetSplit =
                navMatch.index < headerMatch.index ? navMatch : headerMatch;
            } else if (navMatch) targetSplit = navMatch;
            else if (headerMatch) targetSplit = headerMatch;

            if (targetSplit && targetSplit.index < 3000) {
              console.log(`Replacing LEGACY header in ${file}`);
              const beforeHeader = content.slice(
                0,
                bodyStart + targetSplit.index,
              );
              const afterHeader = content.slice(
                bodyStart + targetSplit.index + targetSplit[0].length,
              );
              content = beforeHeader + newHeader + afterHeader;

              content = content.replace('<div class="h-[120px]"></div>', "");
              content = content.replace(
                '<main class="content-buffer">',
                "<main>",
              );
            }
          }
        }

        fs.writeFile(filePath, content, "utf8", (err) => {
          if (err) console.error(err);
        });
      });
    }
  });
});
