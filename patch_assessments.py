import os

# Identify and modularize assessments.html
source = 'assessments.html'
dest = 'assessments.html.fixed'
data_file = 'enneagram-data.js'

cdn_tag = '    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"></script>\n'
data_script_tag = '    <script src="enneagram-data.js"></script>\n'
save_button = '''
                <div class="flex flex-col items-center gap-4 mt-12 no-print">
                    <button id="saveImageButton" onclick="saveAsImage()" 
                        class="w-full md:w-auto bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-black py-4 px-10 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                        <i class="fa-solid fa-camera-retro text-xl"></i>
                        SAVE RESULT TO PHONE (PNG)
                    </button>
                    <button id="returnButton"
                        class="btn btn-secondary w-full md:w-auto py-4 px-10 text-lg shadow-xl">Return to Website</button>
                </div>
'''
save_script = '''
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
'''

# We try multiple encodings
for enc in ['utf-8', 'utf-16', 'utf-16-le', 'cp1252']:
    try:
        with open(source, 'r', encoding=enc) as f, open(dest, 'w', encoding='utf-8') as out:
            skip = False
            for i, line in enumerate(f):
                ln = i + 1
                
                # Header Injection
                if 'html2pdf.bundle.min.js' in line:
                    out.write(cdn_tag)
                    out.write(line)
                    continue

                # Result Button Injection
                if 'id="returnButton"' in line:
                    # Look for the container 
                    out.write(save_button)
                    continue
                # If we detected return button, we might need to skip its original div
                if ('<div class="flex justify-center mt-12">' in line and ln > 1170 and ln < 1180):
                    continue
                if ('</button>' in line and ln > 1170 and ln < 1180):
                    continue

                # Data Block Removal
                if ln == 1403:
                    out.write(data_script_tag)
                    skip = True
                if ln == 1864:
                    skip = False
                
                if not skip:
                    # Final Injection
                    if '</body>' in line:
                        out.write(save_script)
                    out.write(line)
        print(f"Success with {enc}")
        os.replace(dest, source)
        break
    except Exception as e:
        print(f"Failed with {enc}: {e}")
