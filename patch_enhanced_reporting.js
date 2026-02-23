const fs = require('fs');

const filesToPatch = [
    'e:/brkthru-digital-landing/assessments.html',
    'e:/brkthru-digital-landing/start-enneagram.html'
];

const enhancedLogic = `            async function sendResultsToBackend(userData) {
                console.log("V123: Triggering Dual-Backend Sync...");
                const fullName = userData.firstName + ' ' + userData.familyName;
                
                // Enhanced Enneagram Summary Logic
                const typeNames = {
                    1: "Type 1: The Reformer (Principled, Purposeful, Self-Controlled)",
                    2: "Type 2: The Helper (Generous, Demonstrative, People-Pleasing)",
                    3: "Type 3: The Achiever (Adaptive, Excelling, Driven)",
                    4: "Type 4: The Individualist (Expressive, Dramatic, Self-Absorbed)",
                    5: "Type 5: The Investigator (Perceptive, Innovative, Isolated)",
                    6: "Type 6: The Loyalist (Engaging, Responsible, Anxious)",
                    7: "Type 7: The Enthusiast (Spontaneous, Versatile, Distractible)",
                    8: "Type 8: The Challenger (Self-Confident, Decisive, Willful)",
                    9: "Type 9: The Peacemaker (Receptive, Reassuring, Agreeable)"
                };

                const scores = userData.scores;
                const sortedTypes = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
                const topType = sortedTypes[0];
                const topTypeName = typeNames[topType] || "Enneagram Type " + topType;
                
                const pabblyPayload = {
                    name: fullName,
                    email: userData.email,
                    bcc: 'brkthru.consulting@gmail.com',
                    company: userData.company || 'N/A',
                    position: userData.position || 'N/A',
                    source: 'Enneagram Assessment V123 (Enhanced Reporting)',
                    message: "ENNEAGRAM LEADERSHIP PROFILE\\n" +
                             "---------------------------\\n" +
                             "Name: " + fullName + "\\n" +
                             "Primary Type: " + topTypeName + "\\n\\n" +
                             "Score Breakdown:\\n" +
                             Object.entries(scores).map(([t, s]) => "Type " + t + ": " + s).join("\\n") + "\\n\\n" +
                             "The full PDF report is available for download on the assessment page.",
                    raw_data: JSON.stringify(userData)
                };

                submitToPabblyHidden(pabblyPayload);
                alert("Results captured! A profile summary has been sent to your email and our consulting team.");
            }`;

filesToPatch.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    
    console.log(`Patching ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Simpler anchor matching
    const anchor = 'async function sendResultsToBackend(userData) {';
    const endAnchor = 'alert("Results captured! Please download your PDF report below.");';
    
    const startIndex = content.indexOf(anchor);
    const endIndex = content.indexOf(endAnchor, startIndex);
    
    if (startIndex !== -1 && endIndex !== -1) {
        // Find the closing brace of the function
        const closingBraceIndex = content.indexOf('}', endIndex);
        if (closingBraceIndex !== -1) {
            const oldPart = content.substring(startIndex, closingBraceIndex + 1);
            console.log(`Found function block in ${filePath}`);
            content = content.replace(oldPart, enhancedLogic);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully patched ${filePath}`);
        } else {
            console.log(`Could not find closing brace in ${filePath}`);
        }
    } else {
        console.log(`Could not find anchors in ${filePath}. startIndex: ${startIndex}, endIndex: ${endIndex}`);
    }
});
