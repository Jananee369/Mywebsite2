/* =====================================================
   MYSTERIES OF SPACE — Stars & Particle Canvas Engine
   Handles: animated stars, loading canvas, dark matter
   particles, cosmic canvas, interactive bg particles
   ===================================================== */

'use strict';

// ── Utility: Random between min and max ──────────────
const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));

/* ===================================================
   1. LOADING SCREEN STARS CANVAS
   =================================================== */
function initLoaderCanvas() {
    const canvas = document.getElementById('loaderCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Star particles for loader
    const stars = Array.from({ length: 200 }, () => ({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        r: rand(0.5, 2.5),
        speed: rand(0.1, 0.5),
        opacity: rand(0.3, 1),
        twinkle: rand(0, Math.PI * 2)
    }));

    let loaderAnim;

    function drawLoader() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach(s => {
            s.twinkle += 0.02;
            const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.twinkle));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
            ctx.fill();

            // Drift downward slowly
            s.y += s.speed * 0.3;
            if (s.y > canvas.height) {
                s.y = 0;
                s.x = rand(0, canvas.width);
            }
        });

        // Glowing center nebula
        const time = Date.now() * 0.001;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 + Math.sin(time) * 30);
        grad.addColorStop(0, `rgba(0, 80, 180, ${0.06 + 0.03 * Math.sin(time)})`);
        grad.addColorStop(0.5, `rgba(80, 0, 150, ${0.04 + 0.02 * Math.sin(time * 1.3)})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        loaderAnim = requestAnimationFrame(drawLoader);
    }

    drawLoader();

    // Return cleanup function
    return () => cancelAnimationFrame(loaderAnim);
}

/* ===================================================
   2. HERO STAR FIELD CANVAS (Parallax + Twinkling)
   =================================================== */
function initStarCanvas() {
    const canvas = document.getElementById('starCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = 0, mouseY = 0;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse for parallax
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Create star layers (near/mid/far for parallax depth)
    const layers = [
        { count: 80,  rMin: 1.5, rMax: 3,   speedZ: 0.5,  color: [255, 255, 255] },  // near
        { count: 150, rMin: 0.8, rMax: 2,   speedZ: 0.25, color: [200, 220, 255] },  // mid
        { count: 200, rMin: 0.3, rMax: 1.2, speedZ: 0.08, color: [150, 180, 255] },  // far
    ];

    const stars = [];

    layers.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
            stars.push({
                x: rand(0, 1),
                y: rand(0, 1),
                r: rand(layer.rMin, layer.rMax),
                speedZ: layer.speedZ,
                color: layer.color,
                twinkle: rand(0, Math.PI * 2),
                twinkleSpeed: rand(0.005, 0.03),
                baseOpacity: rand(0.4, 1),
            });
        }
    });

    // Create a few colored stars
    for (let i = 0; i < 20; i++) {
        const hue = [200, 220, 280, 300, 60][randInt(0, 5)];
        stars.push({
            x: rand(0, 1), y: rand(0, 1),
            r: rand(1.5, 3.5),
            speedZ: rand(0.05, 0.2),
            color: hslToRgb(hue, 80, 80),
            twinkle: rand(0, Math.PI * 2),
            twinkleSpeed: rand(0.01, 0.04),
            baseOpacity: rand(0.5, 1),
        });
    }

    function hslToRgb(h, s, l) {
        s /= 100; l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(f(0)*255), Math.round(f(8)*255), Math.round(f(4)*255)];
    }

    let animFrame;

    function drawStars() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(s => {
            s.twinkle += s.twinkleSpeed;

            // Parallax offset
            const px = s.x * width  + mouseX * s.speedZ * 30;
            const py = s.y * height + mouseY * s.speedZ * 30;

            // Twinkling opacity
            const alpha = s.baseOpacity * (0.6 + 0.4 * Math.sin(s.twinkle));
            const [r, g, b] = s.color;

            // Glow for brighter stars
            if (s.r > 1.5) {
                const grd = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4);
                grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.6})`);
                grd.addColorStop(1, 'transparent');
                ctx.fillStyle = grd;
                ctx.fillRect(px - s.r * 4, py - s.r * 4, s.r * 8, s.r * 8);
            }

            // Star core
            ctx.beginPath();
            ctx.arc(px, py, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fill();
        });

        animFrame = requestAnimationFrame(drawStars);
    }

    drawStars();
    return () => cancelAnimationFrame(animFrame);
}

/* ===================================================
   3. DARK MATTER PARTICLE CANVAS
   Glowing, interconnected particle network
   =================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
    const CONNECTION_DIST = 120;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-0.4, 0.4),
        vy: rand(-0.4, 0.4),
        r: rand(1, 3.5),
        color: [
            [155, 48, 255],   // purple
            [0, 212, 255],    // cyan
            [255, 45, 120],   // pink
        ][randInt(0, 3)],
        opacity: rand(0.3, 0.9),
        pulse: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.01, 0.04),
    }));

    let animFrame;

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        // Update positions
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += p.pulseSpeed;

            if (p.x < 0 || p.x > width)  p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.3;
                    const [r, g, b2] = a.color;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(${r},${g},${b2},${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            const [r, g, b] = p.color;
            const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

            // Glow
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
            grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fillRect(p.x - p.r * 5, p.y - p.r * 5, p.r * 10, p.r * 10);

            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fill();
        });

        animFrame = requestAnimationFrame(drawParticles);
    }

    drawParticles();
    return () => cancelAnimationFrame(animFrame);
}

/* ===================================================
   4. COSMIC EVENTS BACKGROUND CANVAS
   Drifting nebula clouds and sparse stars
   =================================================== */
function initCosmicCanvas() {
    const canvas = document.getElementById('cosmicCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const stardust = Array.from({ length: 120 }, () => ({
        x: rand(0, width), y: rand(0, height),
        r: rand(0.3, 1.5),
        opacity: rand(0.1, 0.6),
        pulse: rand(0, Math.PI * 2),
        speed: rand(0.005, 0.02),
    }));

    let animFrame;
    let t = 0;

    function drawCosmic() {
        ctx.clearRect(0, 0, width, height);
        t += 0.003;

        // Nebula wisps
        const nebulas = [
            { x: 0.2, y: 0.3, color: [255, 107, 53], size: 200 },
            { x: 0.7, y: 0.6, color: [155, 48, 255], size: 250 },
            { x: 0.5, y: 0.2, color: [255, 45, 120], size: 180 },
            { x: 0.1, y: 0.8, color: [0, 212, 255],  size: 160 },
        ];

        nebulas.forEach((n, i) => {
            const x = n.x * width  + Math.sin(t + i) * 20;
            const y = n.y * height + Math.cos(t * 0.7 + i) * 15;
            const sz = n.size + Math.sin(t * 0.5 + i) * 30;

            const grd = ctx.createRadialGradient(x, y, 0, x, y, sz);
            const [r, g, b] = n.color;
            grd.addColorStop(0, `rgba(${r},${g},${b},0.07)`);
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.fillRect(x - sz, y - sz, sz * 2, sz * 2);
        });

        // Stardust
        stardust.forEach(s => {
            s.pulse += s.speed;
            const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.pulse));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
            ctx.fill();
        });

        animFrame = requestAnimationFrame(drawCosmic);
    }

    drawCosmic();
    return () => cancelAnimationFrame(animFrame);
}

/* ===================================================
   5. INTERACTIVE SECTION BACKGROUND CANVAS
   Orbiting stars / galaxy swirl effect
   =================================================== */
function initInteractiveCanvas() {
    const canvas = document.getElementById('interactiveCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const NUM = 100;
    const orbiters = Array.from({ length: NUM }, (_, i) => ({
        angle: (i / NUM) * Math.PI * 2,
        radius: rand(60, Math.min(width, height) * 0.45),
        speed: rand(0.0005, 0.003) * (Math.random() > 0.5 ? 1 : -1),
        r: rand(0.5, 2),
        color: [
            [0, 212, 255],
            [155, 48, 255],
            [255, 215, 0],
            [255, 45, 120],
        ][randInt(0, 4)],
        opacity: rand(0.3, 0.9),
    }));

    let animFrame;

    function drawInteractive() {
        ctx.clearRect(0, 0, width, height);
        const cx = width / 2, cy = height / 2;

        orbiters.forEach(o => {
            o.angle += o.speed;
            const x = cx + Math.cos(o.angle) * o.radius;
            const y = cy + Math.sin(o.angle) * o.radius * 0.4; // Elliptical

            const [r, g, b] = o.color;
            ctx.beginPath();
            ctx.arc(x, y, o.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${o.opacity})`;
            ctx.fill();
        });

        animFrame = requestAnimationFrame(drawInteractive);
    }

    drawInteractive();
    return () => cancelAnimationFrame(animFrame);
}

// Export canvas initializers
window.SpaceCanvases = {
    initLoaderCanvas,
    initStarCanvas,
    initParticleCanvas,
    initCosmicCanvas,
    initInteractiveCanvas,
};
