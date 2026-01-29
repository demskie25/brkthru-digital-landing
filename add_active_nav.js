const fs = require('fs');

const pages = {
    'index.html': 'nav-home',
    'odyssey.html': 'nav-odyssey',
    'corporate.html': 'nav-corporate',
    'coaching.html': 'nav-coaching',
    'resources.html': 'nav-resources',
    'shop.html': 'nav-shop'
};

// Script to add active class to current page nav item
const activeScript = `
    <!-- Active Nav Highlight Script -->
    <script>
      (function() {
        var path = window.location.pathname;
        var page = path.split('/').pop() || 'index.html';
        var navMap = {
          'index.html': 'nav-home',
          '': 'nav-home',
          'odyssey.html': 'nav-odyssey',
          'odyssey': 'nav-odyssey',
          'corporate.html': 'nav-corporate',
          'corporate': 'nav-corporate',
          'coaching.html': 'nav-coaching',
          'coaching': 'nav-coaching',
          'resources.html': 'nav-resources',
          'resources': 'nav-resources',
          'shop.html': 'nav-shop',
          'shop': 'nav-shop'
        };
        var navId = navMap[page];
        if (navId) {
          var navItem = document.getElementById(navId);
          if (navItem) {
            navItem.classList.add('active');
          }
        }
      })();
    </script>`;

Object.keys(pages).forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if active script already exists
        if (content.includes('Active Nav Highlight Script')) {
            console.log(`${file}: Active nav script already exists`);
            return;
        }
        
        // Add script before </body>
        content = content.replace('</body>', activeScript + '\n  </body>');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`${file}: Added active nav script`);
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nDone!');
