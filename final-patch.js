const fs = require('fs');
const filePath = 'assessments.html';

// 1. Define the components to inject
const scriptLink = '<script src="mobile-save.js"></script>';
const saveButton = `
                <div class="flex flex-col items-center gap-4 mt-12 no-print">
                    <button id="saveImageButton" onclick="saveAsImage()" 
                        class="w-full md:w-auto bg-[#4A148C] text-[#FFD700] hover:bg-[#380f6b] font-black py-4 px-10 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 border-2 border-[#FFD700]">
                        <i class="fa-solid fa-camera-retro text-xl"></i>
                        SAVE RESULT TO PHONE (PNG)
                    </button>
                    <button onclick="window.location.href='/'" class="btn btn-secondary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button>
                </div>
`;

// 2. Perform the patch
try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // A. Inject the script link before </body>
    if (!content.includes('mobile-save.js')) {
        content = content.replace('</body>', scriptLink + '\n</body>');
        console.log('Script link injected.');
    }

    // B. Inject the button (targeting the existing returnButton area)
    const buttonTarget = /<div class="flex justify-center mt-12"><button id="returnButton"[\s\S]*?<\/button>\s*<\/div>/;
    if (buttonTarget.test(content)) {
        content = content.replace(buttonTarget, saveButton);
        console.log('Save button injected.');
    } else {
        // Fallback targeting the button ID directly if the div structure is slightly different
        const fallbackTarget = /<button id="returnButton"[\s\S]*?<\/button>/;
        if (fallbackTarget.test(content)) {
            content = content.replace(fallbackTarget, saveButton);
            console.log('Save button injected (fallback).');
        }
    }

    // C. Size Reduction: Modularize the data block if it hasn't been done yet
    // This removes roughly 1MB of content
    const dataStart = 'const centersData =';
    const dataTag = '<script src="enneagram-data.js"></script>';
    if (content.includes(dataStart)) {
        const startIndex = content.indexOf(dataStart);
        const endIndex = content.indexOf('];', startIndex) + 2; // End of questions array
        content = content.substring(0, startIndex) + dataTag + content.substring(endIndex);
        console.log('Data block modularized for size reduction.');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('SUCCESS: assessments.html patched.');

} catch (err) {
    console.error('Error during patch:', err.message);
    process.exit(1);
}
