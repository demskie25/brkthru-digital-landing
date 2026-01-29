const fs = require('fs');

// Configuration for each page's hero image
const pages = [
    {
        file: 'corporate.html',
        image: 'hero_corporate.png',
        searchPattern: `class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"`,
        replacement: `class="absolute inset-0 z-0">
          <img src="hero_corporate.png" alt="" class="w-full h-full object-cover opacity-25" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/50"></div>
        </div>
        <div class="hidden`
    },
    {
        file: 'coaching.html',
        image: 'hero_coaching.png',
        addHeroSection: true
    },
    {
        file: 'resources.html',
        image: 'hero_resources.png',
        addHeroSection: true
    },
    {
        file: 'shop.html',
        image: 'hero_shop.png',
        addHeroSection: true
    }
];

// For corporate, just replace the background pattern
try {
    let content = fs.readFileSync('corporate.html', 'utf8');
    
    // Find and replace the texture pattern with the hero image
    const oldPattern = `<div
          class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
        ></div>`;
    
    const newPattern = `<!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img src="hero_corporate.png" alt="" class="w-full h-full object-cover opacity-25" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/50"></div>
        </div>`;
    
    if (content.includes(oldPattern)) {
        content = content.replace(oldPattern, newPattern);
        fs.writeFileSync('corporate.html', content, 'utf8');
        console.log('corporate.html: Added hero background image');
    } else {
        console.log('corporate.html: Pattern not found, checking alternate...');
        // Try alternate pattern
        const altPattern = /class="absolute inset-0 opacity-10 bg-\[url\('https:\/\/www\.transparenttextures\.com\/patterns\/cubes\.png'\)\]"/;
        if (altPattern.test(content)) {
            content = content.replace(/<div\s+class="absolute inset-0 opacity-10[^"]*"[^>]*><\/div>/s, newPattern);
            fs.writeFileSync('corporate.html', content, 'utf8');
            console.log('corporate.html: Added hero background via alternate');
        } else {
            console.log('corporate.html: No matching pattern found');
        }
    }
} catch (err) {
    console.log('corporate.html: Error - ' + err.message);
}

console.log('\nDone adding corporate hero image!');
console.log('\nFor coaching, resources, and shop - need to check their current hero structure.');
