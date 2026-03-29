// mobile-save.js - Standalone Script for Mobile Image Capture
// Built for Breakthrough Coaching Enneagram Assessment

async function saveAsImage() {
    console.log("Save as Image triggered.");
    
    // Target the main report container
    const node = document.getElementById('pdfContentArea');
    const btn = document.getElementById('saveImageButton');
    
    if (!node) {
        console.error("Results container (id='pdfContentArea') not found.");
        alert("Error: Results container not found on this page.");
        return;
    }

    const originalText = btn ? btn.innerHTML : 'SAVE RESULT TO PHONE (PNG)';
    
    try {
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SNAPSHOTTING...';
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }

        // Wait for rendering to settle
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate PNG
        const dataUrl = await htmlToImage.toPng(node, {
            backgroundColor: '#ffffff',
            cacheBust: true,
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top left'
            }
        });

        // Trigger Download
        const link = document.createElement('a');
        link.download = 'Enneagram-Result.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (btn) {
            btn.innerHTML = '✅ SAVED SUCCESSFULLY!';
            btn.style.backgroundColor = '#059669'; // Success Green
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '#4A148C'; // Back to Aubergine
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 3000);
        }

    } catch (error) {
        console.error('Image capture failed:', error);
        alert("Snapshot failed. Your browser might be blocking the download or the report is too complex.");
        
        if (btn) {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            btn.disabled = false;
        }
    }
}
