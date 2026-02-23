const fs = require('fs');

function patchFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Remove duplicate title logic
    const duplicateTitleLogic = `                    // Add Title
                    diagTitle = document.createElement('h2');
                    diagTitle.className = 'pdf-only text-4xl font-black text-center mb-12';
                    diagTitle.style.color = '#4A148C';
                    diagTitle.innerText = "Interconnected Type Map";
                    diagramContainer.insertBefore(diagTitle, diagramContainer.firstChild);`;
                    
    content = content.replace(duplicateTitleLogic, "                    // Duplicate title logic removed.");

    // 2. Add explicit width and height to SVG logic before serialization
    const targetSvgLogic = `                            // First, force proper namespaces and styles so the serialized version is self-contained
                            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');`;
                            
    const replacementSvgLogic = `                            // First, force proper namespaces and styles so the serialized version is self-contained
                            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                            svg.setAttribute('width', '600');
                            svg.setAttribute('height', '600');`;
                            
    content = content.replace(targetSvgLogic, replacementSvgLogic);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Patched ${filepath}`);
}

patchFile('e:/brkthru-digital-landing/assessments.html');
patchFile('e:/brkthru-digital-landing/start-enneagram.html');
