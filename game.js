(function() {
    const overlay = document.createElement('div');
    overlay.id = 'game-overlay-container';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.backdropFilter = 'blur(12px)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '100000';

    const outerContainer = document.createElement('div');
    outerContainer.style.position = 'relative';
    outerContainer.style.width = 'min(90vw, 450px)';
    outerContainer.style.height = 'min(95vh, 800px)';
    outerContainer.style.display = 'flex';
    outerContainer.style.alignItems = 'center';

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = '#000';
    container.style.borderRadius = '40px'; 
    container.style.overflow = 'hidden'; 
    container.style.boxShadow = '0 0 40px rgba(0,0,0,0.8), 0 0 0 10px #222';
    container.style.border = '4px solid #444';
    container.style.position = 'relative';

    const sliderTrack = document.createElement('div');
    sliderTrack.style.display = 'flex';
    sliderTrack.style.width = '200%'; 
    sliderTrack.style.height = '100%';
    sliderTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    sliderTrack.style.transform = 'translateX(0%)';

    const gameHTML1 = `<!DOCTYPE HTML><html><head><meta charset="utf-8" /><title>Candy Crush</title><meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" /><link rel="stylesheet" href="https://830581635-628405001538672842.preview.editmysite.com/uploads/b/139890129-709153476852373754/files/css/stylesheet.css" type="text/css" /><script src="https://830581635-628405001538672842.preview.editmysite.com/uploads/b/139890129-709153476852373754/files/js/custom-phaser.min.js"></script><script src="https://830581635-628405001538672842.preview.editmysite.com/uploads/b/139890129-709153476852373754/files/js/game.min.js"></script><style>body { margin: 0; padding: 0; background: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; }</style></head><body onload="initGame(); setGameVolume();"><div id="gameFontPreload"><div style="font-family: ComicSansBold">.</div></div><script>function setGameVolume() { const checkInterval = setInterval(() => { if (window.game && window.game.sound) { window.game.sound.volume = 0.1; clearInterval(checkInterval); } }, 500); }</script></body></html>`;

    const gameHTML2 = `<!DOCTYPE html><html><head><meta charset="utf-8"><base href="https://cdn.jsdelivr.net/gh/bubbls/youtube-playables@1b8d5d149e9498d3ea95aad1037d1411511d41d3/magic-tiles-3/"><title>PI Playables</title><script src="https://cdn.jsdelivr.net/gh/bubbls/youtube-playables@main/ytgame.js"></script><meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1, minimum-scale=1,maximum-scale=1" /><style>body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; } #splash { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #FFFFFF; display: flex; align-items: center; justify-content: center; z-index: 999; } #splash-logo { width: 100vmin; height: 100vmin; object-fit: contain; opacity: 0; transition: opacity 0.5s ease-in-out; } #GameCanvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; }</style></head><body><div id="splash"><img id="splash-logo" src="logo_expanded.jpeg" alt="Amanotes Logo"></div><canvas id="GameCanvas" oncontextmenu="event.preventDefault()" tabindex="0"></canvas><script src="src/settings.js" charset="utf-8"></script><script src="main.js" charset="utf-8"></script><script type="text/javascript">(function () { var splash = document.getElementById('splash'); splash.style.display = 'block'; function loadScript(moduleName, cb) { function scriptLoaded() { document.body.removeChild(domScript); domScript.removeEventListener('load', scriptLoaded, false); cb && cb(); }; var domScript = document.createElement('script'); domScript.async = true; domScript.src = moduleName; domScript.addEventListener('load', scriptLoaded, false); document.body.appendChild(domScript); } loadScript('cocos2d-js-min.js', function () { if (typeof CC_PHYSICS_BUILTIN !== 'undefined' && (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON)) { loadScript('physics-min.js', window.boot); } else { window.boot(); } }); })();</script></body></html>`;

    const games = [gameHTML1, gameHTML2];
    const iframes = [];
    let currentIndex = 0;

    // Build the slides
    games.forEach((html, index) => {
        const slide = document.createElement('div');
        slide.style.width = '50%'; 
        slide.style.height = '100%';
        
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        
        // Only load the first game initially
        if (index === 0) {
            iframe.srcdoc = html;
        }

        iframes.push(iframe);
        slide.appendChild(iframe);
        sliderTrack.appendChild(slide);
    });

    // Update visibility function
    const updateActiveGame = () => {
        iframes.forEach((iframe, index) => {
            if (index === currentIndex) {
                // If it's the current slide and it's empty, load it
                if (!iframe.srcdoc || iframe.srcdoc === 'about:blank') {
                    iframe.srcdoc = games[index];
                }
            } else {
                // If it's not the current slide, kill the content to stop sound/CPU
                iframe.srcdoc = ''; 
            }
        });
    };

    const createArrow = (direction) => {
        const btn = document.createElement('button');
        btn.innerHTML = direction === 'left' ? '&#8249;' : '&#8250;';
        btn.style.position = 'absolute';
        btn.style[direction] = '-60px';
        btn.style.background = 'rgba(255,255,255,0.1)';
        btn.style.border = '2px solid #444';
        btn.style.color = 'white';
        btn.style.fontSize = '40px';
        btn.style.cursor = 'pointer';
        btn.style.width = '50px';
        btn.style.height = '50px';
        btn.style.borderRadius = '50%';
        btn.style.display = 'flex';
        btn.style.justifyContent = 'center';
        btn.style.alignItems = 'center';
        btn.style.transition = 'all 0.3s';
        btn.style.zIndex = '100001';

        btn.onmouseover = () => btn.style.background = 'rgba(255,255,255,0.3)';
        btn.onmouseout = () => btn.style.background = 'rgba(255,255,255,0.1)';
        
        btn.onclick = () => {
            if (direction === 'left') {
                currentIndex = (currentIndex - 1 + games.length) % games.length;
            } else {
                currentIndex = (currentIndex + 1) % games.length;
            }
            sliderTrack.style.transform = `translateX(-${currentIndex * 50}%)`;
            
            // Trigger the pause/resume logic
            updateActiveGame();
        };
        return btn;
    };

    const leftArrow = createArrow('left');
    const rightArrow = createArrow('right');

    container.appendChild(sliderTrack);
    outerContainer.appendChild(leftArrow);
    outerContainer.appendChild(container);
    outerContainer.appendChild(rightArrow);
    overlay.appendChild(outerContainer);
    document.body.appendChild(overlay);
})();