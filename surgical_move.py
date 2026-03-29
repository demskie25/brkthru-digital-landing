
import sys

def surgical_move():
    # Read assessbackup.html
    with open('assessbackup.html', 'r', encoding='utf-8') as f:
        backup_lines = f.readlines()
    
    # Extract inner content from line 1076 to 1510 (0-indexed: 1075 to 1509)
    # Note: view_file line numbers are 1-indexed.
    inner_content = "".join(backup_lines[1075:1510])
    
    # Extract attributes from line 1071-1074
    # Line 1071: <div id="appContent" x-show="enneagramUnlocked" x-cloak
    # Line 1072: x-data="{ hasFinished: false, currentStep: 'intro', showGoFullPagePopup: false, showDetailedInstructions: false }"
    # Line 1073: @results-ready.window="hasFinished = true; showGoFullPagePopup = true"
    # Line 1074: @quiz-start.window="currentStep = 'quiz'">
    
    attributes = ' x-show="enneagramUnlocked" x-cloak x-data="{ hasFinished: false, currentStep: \'intro\', showGoFullPagePopup: false, showDetailedInstructions: false }" @results-ready.window="hasFinished = true; showGoFullPagePopup = true" @quiz-start.window="currentStep = \'quiz\'"'
    
    # Read assessments.html
    with open('assessments.html', 'r', encoding='utf-8') as f:
        target_content = f.read()
    
    # Find the appContent div in target
    start_tag = '<div id="appContent">'
    start_idx = target_content.find(start_tag)
    if start_idx == -1:
        print("Could not find target appContent div")
        return
    
    # Find the closing tag for this div in target
    # In the current assessments.html, it's very simple:
    # 29:     <div id="appContent">
    # 30:         <h1>[REPLACING CONTENT NEXT...]</h1>
    # 31:         <p>The 16-page report will be moved here from the backup next.</p>
    # 32:     </div>
    
    end_tag = '</div>'
    # We want the FIRST </div> after the start_tag
    end_idx = target_content.find(end_tag, start_idx + len(start_tag))
    
    # Construct new content
    new_start_tag = f'<div id="appContent"{attributes}>'
    new_target_content = target_content[:start_idx] + new_start_tag + "\n" + inner_content + target_content[end_idx:]
    
    with open('assessments.html', 'w', encoding='utf-8') as f:
        f.write(new_target_content)
    
    print("Successfully moved report content to assessments.html")

surgical_move()
