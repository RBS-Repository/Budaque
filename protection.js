(function() {
    // Redirect function
    function redirectToBlank() {
        window.location.replace('about:blank');
    }

    // Detect DevTools
    let devtools = function() {};
    devtools.toString = function() {
        redirectToBlank();
    }

    // Check DevTools every 100ms
    setInterval(function() {
        devtools.toString();
    }, 100);

    // Keyboard shortcuts protection
    document.addEventListener('keydown', function(e) {
        // Detect: Ctrl+U, F12, Ctrl+Shift+I/J/C
        if (
            (e.ctrlKey && e.key === 'u') || 
            (e.key === 'F12') || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
        ) {
            redirectToBlank();
        }
    }, true);

    // Right-click protection
    document.addEventListener('contextmenu', function(e) {
        redirectToBlank();
    }, true);

    // Additional DevTools detection
    setInterval(function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        if (widthThreshold || heightThreshold) {
            redirectToBlank();
        }
    }, 1000);

})();