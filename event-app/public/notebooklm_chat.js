/**
 * NotebookLM-inspired Chatbox Logic
 * Powered by Brkthru Digital Knowledge Base
 */

document.addEventListener('alpine:init', () => {
    console.log('NotebookLM Chat V2.1 Initialized');
    Alpine.data('notebookChat', () => ({
        isOpen: false,
        input: '',
        messages: [
            { type: 'ai', text: 'Hello! I am your AI Knowledge Assistant. I am grounded in the 3 primary sources of Brkthru Digital. How can I help you lead more effectively today?' }
        ],
        sources: [
            { id: 1, name: 'meta-coaching', active: true, url: '#' },
            { id: 2, name: 'Neuro-Semantics', active: true, url: '#' },
            { id: 3, name: 'hall workshops 2026', active: true, url: '#' },
            { id: 4, name: 'digital business', active: true, url: '#' }
        ],
        selectedNotebook: 'meta-coaching',
        isTyping: false,

        toggleChat() {
            this.isOpen = !this.isOpen;
        },

        openSource(source) {
            this.selectedNotebook = source.name;
        },

        async sendMessage() {
            if (!this.input.trim()) return;

            const userText = this.input;
            const notebook = this.selectedNotebook;
            
            this.messages.push({ type: 'user', text: userText });
            this.input = '';
            
            this.isTyping = true;
            this.scrollToBottom();

            try {
                const response = await fetch('http://localhost:5001/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: userText,
                        notebook_name: notebook
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                this.isTyping = false;
                
                if (data.error) {
                    this.messages.push({ type: 'ai', text: "Error: " + data.error });
                } else {
                    this.messages.push({ type: 'ai', text: data.response });
                }
            } catch (error) {
                console.error('Error:', error);
                this.isTyping = false;
                this.messages.push({ type: 'ai', text: "I'm having trouble connecting to my knowledge base right now. Please ensure the backend server is running." });
            }
            
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
