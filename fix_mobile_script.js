const fs = require('fs');

const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

// Fixed script with DOMContentLoaded
const oldScript = `    <!-- Mobile Menu Script -->
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

const newScript = `    <!-- Mobile Menu Script -->
    <script>
      function toggleMobileMenu() {
        var nav = document.querySelector('.univ-nav');
        var hamburger = document.querySelector('.univ-hamburger');
        if (nav && hamburger) {
          nav.classList.toggle('mobile-open');
          hamburger.classList.toggle('active');
        }
      }
      document.addEventListener('DOMContentLoaded', function() {
        var links = document.querySelectorAll('.univ-nav-item, .univ-dropdown-link');
        for (var i = 0; i < links.length; i++) {
          links[i].addEventListener('click', function() {
            var nav = document.querySelector('.univ-nav');
            var hamburger = document.querySelector('.univ-hamburger');
            if (nav) nav.classList.remove('mobile-open');
            if (hamburger) hamburger.classList.remove('active');
          });
        }
      });
    </script>`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        if (content.includes('toggleMobileMenu')) {
            content = content.replace(oldScript, newScript);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`${file}: Fixed mobile script`);
        } else {
            console.log(`${file}: No mobile script found`);
        }
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone! Commit and push.');
