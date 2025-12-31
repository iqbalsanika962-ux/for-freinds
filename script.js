// Data for friends
const friends = [
    { name: "Daim Khan", cover: "assets/images/cover1.jpg", pics: ["daim1.jpg", "daim2.jpg", "daim3.jpg"] },
    { name: "Toheed Ahmad", cover: "assets/images/cover2.jpg", pics: ["toheed1.jpg", "toheed2.jpg", "toheed3.jpg"] },
    { name: "Ukasha Malik", cover: "assets/images/cover3.jpg", pics: ["ukasha1.jpg", "ukasha2.jpg", "ukasha3.jpg"] },
    { name: "Aliyan Bhatti", cover: "assets/images/cover4.jpg", pics: ["aliyan1.jpg", "aliyan2.jpg", "aliyan3.jpg"] },
    { name: "Bilal Akram", cover: "assets/images/cover5.jpg", pics: ["bilal1.jpg", "bilal2.jpg", "bilal3.jpg"] },
    { name: "Faizan Pervaiz", cover: "assets/images/cover6.jpg", pics: ["faizan1.jpg", "faizan2.jpg", "faizan3.jpg"] }
];

// Phase Management
function goToPhase(num) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`phase${num}`);
    
    if (target) {
        target.classList.add('active');
    }

    // Logic for specific phases
    if (num === 2) document.body.classList.add('bg-cream');
    
    if (num === 5) {
        const btn = document.getElementById('hny-next-btn');
        btn.classList.add('hidden');
        setTimeout(() => btn.classList.remove('hidden'), 4000);
    }

    if (num === 6) renderFriends();
}

// Render the 6 boxes
function renderFriends() {
    const grid = document.getElementById('friends-grid');
    grid.innerHTML = friends.map((f, i) => `
        <div class="card" onclick="openGallery(${i})">
            <img src="${f.cover}" alt="${f.name}">
            <h3>${f.name}</h3>
        </div>
    `).join('');
}

function openGallery(idx) {
    const f = friends[idx];
    const target = document.getElementById('gallery-target');
    target.innerHTML = `
        <h1 class="giant-text">For ${f.name}</h1>
        <div class="gallery-row">
            ${f.pics.map(p => `<img src="assets/images/${p}">`).join('')}
        </div>
        <div style="margin-top:30px">
            <p style="font-size:1.5rem">Wishing you a year full of blessings!</p>
            <p style="font-weight:bold; color:var(--gold)">Love from Ali Ahmad ❤️</p>
        </div>
    `;
    goToPhase(7);
}

// Music
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    if (music.paused) {
        music.play();
        icon.innerHTML = "⏸";
    } else {
        music.pause();
        icon.innerHTML = "▶";
    }
}

function openEnvelope() {
    document.querySelector('.envelope').classList.toggle('open');
}

// Simple Fireworks Background logic
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    this.vel = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
    this.alpha = 1;
    this.draw = () => {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color; ctx.fill();
    };
    this.update = () => {
        this.x += this.vel.x; this.y += this.vel.y;
        this.alpha -= 0.015;
    };
}

let particles = [];
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 2);
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        for (let i = 0; i < 30; i++) particles.push(new Particle(x, y, color));
    }
    particles.forEach((p, i) => {
        if (p.alpha <= 0) particles.splice(i, 1);
        else { p.update(); p.draw(); }
    });
}
animate();