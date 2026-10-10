// 1. Script d'animation des particules dorées (Canvas)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 60;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -1 - 0.2;
        this.opacity = Math.random() * 0.7 + 0.3;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
            this.reset();
            this.y = canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(243, 156, 18, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Gestion de la modale vidéo (Ouverture / Fermeture et arrêt du son à la fermeture)
const openModalBtn = document.getElementById('openVideoModal');
const videoModal = document.getElementById('videoModal');
const closeModalBtn = document.getElementById('closeVideoModal');
const modalVideos = videoModal.querySelectorAll('video');

openModalBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    videoModal.classList.remove('active');
    modalVideos.forEach(v => v.pause()); // Stoppe la lecture et le son des vidéos en fermant
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideos.forEach(v => v.pause());
    }
});

// 3. Gestionnaire de formulaire de réservation WhatsApp
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const location = document.getElementById('location').value;
    
    const phoneNumber = "213663951108";
    
    const message = `Bonjour DJ BERBER,%0A%0AJe souhaite réserver une date pour mon événement :%0A- *Nom* : ${encodeURIComponent(name)}%0A- *Événement* : ${encodeURIComponent(eventType)}%0A- *Date* : ${encodeURIComponent(eventDate)}%0A- *Lieu* : ${encodeURIComponent(location)}%0A%0AMerci de me recontacter pour confirmer la disponibilité.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
});