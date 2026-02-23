import re

file_path = r'e:\brkthru-digital-landing\start-enneagram.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove legacy submitToPabblyHidden function
# It starts at: function submitToPabblyHidden(payload) {
# And ends at the closing brace five lines after the setTimeout.
pabbly_func_pattern = re.compile(r'function submitToPabblyHidden\(payload\)\s*\{.*?\}\s*\}\s*\}, 5000\);\s*\}', re.DOTALL)
content = pabbly_func_pattern.sub('', content)

# 2. Define the new dual-sync function
new_function = r'''async function sendResultsToBackend(userData) {
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
                    message: "ENNEAGRAM LEADERSHIP PROFILE\\n---------------------------\\nName: " + fullName + "\\nPrimary Type: " + topTypeName + "\\n\\nScore Breakdown:\\n" + Object.entries(scores).map(([t, s]) => "Type " + t + ": " + s).join("\\n") + "\\n\\nThe full PDF report is available for download on the assessment page.",
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
            }'''

# 3. Replace the existing sendResultsToBackend function
# It's wrapped in markers or easily identifiable
# Looking at the file content, it starts around line 1602
# Pattern: async function sendResultsToBackend\(userData\)\s*\{.*?submitToPabblyHidden\(pabblyPayload\);\s*alert\(.*?\);\s*\}
backend_func_pattern = re.compile(r'async function sendResultsToBackend\(userData\)\s*\{.*?submitToPabblyHidden\(pabblyPayload\);\s*alert\("Results captured!.*?"\);\s*\}', re.DOTALL)
new_content = backend_func_pattern.sub(new_function, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("start-enneagram.html updated with Dual-Backend Sync.")
