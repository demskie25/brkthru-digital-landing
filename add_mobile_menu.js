const fs = require('fs');

const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

// Hamburger button HTML to add before the nav
const hamburgerHTML = `
            <!-- MOBILE HAMBURGER -->
            <button class="univ-hamburger" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>`;

// Script to add before </body>
const mobileScript = `
    <!-- Mobile Menu Script -->
    <script>
      function toggleMobileMenu() {
        const nav = document.querySelector('.univ-nav');
        const hamburger = document.querySelector('.univ-hamburger');
        nav.classList.toggle('mobile-open');
        hamburger.classList.toggle('active');
      }
      // Close menu when clicking a link
      document.querySelectorAll('.univ-nav-item, .univ-dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
          document.querySelector('.univ-nav').classList.remove('mobile-open');
          document.querySelector('.univ-hamburger').classList.remove('active');
        });
      });
    </script>`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Add hamburger button if not present
        if (!content.includes('univ-hamburger')) {
            // Insert before <!-- NAV LINKS -->
            content = content.replace(
                '<!-- NAV LINKS -->',
                hamburgerHTML + '\n\n            <!-- NAV LINKS -->'
            );
            modified = true;
            console.log(`${file}: Added hamburger button`);
        }
        
        // Add mobile script if not present
        if (!content.includes('toggleMobileMenu')) {
            content = content.replace('</body>', mobileScript + '\n  </body>');
            modified = true;
            console.log(`${file}: Added mobile script`);
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`${file}: Saved`);
        } else {
            console.log(`${file}: Already has mobile menu`);
        }
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nMobile menu added! Commit and push.');
