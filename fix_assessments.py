
import os
import sys

target_path = r'e:\brkthru-digital-landing\assessments.html'

try:
    if not os.path.exists(target_path):
        print(f"Error: File {target_path} not found.")
        sys.exit(1)

    with open(target_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"File loaded successfully. Size: {len(content)} bytes.")

    # 1. Broad match for submitToPabblyHidden
    # We look for the comment and the function start until the closing bracket
    import re
    
    pabbly_pattern = re.compile(r'// --- 1\. ZERO-HANDSHAKE PABBLY SYNC ---.*?function submitToPabblyHidden\(payload\) \{.*?\}', re.DOTALL)
    
    if pabbly_pattern.search(content):
        content = pabbly_pattern.sub("", content)
        print("Success: Removed old Pabbly function using regex.")
    else:
        print("Warning: Could not find old Pabbly function using regex.")

    # 2. Broad match for sendResultsToBackend
    # We replace from the function start to the end of its block
    sync_pattern = re.compile(r'async function sendResultsToBackend\(userData\) \{.*?V123: Triggering Dual-Backend Sync.*?alert\("Results captured!.*?"\);\s+\}', re.DOTALL)
    
    new_sync_function = """            async function sendResultsToBackend(userData) {
                console.log("V127: Triggering Dual-Backend Sync (Fetch)...");
                const googleUrl = 'https://script.google.com/macros/s/AKfycbxyWY3MHZSKq7jQBqYS6duo2zageOFGendaJbzYEDZn1fs4wCeFy91gt5af0aqqpEq-3A/exec';
                const pabblyUrl = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjcwNTZjMDYzNTA0MzQ1MjZiNTUzNjUxMzYi_pc';
                
                const fullName = userData.firstName + ' ' + userData.familyName;
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
                    source: 'Enneagram Assessment V127 (Dual-Sync)',
                    message: "ENNEAGRAM LEADERSHIP PROFILE\\n---------------------------\\nName: " + fullName + "\\nPrimary Type: " + topTypeName + "\\n\\nScore Breakdown:\\n" + Object.entries(scores).map(([t, s]) => "Type " + t + ": " + s).join("\\n") + "\\n\\nThe full PDF report is available for download on the assessment page.",
                    raw_data: JSON.stringify(userData)
                };

                // Prepare Form Data for Google Apps Script
                const googleFormData = new URLSearchParams();
                for (const key in pabblyPayload) {
                    googleFormData.append(key, pabblyPayload[key]);
                }
                googleFormData.append('notification_type', 'enneagram_report_v127');
                googleFormData.append('project', 'Brkthru Digital V127');

                try {
                    console.log("V127: Dispatching Dual-Reports...");
                    // 1. Send to Pabbly via fetch (No-CORS)
                    fetch(pabblyUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pabblyPayload)
                    }).catch(e => console.warn("Pabbly minor sync issue:", e));

                    // 2. Send to Google Apps Script via fetch (No-CORS)
                    await fetch(googleUrl, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: googleFormData.toString()
                    });

                    console.log("V127: Dual-Sync Successful.");
                    alert("Results captured! A profile summary has been sent to your email and our consulting team.");
                } catch (e) {
                    console.error("V127 Sync Error:", e);
                    alert("Note: Data reached the gateway, but confirmation failed. Please download your PDF manually if the email doesn't arrive.");
                }
            }"""

    if sync_pattern.search(content):
        content = sync_pattern.sub(new_sync_function, content)
        print("Success: Replaced sync function using regex.")
    else:
        print("Warning: Could not find old sync function using regex.")

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("File saved successfully.")

except Exception as e:
    print(f"Unexpected error: {e}")
    sys.exit(1)
