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
            { id: 1, name: 'Neuro-Semantics', active: true, url: 'https://notebooklm.google.com/notebook/73263c60-6754-4632-9db5-d803f7787b6d' },
            { id: 2, name: 'Meta-Coaching', active: true, url: 'https://notebooklm.google.com/notebook/fb2c0e69-de98-45ea-81a2-39c23733bc5f' },
            { id: 3, name: 'Dr. Hall 2026 Courses', active: true, url: 'https://notebooklm.google.com/notebook/175bb5b7-dc3e-4cdc-9eca-d5783fc4469a' },
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
            
            // Intelligence grounded in the 3 specific NotebookLM areas
            if (q.includes('neuro-semantics') || q.includes('what is ns') || q.includes('meaning')) {
                response = "Neuro-Semantics (NS) is the study of how we translate 'meanings' into 'performance.' It goes beyond NLP by looking at the 'Meta-Frames' we hold. For a deep dive into the models, click the 'Neuro-Semantics' badge above to open Dr. Hall's grounded research assistant.";
            } else if (q.includes('meta-coaching') || q.includes('systemic coaching') || q.includes('coach training')) {
                response = "Meta-Coaching is our systemic framework for coaching at the highest level of human potential. It involves 7 core competencies and the 'axes of change.' You can scan the full curriculum by clicking the 'Meta-Coaching' source badge above.";
            } else if (q.includes('2026') || q.includes('tour') || q.includes('dr. hall') || q.includes('courses')) {
                response = "Dr. Michael Hall's 2026 Transformation Tour includes 'Brain Camp', 'The 5-Minute Manager', and 'Thinking for Humans.' These are high-performance immersions. Click the 'Dr. Hall 2026 Courses' badge for the full schedule and grounded details.";
            } else if (q.includes('price') || q.includes('bundle') || q.includes('cost')) {
                response = "The Twin Bundle (Book + Toolkit) is our hero offer for ₱600. It includes the 10th Anniversary edition of the World Class Coach book and the actionable Coaching Toolkit. It's the best foundation for leaders.";
            } else if (q.includes('imposter') || q.includes('syndrome')) {
                response = "Imposter syndrome is a classic 'Meta-Frame' issue we solve in Neuro-Semantics. It's often the result of evaluating yourself using the wrong level of meaning. Our 'Neuro-Semantics' source has specific models to debug this.";
            } else {
                response = "That is a great question. Based on my sources, effective leadership starts with managing your own 'inner game' first. Would you like to know more about our Coaching Toolkit which has scripts for these exact situations? You can also open the full grounded assistants by clicking the badges above.";
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
