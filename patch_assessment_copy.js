const fs = require('fs');

const filesToPatch = ['e:/brkthru-digital-landing/assessments.html', 'e:/brkthru-digital-landing/start-enneagram.html'];

const patches = [
    {
        pattern: /Meta-Programs Assessment for Leaders/g,
        replacement: 'Enneagram Assessment for Leaders'
    },
    {
        pattern: /This meta-programs assessment helps managers understand the subconscious mental "filters" or "operating systems" people use to process information, make decisions, and react\./g,
        replacement: 'This Enneagram assessment helps leaders understand the core motivations, fears, and subconscious patterns that drive behavior, decision-making, and interpersonal dynamics.'
    },
    {
        pattern: /Recognizing these filters allows you to:/g,
        replacement: 'Recognizing these patterns allows you to:'
    },
    {
        pattern: /<li><strong>Communicate more effectively:<\/strong> Tailor your message to resonate with individual processing styles\.<\/li>/g,
        replacement: '<li><strong>Communicate More Effectively:</strong> Bridge communication gaps and tailor your leadership style to resonate with different personality types.</li>'
    },
    {
        pattern: /<li><strong>Delegate smarter:<\/strong> Match tasks to those best suited to handle them\.<\/li>/g,
        replacement: '<li><strong>Build High-Performance Teams:</strong> Harness the unique strengths of each type to create a more balanced, resilient, and effective workspace.</li>'
    },
    {
        pattern: /<li><strong>Coach powerfully:<\/strong> Understand motivations and frame guidance for greater impact\.<\/li>/g,
        replacement: '<li><strong>Coach with Precision:</strong> Identify specific growth pathways and stressors for each team member to unlock their full potential.</li>'
    },
    {
        pattern: /<li><strong>Predict behavior:<\/strong> Anticipate responses in various situations\.<\/li>/g,
        replacement: '<li><strong>Master Self-Leadership:</strong> Gain deep insights into your own blind spots and leverage your type\'s natural strengths for maximum impact.</li>'
    },
    {
        pattern: /The assessment isn't a test, but a method to identify these influential filters\. Understanding meta-programs provides practical "people literacy" to boost team productivity and your overall leadership effectiveness\./g,
        replacement: 'This assessment isn\'t a test, but a powerful method for self-discovery and people-literacy. Understanding the Enneagram provides a practical framework to boost team productivity, resolve conflicts, and enhance your overall leadership effectiveness.'
    }
];

filesToPatch.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    
    console.log(`Patching ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalLength = content.length;
    
    patches.forEach(patch => {
        content = content.replace(patch.pattern, patch.replacement);
    });
    
    if (content.length === originalLength && !content.includes('Enneagram Assessment for Leaders')) {
         console.log(`No changes made to ${filePath}. Check regex patterns.`);
    } else {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully patched ${filePath}`);
    }
});
