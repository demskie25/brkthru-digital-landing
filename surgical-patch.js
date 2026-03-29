const fs = require('fs');
const path = 'assessments.html';

const saveAsImageButton = `
                <div class="flex flex-col items-center gap-4 mt-12 no-print">
                    <button id="saveImageButton" onclick="saveAsImage()" 
                        class="w-full md:w-auto bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black py-4 px-10 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                        <i class="fa-solid fa-camera-retro text-xl"></i>
                        SAVE RESULT TO PHONE (PNG)
                    </button>
                    <button id="returnButton"
                        class="btn btn-secondary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button>
                </div>
`;

const saveAsImageScript = `
    <!-- MOBILE IMAGE SAVING LOGIC -->
    <script>
        async function saveAsImage() {
            const node = document.getElementById('pdfContentArea');
            const btn = document.getElementById('saveImageButton');
            if (!node || !btn) {
                console.error("Save node or button not found.");
                return;
            }
            const originalText = btn.innerHTML;
            
            try {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SNAPSHOTTING...';
                btn.disabled = true;
                btn.classList.add('opacity-70');

                // Small delay to ensure rendering is stable
                await new Promise(resolve => setTimeout(resolve, 800));

                const dataUrl = await htmlToImage.toPng(node, {
                    backgroundColor: '#ffffff',
                    cacheBust: true,
                    style: {
                        transform: 'scale(1)',
                        transformOrigin: 'top left'
                    }
                });

                const link = document.createElement('a');
                link.download = 'Enneagram-Result.png';
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                btn.innerHTML = '<i class="fa-solid fa-check"></i> SAVED SUCCESSFULLY!';
                btn.classList.remove('from-teal-600', 'to-teal-500');
                btn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.add('from-teal-600', 'to-teal-500');
                    btn.classList.remove('bg-green-600', 'opacity-70');
                    btn.disabled = false;
                }, 4000);

            } catch (error) {
                console.error('Image capture failed:', error);
                alert("Snapshot failed. Your browser might be blocking the download or the report is too complex for this device.");
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove('opacity-70');
            }
        }
    </script>
`;

let content = fs.readFileSync(path, 'utf8');

// 1. Remove the bulky data blocks to reduce file size significantly
// We've already modularized them into enneagram-data.js (hopefully)
const dataTag = '<script src="enneagram-data.js"></script>';
const centersDataRegex = /const centersData = \{[\s\S]*?const questions = \[[\s\S]*?\];/;

if (centersDataRegex.test(content)) {
    content = content.replace(centersDataRegex, dataTag);
}

// 2. Add the button
const returnButtonDivRegex = /<div class="flex justify-center mt-12"><button id="returnButton"[\s\S]*?<\/button>\s*<\/div>/;
if (returnButtonDivRegex.test(content)) {
    content = content.replace(returnButtonDivRegex, saveAsImageButton);
}

// 3. Add the script
if (content.includes('</body>')) {
    content = content.replace('</body>', saveAsImageScript + '\n</body>');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Patch Applied Successfully.');
