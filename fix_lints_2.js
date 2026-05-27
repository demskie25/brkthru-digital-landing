const fs = require('fs');

function fixFile(file, matchers) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    for (let matcher of matchers) {
        content = content.replace(matcher.regex, matcher.replacement);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed', file);
    }
}

// 1. corporate.html - Buttons must have discernible text
// Line 890
// Check corporate.html buttons
fixFile('e:\\brkthru-digital-landing\\corporate.html', [
    { regex: /<button([^>]*)class="univ-hamburger"/g, replacement: '<button aria-label="Toggle Navigation"$1class="univ-hamburger"' }
]);

// 2. reservations.html - Select element must have an accessible name (lines 189, 223)
fixFile('e:\\brkthru-digital-landing\\reservations.html', [
    { regex: /<select([^>]*)id="location"/g, replacement: '<select aria-label="Location" $1id="location"' },
    { regex: /<select([^>]*)id="date"/g, replacement: '<select aria-label="Date" $1id="date"' },
    { regex: /<select([^>]*)id="attendees"/g, replacement: '<select aria-label="Attendees" $1id="attendees"' },
    { regex: /<select([^>]*)id="event_type"/g, replacement: '<select aria-label="Event Type" $1id="event_type"' }
]);

// 3. resources.html - Buttons must have discernible text (lines 1025, 1078)
fixFile('e:\\brkthru-digital-landing\\resources.html', [
    { regex: /<button([^>]*)class="univ-hamburger"/g, replacement: '<button aria-label="Toggle Navigation"$1class="univ-hamburger"' },
    { regex: /<button([^>]*)@click="activeCategory = category.id"/g, replacement: '<button aria-label="Category Filter" $1@click="activeCategory = category.id"' },
    { regex: /<button([^>]*)@click="playVideo"/g, replacement: '<button aria-label="Play Video" $1@click="playVideo"' }
]);

// 4. tour.html - Buttons & Select
fixFile('e:\\brkthru-digital-landing\\tour.html', [
    { regex: /<button([^>]*)class="univ-hamburger"/g, replacement: '<button aria-label="Toggle Navigation"$1class="univ-hamburger"' },
    { regex: /<button([^>]*)class="[^"]*carousel-prev[^"]*"/g, replacement: '<button aria-label="Previous Slide"$1class="carousel-prev"' },
    { regex: /<button([^>]*)class="[^"]*carousel-next[^"]*"/g, replacement: '<button aria-label="Next Slide"$1class="carousel-next"' },
    { regex: /<select([^>]*)id="ticket-type"/g, replacement: '<select aria-label="Ticket Type" $1id="ticket-type"' },
    { regex: /<select([^>]*)id="ticket-quantity"/g, replacement: '<select aria-label="Ticket Quantity" $1id="ticket-quantity"' },
    { regex: /<select([^>]*)id="payment-method"/g, replacement: '<select aria-label="Payment Method" $1id="payment-method"' },
    { regex: /<select([^>]*)id="billing-country"/g, replacement: '<select aria-label="Billing Country" $1id="billing-country"' },
    { regex: /<select([^>]*)id="billing-state"/g, replacement: '<select aria-label="Billing State" $1id="billing-state"' }
]);

// 5. assessbackup.html - Duplicate ID saveImageButton
fixFile('e:\\brkthru-digital-landing\\assessbackup.html', [
    { regex: /id="saveImageButton"/g, replacement: 'class="saveImageButton"' },
    // Update JS if it uses getElementById
    { regex: /document\.getElementById\('saveImageButton'\)/g, replacement: "document.querySelector('.saveImageButton')" }
]);

// To be safe, just apply aria-label="Toggle Navigation" to all univ-hamburger buttons globally
const path = require('path');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.git' || file === '.agent') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('e:\\brkthru-digital-landing');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Apply generic button aria labels
    content = content.replace(/<button(?![^>]*aria-label)[^>]*class="univ-hamburger"/g, '<button aria-label="Toggle Navigation" class="univ-hamburger"');
    
    // Any select missing aria-label
    content = content.replace(/<select(?![^>]*aria-label)[^>]*id="([^"]+)"/g, '<select aria-label="$1" id="$1"');

    // Remove empty titles and add aria-label if button has no discernible text
    content = content.replace(/<button(?![^>]*aria-label)[^>]*>(\s*<svg[^>]*>.*?<\/svg>\s*)<\/button>/gs, '<button aria-label="Icon Button">$1</button>');
    content = content.replace(/<button(?![^>]*aria-label)[^>]*>(\s*<i[^>]*>.*?<\/i>\s*)<\/button>/gs, '<button aria-label="Icon Button">$1</button>');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed globally', file);
    }
});
