const fs = require('fs');

const pages = [
    {
        file: 'coaching.html',
        find: '<section class="bg-brand-navy py-32 overflow-hidden">',
        replace: `<section class="bg-brand-navy py-32 overflow-hidden relative">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img src="hero_coaching.png" alt="" class="w-full h-full object-cover opacity-25" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/60"></div>
        </div>`
    },
    {
        file: 'shop.html',
        find: '<section class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24">',
        replace: `<section class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="hero_shop.png" alt="" class="w-full h-full object-cover opacity-20" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
      </div>`
    },
    {
        file: 'corporate.html',
        find: `class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"`,
        replace: `class="absolute inset-0 z-0">
          <img src="hero_corporate.png" alt="" class="w-full h-full object-cover opacity-25" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/50"></div>
        </div>
        <div class="hidden`
    }
];

pages.forEach(page => {
    try {
        let content = fs.readFileSync(page.file, 'utf8');
        if (content.includes(page.find)) {
            content = content.replace(page.find, page.replace);
            fs.writeFileSync(page.file, content, 'utf8');
            console.log(`✓ ${page.file}: Added hero background`);
        } else {
            console.log(`✗ ${page.file}: Pattern not found`);
        }
    } catch (err) {
        console.log(`✗ ${page.file}: Error - ${err.message}`);
    }
});

// Handle resources.html separately with regex
try {
    let content = fs.readFileSync('resources.html', 'utf8');
    const resourcesFind = /<section\s+class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden"\s*>\s*<div\s+class="absolute top-0 right-0/;
    
    if (resourcesFind.test(content)) {
        content = content.replace(
            /<section\s+class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden"\s*>/,
            `<section class="bg-slate-900 pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="hero_resources.png" alt="" class="w-full h-full object-cover opacity-20" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
      </div>`
        );
        fs.writeFileSync('resources.html', content, 'utf8');
        console.log('✓ resources.html: Added hero background');
    } else {
        console.log('✗ resources.html: Pattern not found');
    }
} catch (err) {
    console.log(`✗ resources.html: Error - ${err.message}`);
}

console.log('\nDone!');
