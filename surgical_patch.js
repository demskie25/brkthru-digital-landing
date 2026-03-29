const fs = require('fs');

const assessmentsPath = 'assessments.html';

// 1. Script Links
const scriptLinks = `
    <!-- Mobile Image Saving Support -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"></script>
    <script src="mobile-save.js"></script>
`;

// 2. Styled Save Button (Breakthrough Coaching Brand Colors)
const saveButtonHtml = `
                <div class="flex flex-col items-center gap-4 mt-12 no-print">
                    <button id="saveImageButton" onclick="saveAsImage()" 
                        class="w-full md:w-auto bg-[#4A148C] text-[#FFD700] hover:bg-[#380f6b] font-black py-4 px-10 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 border-2 border-[#FFD700]">
                        <i class="fa-solid fa-camera-retro text-xl"></i>
                        SAVE RESULT TO PHONE (PNG)
                    </button>
                    <button id="returnButton"
                        class="btn btn-secondary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button>
                </div>
`;

try {
    let content = fs.readFileSync(assessmentsPath, 'utf8');

    // Step A: Link the scripts before </body>
    if (!content.includes('mobile-save.js')) {
        content = content.replace('</body>', scriptLinks + '\n</body>');
    }

    // Step B: Insert the 'SAVE RESULT' button (Under the Enneagram charts)
    // We target the div around the return button which is typically the end of the results area
    const returnButtonRegex = /<div class="flex justify-center mt-12"><button id="returnButton"[\s\S]*?<\/div>/;
    if (returnButtonRegex.test(content)) {
        content = content.replace(returnButtonRegex, saveButtonHtml);
    } else {
        // Fallback search if the structure is different
        const fallbackRegex = /<button id="returnButton"[\s\S]*?<\/button>/;
        if (fallbackRegex.test(content)) {
            content = content.replace(fallbackRegex, saveButtonHtml);
        }
    }

    // Step C: Size Reduction (Modularization) 
    // This is optional but highly recommended to allow future edits
    const dataStart = 'const centersData =';
    const dataTag = '<script src="enneagram-data.js"></script>';
    if (content.includes(dataStart)) {
        const startIndex = content.indexOf(dataStart);
        const endIndex = content.indexOf('];', startIndex) + 2; // End of questions array
        content = content.substring(0, startIndex) + dataTag + content.substring(endIndex);
    }

    fs.writeFileSync(assessmentsPath, content, 'utf8');
    console.log('Patch Applied Successfully.');

} catch (err) {
    console.error('Error during surgical patch:', err.message);
    process.exit(1);
}
