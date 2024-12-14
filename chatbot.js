import botConfig from './botdesign.js';

// Initialize Flowise Chatbot
let flowiseChat;

async function initializeFlowise() {
    flowiseChat = await Chatbot.init(botConfig);
}

// Initialize chatbot functionality
function initializeChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const typingIndicator = document.querySelector('.typing-indicator');

    // Toggle chatbot
    chatbotToggle?.addEventListener('click', () => {
        chatbotContainer?.classList.toggle('active');
    });

    // Close chatbot
    closeChat?.addEventListener('click', () => {
        chatbotContainer?.classList.remove('active');
    });

    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, true);
            chatInput.value = '';

            // Show typing indicator
            typingIndicator.style.display = 'flex';

            try {
                // Get response from Flowise
                const response = await flowiseChat.sendMessage(message);
                typingIndicator.style.display = 'none';
                addMessage(response);
            } catch (error) {
                console.error('Error:', error);
                typingIndicator.style.display = 'none';
                addMessage('Sorry, I encountered an error. Please try again later.');
            }
        }
    }

    // Send button click
    sendButton?.addEventListener('click', sendMessage);

    // Enter key press
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial greeting
    addMessage('Hello! How can I help you today?');
}

// Add message to chat
function addMessage(message, isUser = false) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages?.appendChild(messageDiv);
    chatMessages?.scrollTo(0, chatMessages.scrollHeight);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await initializeFlowise();
    initializeChatbot();
});
