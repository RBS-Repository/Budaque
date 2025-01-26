window.onload = function() {
    const maskIntro = document.getElementById('mask-intro');
    const introContainer = document.querySelector('.intro-container');
    
    // Start zoom animation after letters appear
    setTimeout(() => {
        introContainer.classList.add('zoom-out');
        
        // Start fade out after zoom
        setTimeout(() => {
            maskIntro.classList.add('fade-out');
            
            // Remove mask after fade out
            setTimeout(() => {
                maskIntro.style.display = 'none';
            }, 500);
        }, 1500);
    }, 2000);
};