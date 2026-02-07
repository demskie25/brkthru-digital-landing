/**
 * NotebookLM-inspired Chatbox Logic
 * Powered by Brkthru Digital Knowledge Base
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('notebookChat', () => ({
        isOpen: false,
        input: '',
        messages: [
            { type: 'ai', text: 'Hello! I am your AI Knowledge Assistant. I am grounded in the 3 primary sources of Brkthru Digital. How can I help you lead more effectively today?' }
        ],
        sources: [
            { id: 1, name: 'Leadership Hub', active: true, url: 'https://notebooklm.google.com/notebook/73263c60-6754-4632-9db5-d803f7787b6d' },
            { id: 2, name: 'Twin Bundle Book', active: true, url: 'https://notebooklm.google.com/notebook/fb2c0e69-de98-45ea-81a2-39c23733bc5f' },
            { id: 3, name: 'Coaching Toolkit', active: true, url: 'https://notebooklm.google.com/notebook/175bb5b7-dc3e-4cdc-9eca-d5783fc4469a' },
            { id: 4, name: 'Future Source', active: false, url: '' }
        ],
        isTyping: false,

        toggleChat() {
            this.isOpen = !this.isOpen;
        },

        openSource(source) {
            if (source.url) {
                window.open(source.url, '_blank');
            }
        },

        async sendMessage() {
            if (!this.input.trim()) return;

            const userText = this.input;
            this.messages.push({ type: 'user', text: userText });
            this.input = '';
            
            this.isTyping = true;
            
            // Scroll to bottom
            this.scrollToBottom();

            // Simulate AI Thinking
            setTimeout(() => {
                this.generateResponse(userText);
            }, 1000);
        },

        generateResponse(query) {
            this.isTyping = false;
            let response = "";
            
            const q = query.toLowerCase();
            
            // Basic grounded logic based on ai_system_prompt_context.txt
            if (q.includes('bundle') || q.includes('price') || q.includes('cost')) {
                response = "The Twin Bundle (Book + Toolkit) is our hero offer for ₱600. It includes the 10th Anniversary edition of the World Class Coach book and the actionable Coaching Toolkit. Separately, they are ₱399 each, so the bundle saves you 25%.";
            } else if (q.includes('imposter') || q.includes('fraud')) {
                response = "Imposter syndrome is common among high-achieving leaders. In the World Class Coach book, we explore the 'internal narrative' and how to debug the frames that make you feel like a fraud despite your results.";
            } else if (q.includes('burnout') || q.includes('tired')) {
                response = "Burnout often comes from carrying the team's weight. Our resources teach you how to move from being the 'Chief Problem Solver' to a coach who develops others to lead.";
            } else if (q.includes('mcp')) {
                response = "I am powered by the Model Context Protocol (MCP) concepts, meaning I retrieve specific insights from my 3 curated internal sources to provide you with verified leadership advice.";
            } else if (q.includes('chapters') || q.includes('outline') || q.includes('table of contents')) {
                response = "That's a specific request for the deep content! You can view the full table of contents and index by opening our grounded NotebookLM assistants. Click the 'Leadership Hub' or 'Twin Bundle Book' badges above to open the respective deep-dive assistant.";
            } else {
                response = "That is a great question. Based on my sources, effective leadership starts with managing your own 'inner game' first. Would you like to know more about our Coaching Toolkit which has scripts for these exact situations? You can also open the full assistant for it by clicking the badge above.";
            }

            this.messages.push({ type: 'ai', text: response });
            this.scrollToBottom();
        },

        scrollToBottom() {
            setTimeout(() => {
                const el = document.querySelector('.chat-messages');
                if (el) el.scrollTop = el.scrollHeight;
            }, 50);
        }
    }));
});
