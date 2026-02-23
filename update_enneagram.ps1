$filePath = "e:\brkthru-digital-landing\start-enneagram.html"
$content = [System.IO.File]::ReadAllText($filePath)
$oldCode = @"
                        async function sendResultsToBackend(userData) {
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
                
                const summary = "Primary Type: " + topTypeName;

                const pabblyPayload = {
                    name: fullName,
                    email: userData.email,
                    bcc: 'brkthru.consulting@gmail.com',
                    company: userData.company || 'N/A',
                    position: userData.position || 'N/A',
                    source: 'Enneagram Assessment V123 (Enhanced Reporting)',
                    message: "ENNEAGRAM LEADERSHIP PROFILE\n" +
                             "---------------------------\n" +
                             "Name: " + fullName + "\n" +
                             "Primary Type: " + topTypeName + "\n\n" +
                             "Score Breakdown:\n" +
                             Object.entries(scores).map(([t, s]) => "Type " + t + ": " + s).join("\n") + "\n\n" +
                             "The full PDF report is available for download on the assessment page.",
                    raw_data: JSON.stringify(userData)
                };

                submitToPabblyHidden(pabblyPayload);
                alert("Results captured! A profile summary has been sent to your email and our consulting team.");
            }
"@
$newCode = @"
            async function sendResultsToBackend(userData) {
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
                
                const summary = "Primary Type: " + topTypeName;

                const pabblyPayload = {
                    name: fullName,
                    email: userData.email,
                    bcc: 'brkthru.consulting@gmail.com',
                    company: userData.company || 'N/A',
                    position: userData.position || 'N/A',
                    source: 'Enneagram Assessment V123 (Enhanced Reporting)',
                    message: "ENNEAGRAM LEADERSHIP PROFILE\n" +
                             "---------------------------\n" +
                             "Name: " + fullName + "\n" +
                             "Primary Type: " + topTypeName + "\n\n" +
                             "Score Breakdown:\n" +
                             Object.entries(scores).map(([t, s]) => "Type " + t + ": " + s).join("\n") + "\n\n" +
                             "The full PDF report is available for download on the assessment page.",
                    raw_data: JSON.stringify(userData)
                };

                const googlePayload = new URLSearchParams();
                googlePayload.append('name', fullName);
                googlePayload.append('email', userData.email);
                googlePayload.append('company', userData.company || 'N/A');
                googlePayload.append('position', userData.position || 'N/A');
                googlePayload.append('summary', summary);
                googlePayload.append('source', 'Enneagram Assessment V123');

                // Dual-Backend Sync Logic
                try {
                    // 1. Send to Pabbly
                    fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzNTA0MzQ1MjZiNTUzNjUxMzYi_pc', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: new URLSearchParams(pabblyPayload)
                    });
                    console.log("V123: Pabbly Sync Initiated.");

                    // 2. Send to Google Apps Script
                    fetch('https://script.google.com/macros/s/AKfycbxyWY3MHZSKq7jQBqYS6duo2zageOFGendaJbzYEDZn1fs4wCeFy91gt5af0aqqpEq-3A/exec', {
                        method: 'POST',
                        mode: 'no-cors',
                        body: googlePayload
                    });
                    console.log("V123: Google Script Sync Initiated.");

                    alert("Results captured! A profile summary has been sent to your email and our consulting team.");
                } catch (e) {
                    console.error("Sync Error:", e);
                }
            }
"@
# Check if oldCode exists
if ($content.Contains($oldCode)) {
    $content = $content.Replace($oldCode, $newCode)
    [System.IO.File]::WriteAllText($filePath, $content)
    Write-Host "File updated successfully."
} else {
    Write-Error "Old code not found in file."
}
