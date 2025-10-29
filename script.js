// Variables globales
let startTime;
let elapsedTime = 0;
let timerInterval;
let animationFrameId;

// InicializaciOn cuando el DOM esta listo
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar temporizador
    startTimer();
    
    // Configurar eventos de botones
    document.getElementById('tweetScore').addEventListener('click', tweetScore);
    document.getElementById('playDemo').addEventListener('click', playDemo);
    
    // Inicializar la vista previa del juego
    initPreview();
});

// FunciOn para iniciar el temporizador
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
}

// FunciOn para actualizar el temporizador
function updateTimer() {
    elapsedTime = (Date.now() - startTime) / 1000;
    document.getElementById('timerDisplay').textContent = `You've NYANED for ${elapsedTime.toFixed(1)} seconds`;
}

// FunciOn para compartir puntaje en Twitter
function tweetScore() {
    const text = `¡Acabo de NYANEAR por ${elapsedTime.toFixed(1)} segundos en Nyan Cat 3D! ¿Puedes superarme? #NyanCat3D`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// FunciOn para simular la demo interactiva
function playDemo() {
    const button = document.getElementById('playDemo');
    const originalText = button.textContent;
    
    button.textContent = "CARGANDO DEMO...";
    button.disabled = true;
    
    // Simular carga
    setTimeout(() => {
        alert("¡La demo interactiva estara disponible prOximamente! Mientras tanto, disfruta de la vista previa animada.");
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// FunciOn para inicializar la vista previa del juego
function initPreview() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    
    // Establecer tamaño del canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Variables para la animaciOn
    let nyanX = canvas.width / 2;
    let nyanY = canvas.height / 2;
    let stars = [];
    let rainbows = [];
    let frameCount = 0;
    
    // Crear estrellas de fondo
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3,
            speed: Math.random() * 0.5 + 0.1
        });
    }
    
    // FunciOn de animaciOn
    function animate() {
        // Limpiar canvas
        ctx.fillStyle = 'rgba(10, 10, 30, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar estrellas
        ctx.fillStyle = '#ffffff';
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Mover estrellas
            star.x -= star.speed;
            if (star.x < 0) {
                star.x = canvas.width;
                star.y = Math.random() * canvas.height;
            }
        });
        
        // Crear nuevo arcoiris periOdicamente
        if (frameCount % 60 === 0) {
            rainbows.push({
                x: nyanX + 40,
                y: nyanY,
                width: 0,
                maxWidth: 200,
                speed: 5
            });
        }
        
        // Dibujar y actualizar arcoiris
        const rainbowColors = ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
        for (let i = rainbows.length - 1; i >= 0; i--) {
            const rainbow = rainbows[i];
            
            // Dibujar arcoiris
            for (let j = 0; j < 7; j++) {
                ctx.fillStyle = rainbowColors[j];
                ctx.fillRect(
                    rainbow.x - rainbow.width, 
                    rainbow.y - 15 + j * 5, 
                    rainbow.width, 
                    5
                );
            }
            
            // Actualizar arcoiris
            rainbow.width += rainbow.speed;
            
            // Eliminar arcoiris que se salen de la pantalla
            if (rainbow.width > rainbow.maxWidth) {
                rainbows.splice(i, 1);
            }
        }
        
        // Dibujar Nyan Cat (simulaciOn)
        // Cuerpo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(nyanX - 30, nyanY - 15, 60, 30);
        
        // Cabeza
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(nyanX - 30, nyanY, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Orejas
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.moveTo(nyanX - 45, nyanY - 15);
        ctx.lineTo(nyanX - 35, nyanY - 25);
        ctx.lineTo(nyanX - 25, nyanY - 15);
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(nyanX - 45, nyanY - 5);
        ctx.lineTo(nyanX - 35, nyanY - 15);
        ctx.lineTo(nyanX - 25, nyanY - 5);
        ctx.fill();
        
        // Ojos
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(nyanX - 35, nyanY - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(nyanX - 25, nyanY - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Sonrisa
        ctx.strokeStyle = '#000000';
        ctx.beginPath();
        ctx.arc(nyanX - 30, nyanY + 2, 5, 0, Math.PI);
        ctx.stroke();
        
        // Patas
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(nyanX - 25, nyanY + 15, 10, 8);
        ctx.fillRect(nyanX - 5, nyanY + 15, 10, 8);
        
        // Mover Nyan Cat ligeramente para simular animaciOn
        nyanY += Math.sin(frameCount / 10) * 0.5;
        
        frameCount++;
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Iniciar animaciOn
    animate();
}

// Limpiar recursos cuando se cierre la pagina
window.addEventListener('beforeunload', function() {
    if (timerInterval) clearInterval(timerInterval);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
});