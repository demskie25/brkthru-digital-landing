import os

files_to_patch = [
    r'e:\brkthru-digital-landing\assessments.html',
    r'e:\brkthru-digital-landing\start-enneagram.html'
]

enhanced_logic = """            async function sendResultsToBackend(userData) {
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
            }"""

for file_path in files_to_patch:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    
    print(f"Patching {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    anchor = 'async function sendResultsToBackend(userData) {'
    end_anchor = 'alert("Results captured! Please download your PDF report below.");'
    
    start_index = content.find(anchor)
    end_index = content.find(end_anchor, start_index)
    
    if start_index != -1 and end_index != -1:
        closing_brace_index = content.find('}', end_index)
        if closing_brace_index != -1:
            old_part = content[start_index : closing_brace_index + 1]
            print(f"Found function block in {file_path}")
            new_content = content.replace(old_part, enhanced_logic)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Successfully patched {file_path}")
        else:
            print(f"Could not find closing brace in {file_path}")
    else:
        print(f"Could not find anchors in {file_path}. startIndex: {start_index}, endIndex: {end_index}")
