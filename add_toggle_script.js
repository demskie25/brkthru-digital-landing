const fs = require('fs');

const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html', 'resources.html', 'shop.html'];

const mobileScript = `
    <!-- Mobile Menu Script -->
    <script>
      function toggleMobileMenu() {
        var nav = document.querySelector('.univ-nav');
        var hamburger = document.querySelector('.univ-hamburger');
        if (nav && hamburger) {
          nav.classList.toggle('mobile-open');
          hamburger.classList.toggle('active');
        }
      }
    </script>`;

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if script already exists
        if (content.includes('function toggleMobileMenu')) {
            console.log(`${file}: Script already exists`);
            return;
        }
        
        // Add script before </body>
        content = content.replace('</body>', mobileScript + '\n  </body>');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`${file}: Added mobile script`);
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone! Now commit and push.');
