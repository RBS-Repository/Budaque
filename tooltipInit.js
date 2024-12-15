// Add the tooltip after a short delay to ensure the button is rendered
setTimeout(() => {
    // First, add the styles to the head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .ask-me-tooltip {
            position: fixed;
            right: ${isMobile() ? '120px' : '120px'};
            bottom: ${isMobile() ? '80px' : '90px'};
            background-color: #b3005f;
            color: #dedede;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: ${isMobile() ? '12px' : '17px'};
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 9999;
            animation: fadeInOut 4s infinite;
            white-space: nowrap;
            transition: opacity 0.3s ease-out;
        }

        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(10px); }
            30% { opacity: 1; transform: translateX(0); }
            70% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(10px); }
        }

        @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        }

        .shake {
            animation: shake 0.5s ease-in-out;
        }

        .chatbot-container.active ~ .ask-me-tooltip {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
    `;
    document.head.appendChild(styleSheet);

    // Create and add the tooltip
    const tooltip = document.createElement("div");
    tooltip.className = "ask-me-tooltip";
    document.body.appendChild(tooltip);

    // Array of messages to rotate through
    const messages = [
        "Ask me!",
        "Need help?",
        "Click here!",
        "Have questions?"
    ];
    let currentIndex = 0;

    // Function to update tooltip text with fade effect
    function updateTooltip() {
        tooltip.style.opacity = '0';
        
        setTimeout(() => {
            tooltip.textContent = messages[currentIndex];
            tooltip.style.opacity = '1';
            currentIndex = (currentIndex + 1) % messages.length;
        }, 500);
    }

    // Initial text
    updateTooltip();

    // Rotate messages every 3 seconds
    const messageInterval = setInterval(updateTooltip, 3950);

    // Add shake animation every 5 seconds
    const chatButton = document.querySelector('.chatbot-toggle');
    if (chatButton) {
        const shakeButton = () => {
            chatButton.classList.add('shake');
            setTimeout(() => {
                chatButton.classList.remove('shake');
            }, 500);
        };

        // Start shaking after 2 seconds
        setTimeout(() => {
            const shakeInterval = setInterval(shakeButton, 5000);
            
            // Hide tooltip and stop animations when chat is opened
            chatButton.addEventListener('click', () => {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                clearInterval(messageInterval);
                clearInterval(shakeInterval);
            });
        }, 2000);
    }
}, 1000);

// Helper function to detect mobile
function isMobile() {
    return window.innerWidth <= 768;
}
