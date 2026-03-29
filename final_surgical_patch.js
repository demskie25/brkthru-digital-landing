const fs = require('fs');

const path = 'assessments.html';

const scriptTags = `
    <!-- Mobile Image Saving Support -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"></script>
    <script src="mobile-save.js"></script>
`;

const buttonHtml = `
                <div class="flex flex-col items-center gap-4 mt-12 no-print">
                    <button id="saveImageButton" onclick="saveAsImage()" 
                        style="background:#4A148C; color:#FFD700; padding:20px; width:100%; border-radius:10px; font-weight:bold; margin-top:30px; border: 2px solid #FFD700; cursor: pointer;">
                        <i class="fa-solid fa-camera-retro"></i> SAVE RESULT TO PHONE (PNG)
                    </button>
                    <button id="returnButton"
                        class="btn btn-secondary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button>
                </div>
`;

try {
    let content = fs.readFileSync(path, 'utf8');
    
    // 1. Add script tags before </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', scriptTags + '</body>');
        console.log('Added script tags.');
    } else {
        console.log('Could not find </body> tag!');
    }

    // 2. Replace the return button area with the new button group
    // We search for the specific returnButton ID and its container
    const pattern = /<div class="flex justify-center mt-12">\s*<button id="returnButton"[\s\S]*?<\/button>\s*<\/div>/;
    if (pattern.test(content)) {
        content = content.replace(pattern, buttonHtml);
        console.log('Replaced return button with save/return group.');
    } else {
        console.log('Could not find return button container pattern!');
        // Fallback: just find the button itself
        const btnPattern = /<button id="returnButton"[\s\S]*?<\/button>/;
        if (btnPattern.test(content)) {
            content = content.replace(btnPattern, buttonHtml);
            console.log('Replaced return button (fallback).');
        }
    }

    // 3. Size reduction: remove the huge data blocks if they are still there
    const dataStart = 'const centersData =';
    if (content.includes(dataStart)) {
        const startIndex = content.indexOf(dataStart);
        const endIndex = content.indexOf('];', startIndex) + 2;
        content = content.substring(0, startIndex) + '<script src="enneagram-data.js"></script>' + content.substring(endIndex);
        console.log('Modularized data blocks.');
    }

    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully updated assessments.html');
} catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
}
