// Bot Design Configuration
const botConfig = {
    chatflowid: "f41e9229-7ffa-45cc-b78f-e53875908b71",
    apiHost: "https://jekjek1234-bmmc.hf.space",
    theme: {
        button: {
            backgroundColor: "#00ff88",
            right: 40,
            bottom: 40,
            size: "large",
            iconColor: "#111111",
            customIconSrc: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
        },
        chatWindow: {
            welcomeMessage: "👋 Hi! I'm Gi-bot Budaque Multi Media Creations Assistant. How can I help you?",
            backgroundColor: "rgba(17, 17, 17, 0.9)",
            height: 500,
            width: 350,
            fontSize: 16,
            poweredByTextColor: "transparent",
            poweredByText: "",
            style: {
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            },
            botMessage: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                textColor: "#ffffff",
                showAvatar: true,
                avatarSrc: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png",
            },
            userMessage: {
                backgroundColor: "rgba(0, 255, 136, 0.15)",
                textColor: "#00ff88",
                showAvatar: true,
                avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
            },
            textInput: {
                placeholder: "Type your message...",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                textColor: "#ffffff",
                sendButtonColor: "#00ff88",
            }
        },
        customCSS: {
            chatInput: `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.3);
                padding: 10px 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 0 0 12px 12px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                z-index: 1000;
            `,
            chatContainer: `
                display: flex;
                flex-direction: column;
                height: calc(100% - 80px);
                position: relative;
                overflow: hidden;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                background: rgba(17, 17, 17, 0.75);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 15px;
            `,
            messagesContainer: `
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                padding-bottom: 80px;
                scroll-behavior: smooth;
                background: transparent;
            `,
            buttonTooltip: `
                position: absolute;
                content: "Ask me!";
                right: 80px;
                bottom: 20px;
                background-color: #00ff88;
                color: #111111;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                animation: fadeInOut 2s infinite;
                white-space: nowrap;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                font-weight: 500;
                pointer-events: none;
                z-index: 1001;
            `,
            '@keyframes fadeInOut': `
                0% { opacity: 0; transform: translateX(10px); }
                50% { opacity: 1; transform: translateX(0); }
                100% { opacity: 0; transform: translateX(10px); }
            `,
            poweredByContainer: `
                display: none !important;
            `
        }
    }
};

export default botConfig;
