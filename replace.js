const fs = require('fs');
const file = 'e:\\brkthru-digital-landing\\start-enneagram.html';

try {
    let raw = fs.readFileSync(file);
    let encoding = 'utf8';
    if (raw[0] === 0xFF && raw[1] === 0xFE) {
        encoding = 'utf16le';
    }
    console.log("Encoding detected: " + encoding);
    let content = raw.toString(encoding);
    
    // Normalize newlines to \n to make exact string matching work
    content = content.replace(/\r\n/g, '\n');
    let modifications = 0;
    
    // Replacement 1: Button
    const oldButton = `                <!-- PDF Download Button -->\n                <div class="flex justify-between items-center mb-8 no-print">\n                    <h1 class="text-3xl font-black text-gold-main">Full Report Generated</h1>\n                    <button type="button" onclick="event.preventDefault(); downloadAndSend();"\n                        class="w-full py-4 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg mt-6">\n                        Download PDF & Send Email\n                    </button>\n                </div>`;

    const newButton = `                <!-- PDF Download Button -->\n                <div class="flex justify-between items-center mb-8 no-print">\n                    <h1 class="text-3xl font-black text-gold-main">Full Report Generated</h1>\n                    <button type="button" id="download-btn" onclick="event.preventDefault(); generatePremiumPDF();"\n                        class="w-full py-4 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg mt-6">\n                        Download PDF & Send Email\n                    </button>\n                </div>`;

    if(content.includes(oldButton)) {
        content = content.replace(oldButton, newButton);
        modifications++;
        console.log('Button replaced successfully');
    } else {
        console.log('Button string NOT FOUND');
    }

    // Replacement 2: Puppeteer Logic
    const oldLogic = `        window.addEventListener('DOMContentLoaded', () => {\n            const urlParams = new URLSearchParams(window.location.search);\n            const token = urlParams.get('token');\n            const access = urlParams.get('access');\n            // Check for access=enneagram or token or localhost\n            if (access === 'enneagram' || token || window.location.hostname === 'localhost' || window.location.hostname.includes('antigravity') || urlParams.get('test') === 'true') {\n                document.getElementById('accessDeniedOverlay').classList.add('hidden');\n                document.getElementById('appContent').classList.remove('hidden');\n            }\n        });`;

    const newLogic = `        window.addEventListener('DOMContentLoaded', () => {\n            const urlParams = new URLSearchParams(window.location.search);\n            const token = urlParams.get('token');\n            const access = urlParams.get('access');\n            // Check for access=enneagram or token or localhost\n            if (access === 'enneagram' || token || window.location.hostname === 'localhost' || window.location.hostname.includes('antigravity') || urlParams.get('test') === 'true') {\n                document.getElementById('accessDeniedOverlay').classList.add('hidden');\n                document.getElementById('appContent').classList.remove('hidden');\n            }\n            \n            // Puppeteer / Data Loading Logic for Server-Side PDF\n            const dataParam = urlParams.get('results');\n            if (dataParam) {\n                try {\n                    const data = JSON.parse(atob(dataParam));\n                    participantData = data.participant;\n                    \n                    // Allow Alpine to initialize then force display results\n                    setTimeout(() => {\n                        document.getElementById('userInfoSection').style.display = 'none';\n                        document.getElementById('questionnaireSection').style.display = 'none';\n                        const resultsSection = document.getElementById('resultsSection');\n                        if (resultsSection) resultsSection.style.display = 'block';\n                        document.body.classList.add('pdf-rendering');\n                        displayResults(data.scores);\n                    }, 500);\n                } catch (e) {\n                    console.error("Error loading data from URL", e);\n                }\n            }\n        });`;

    if(content.includes(oldLogic)) {
        content = content.replace(oldLogic, newLogic);
        modifications++;
        console.log('Puppeteer logic replaced successfully');
    } else {
        console.log('Puppeteer string NOT FOUND');
    }

    // Replacement 3: generatePremiumPDF
    const oldFunc = `    <script>\n        async function downloadAndSend() {`;

    const newFunc = `    <script>\n        async function generatePremiumPDF() {\n            const btn = document.getElementById('download-btn');\n            if (btn) {\n                btn.disabled = true;\n                btn.innerText = "Processing Server-Side PDF...";\n            }\n\n            try {\n                const fs_scores = {}; for (let i = 1; i <= 9; i++) fs_scores[i] = 0;\n                userAnswers.forEach((ans, i) => { if (ans !== undefined) questions[i].scoring[ans].forEach(t => fs_scores[t]++); });\n                \n                const payload = {\n                    scores: fs_scores,\n                    participant: participantData,\n                    url: window.location.href.split('?')[0] + "?access=enneagram"\n                };\n\n                const response = await fetch('/.netlify/functions/render-pdf', {\n                    method: 'POST',\n                    headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify(payload)\n                });\n\n                if (!response.ok) throw new Error('PDF Generation Failed');\n\n                const blob = await response.blob();\n                const url = window.URL.createObjectURL(blob);\n                const a = document.createElement('a');\n                a.href = url;\n                a.download = \`Enneagram_Report_\${participantData.firstName}_\${participantData.familyName}.pdf\`;\n                document.body.appendChild(a);\n                a.click();\n                a.remove();\n                \n                // Still send the email fallback\n                downloadAndSend(true); // Modified to skip local print\n\n            } catch (error) {\n                console.error("PDF Error:", error);\n                alert("Server PDF failed. Falling back to browser print.");\n                downloadAndSend();\n            } finally {\n                if (btn) {\n                    btn.disabled = false;\n                    btn.innerText = "Download PDF & Send Email";\n                }\n            }\n        }\n\n        async function downloadAndSend(skipPrint = false) {`;

    if(content.includes(oldFunc)) {
        content = content.replace(oldFunc, newFunc);
        modifications++;
        console.log('generatePremiumPDF inserted successfully');
    } else {
        console.log('generatePremiumPDF string NOT FOUND');
    }


    // Replacement 4: skipPrint
    const skipCheckOld = `                // STRICT TASK 3: IMPLEMENT WINDOW.PRINT\n                window.print();`;

    if (content.includes(skipCheckOld)) {
        content = content.replace(skipCheckOld, `                // STRICT TASK 3: IMPLEMENT WINDOW.PRINT\n                if (!skipPrint) window.print();`);
        modifications++;
        console.log('Window print skip added successfully');
    } else {
        console.log('Window print string NOT FOUND');
    }
    
    fs.writeFileSync('e:\\brkthru-digital-landing\\replace_script_report.txt', 'Modifications made: ' + modifications);

    // Write back.
    if (encoding === 'utf16le') {
        fs.writeFileSync(file, Buffer.from('\uFEFF' + content, 'utf16le'));
    } else {
        fs.writeFileSync(file, content, 'utf8');
    }
    
} catch (e) {
    fs.writeFileSync('e:\\brkthru-digital-landing\\replace_script_report.txt', 'ERROR: ' + e);
}
