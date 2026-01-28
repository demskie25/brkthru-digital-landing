const fs = require('fs');

// Pages that need AOS animation added
const files = ['index.html', 'odyssey.html', 'corporate.html', 'coaching.html'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if AOS is already included
        if (content.includes('aos.css') || content.includes('data-aos=')) {
            console.log(`${file}: AOS already present, checking hero section...`);
        }
        
        // Add AOS CSS link in head if not present
        if (!content.includes('aos.css')) {
            content = content.replace('</head>', '    <!-- AOS Animation CSS -->\n    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />\n  </head>');
            console.log(`${file}: Added AOS CSS`);
        }
        
        // Add AOS JS script before </body> if not present
        if (!content.includes('aos.js')) {
            content = content.replace('</body>', `    <!-- AOS Script -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
      });
    </script>
  </body>`);
            console.log(`${file}: Added AOS JS`);
        }
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`${file}: Saved`);
        
    } catch (err) {
        console.log(`${file}: Error - ${err.message}`);
    }
});

console.log('\nAOS library added. Now need to add data-aos attributes to hero titles.');
