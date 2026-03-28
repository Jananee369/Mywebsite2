/* =====================================================
   MYSTERIES OF SPACE — Main JavaScript
   Handles: loader, cursor, scroll, nav, interactivity,
            quiz, did-you-know, animations, music toggle
   ===================================================== */

'use strict';

/* ===================================================
   DATA — Space Facts for "Did You Know?" section
   =================================================== */
const SPACE_FACTS = [
    {
        icon: '🌌',
        text: 'The observable universe is about 93 billion light-years in diameter — but the actual universe could be infinitely larger!',
        category: 'Cosmology'
    },
    {
        icon: '⚫',
        text: 'The supermassive black hole at the center of the Milky Way, called Sagittarius A*, has a mass of about 4 million suns — yet it fits within the orbit of Mercury!',
        category: 'Black Holes'
    },
    {
        icon: '☀️',
        text: 'The Sun converts 4 million tonnes of matter into energy every single second. It has been doing this for 4.6 billion years and will continue for another 5 billion.',
        category: 'Stars'
    },
    {
        icon: '🧊',
        text: 'There is a water vapor cloud in space with 140 trillion times the amount of water in Earth\'s oceans. It surrounds a quasar 12 billion light-years away!',
        category: 'Cosmic Wonders'
    },
    {
        icon: '💨',
        text: 'One day on Venus lasts longer than one year on Venus — its rotation is so slow that the planet completes an orbit around the Sun before making a full rotation!',
        category: 'Planets'
    },
    {
        icon: '🕳️',
        text: 'If you could somehow put a black hole the mass of the Moon near Earth, it would be about as wide as a pea. But its gravity would be so intense, it would devour our planet!',
        category: 'Black Holes'
    },
    {
        icon: '🌡️',
        text: 'The surface temperature of Neutron Stars can reach 600,000 Kelvin — while their core can exceed 6 × 10^11 Kelvin. They are the densest objects that aren\'t black holes.',
        category: 'Neutron Stars'
    },
    {
        icon: '🌍',
        text: 'Earth\'s magnetic poles have reversed hundreds of times over geological history. The last reversal happened 780,000 years ago. We\'re overdue!',
        category: 'Earth & Space'
    },
    {
        icon: '👾',
        text: 'There are more atoms in a single grain of sand than there are stars in the observable universe. Yet there are more stars than all the grains on Earth\'s beaches!',
        category: 'Mind-Benders'
    },
    {
        icon: '⚡',
        text: 'A magnetar (a type of neutron star) has a magnetic field so powerful that it would erase your credit cards from 100,000 miles away. At 1,000 km it would rip the iron from your blood!',
        category: 'Extreme Physics'
    },
    {
        icon: '🌠',
        text: 'Every second, roughly 275 million stars are born and roughly the same number die throughout the observable universe. Right now, as you read this, it\'s happening.',
        category: 'Stars'
    },
    {
        icon: '🔭',
        text: 'When we look at the Andromeda Galaxy, 2.5 million light-years away, we\'re seeing it as it looked when our earliest ancestors were learning to walk upright.',
        category: 'Light & Time'
    },
    {
        icon: '🌀',
        text: 'The Milky Way galaxy is moving through space at 600 km/s relative to the Cosmic Microwave Background — the afterglow of the Big Bang.',
        category: 'Galaxies'
    },
    {
        icon: '🪐',
        text: 'Saturn\'s rings are mostly water ice and are incredibly thin — only about 10 to 100 meters thick. Yet they span up to 282,000 km in diameter!',
        category: 'Planets'
    },
    {
        icon: '💥',
        text: 'A gamma-ray burst lasting 2 seconds releases more energy than our Sun will produce in its entire 10-billion-year lifetime. They are the universe\'s brightest explosions.',
        category: 'Cosmic Events'
    },
    {
        icon: '🔬',
        text: 'Only 5% of the universe is made of the normal matter we can see and touch. 95% is invisible dark matter and dark energy — complete mysteries to science.',
        category: 'Dark Universe'
    },
    {
        icon: '⏰',
        text: 'GPS satellites must correct for Einstein\'s relativity effects. Clocks in orbit run about 38 microseconds faster per day due to weaker gravity and orbital speed.',
        category: 'Relativity'
    },
    {
        icon: '🎵',
        text: 'Scientists discovered that the black hole in Perseus galaxy cluster produces sound waves — a B-flat note, 57 octaves below middle C. It is the deepest note ever detected.',
        category: 'Cosmic Sounds'
    },
    {
        icon: '🧲',
        text: 'Space is not completely empty. Every cubic meter of space contains about 6 atoms on average — mostly hydrogen left over from the Big Bang.',
        category: 'Space Physics'
    },
    {
        icon: '🌕',
        text: 'The Moon is slowly drifting away from Earth at about 3.8 cm per year — roughly the speed at which your fingernails grow. In a billion years, total solar eclipses will no longer be possible!',
        category: 'Moon'
    }
];

/* ===================================================
   QUIZ DATA
   =================================================== */
const QUIZ_QUESTIONS = [
    {
        question: 'Which planet has the most moons in our solar system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correct: 1,
        explanation: 'Saturn has 146 confirmed moons — the most of any planet!'
    },
    {
        question: 'How long does it take light from the Sun to reach Earth?',
        options: ['1 minute', '8 minutes', '30 minutes', '1 hour'],
        correct: 1,
        explanation: 'Sunlight travels 149.6 million km to reach us in about 8 minutes and 20 seconds.'
    },
    {
        question: 'What is the closest galaxy to the Milky Way?',
        options: ['Triangulum Galaxy', 'Large Magellanic Cloud', 'Andromeda Galaxy', 'Canis Major Dwarf'],
        correct: 3,
        explanation: 'The Canis Major Dwarf Galaxy at ~25,000 light-years is the closest galaxy to Earth.'
    },
    {
        question: 'What percentage of the universe is normal (visible) matter?',
        options: ['27%', '68%', '5%', '15%'],
        correct: 2,
        explanation: 'Only ~5% of the universe is normal matter. Dark energy is 68% and dark matter is 27%.'
    },
    {
        question: 'Which space telescope captured the first image of a black hole?',
        options: ['Hubble', 'James Webb', 'Event Horizon Telescope', 'Chandra'],
        correct: 2,
        explanation: 'The Event Horizon Telescope captured M87*\'s first image in 2019!'
    },
    {
        question: 'What is the name of the black hole at the center of our Milky Way?',
        options: ['Cygnus X-1', 'M87*', 'Sagittarius A*', 'TON 618'],
        correct: 2,
        explanation: 'Sagittarius A* is the supermassive black hole at the Milky Way\'s center, ~4 million solar masses.'
    },
    {
        question: 'What force is responsible for the accelerating expansion of the universe?',
        options: ['Dark Matter', 'Gravity', 'Dark Energy', 'Electromagnetic Force'],
        correct: 2,
        explanation: 'Dark Energy, making up ~68% of the universe, is driving its accelerating expansion.'
    },
    {
        question: 'How many Earth years does one year on Neptune last?',
        options: ['84 years', '165 years', '248 years', '12 years'],
        correct: 1,
        explanation: 'Neptune takes about 165 Earth years to orbit the Sun. Pluto takes 248!'
    },
];

/* ===================================================
   INITIALIZATION — Wait for DOM ready
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initParallax();
    initScrollAnimations();
    initHeroCounters();
    initFlipCards();
    initDidYouKnow();
    initQuiz();
    initMusicToggle();
    initBackToTop();

    // Canvas initializations
    if (window.SpaceCanvases) {
        SpaceCanvases.initStarCanvas();
        SpaceCanvases.initParticleCanvas();
        SpaceCanvases.initCosmicCanvas();
        SpaceCanvases.initInteractiveCanvas();
    }
});

/* ===================================================
   LOADER
   =================================================== */
function initLoader() {
    const loader    = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');
    if (!loader || !loaderBar) return;

    // Init loader canvas
    let cleanupLoader;
    if (window.SpaceCanvases) {
        cleanupLoader = SpaceCanvases.initLoaderCanvas();
    }

    let progress = 0;
    const interval = setInterval(() => {
        // Accelerate loading: slow start, fast end
        const increment = progress < 70 ? rand(1, 4) : rand(3, 8);
        progress = Math.min(progress + increment, 100);
        loaderBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                if (cleanupLoader) cleanupLoader();

                // Trigger hero animations
                document.querySelectorAll('#hero [data-animate]').forEach(el => {
                    el.classList.add('animated');
                });
            }, 400);
        }
    }, 60);

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden';
}

/* ===================================================
   CUSTOM CURSOR
   =================================================== */
function initCustomCursor() {
    const glow = document.getElementById('cursorGlow');
    const dot  = document.getElementById('cursorDot');
    if (!glow || !dot) return;

    // Skip on touch devices
    if ('ontouchstart' in window) {
        glow.style.display = 'none';
        dot.style.display  = 'none';
        return;
    }

    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', e => {
        targetX = e.clientX;
        targetY = e.clientY;

        // Dot follows immediately
        dot.style.left = e.clientX + 'px';
        dot.style.top  = e.clientY + 'px';
    });

    // Glow follows with smooth lag
    function animateCursor() {
        glowX += (targetX - glowX) * 0.12;
        glowY += (targetY - glowY) * 0.12;
        glow.style.left = glowX + 'px';
        glow.style.top  = glowY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale up cursor on interactive elements
    const interactiveEls = document.querySelectorAll(
        'a, button, .flip-card, .planet-card, .event-card, .quiz-opt, .back-to-top'
    );

    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            glow.style.width  = '70px';
            glow.style.height = '70px';
            glow.style.background = 'radial-gradient(circle, rgba(155,48,255,0.5) 0%, transparent 70%)';
        });
        el.addEventListener('mouseleave', () => {
            glow.style.width  = '40px';
            glow.style.height = '40px';
            glow.style.background = 'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)';
        });
    });
}

/* ===================================================
   SCROLL PROGRESS BAR
   =================================================== */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

/* ===================================================
   NAVBAR — Scroll effect + hamburger toggle
   =================================================== */
function initNavbar() {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!navbar) return;

    // Scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Hamburger
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        sections.forEach(s => {
            const top    = s.offsetTop;
            const bottom = top + s.offsetHeight;
            const link = navbar.querySelector(`a[href="#${s.id}"]`);
            if (link) {
                link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
            }
        });
    }, { passive: true });
}

/* ===================================================
   PARALLAX SCROLLING
   =================================================== */
function initParallax() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxBgs.forEach(bg => {
            const section = bg.closest('section');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;
            const offset = (rect.top / window.innerHeight) * 40;
            bg.style.transform = `translateY(${offset}px)`;
        });
    }, { passive: true });
}

/* ===================================================
   SCROLL ANIMATIONS — Intersection Observer
   =================================================== */
function initScrollAnimations() {
    const animElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || '0');
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    animElements.forEach(el => observer.observe(el));
}

/* ===================================================
   HERO COUNTERS — Animated number count-up
   =================================================== */
function initHeroCounters() {
    const counters = document.querySelectorAll('.stat-num[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el    = entry.target;
            const target = parseInt(el.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target).toLocaleString();
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* ===================================================
   FLIP CARDS — Click to flip on mobile
   =================================================== */
function initFlipCards() {
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

/* ===================================================
   DID YOU KNOW? — Random fact generator
   =================================================== */
function initDidYouKnow() {
    const dykBtn      = document.getElementById('dykBtn');
    const dykCard     = document.getElementById('dykCard');
    const dykText     = document.getElementById('dykText');
    const dykIcon     = document.getElementById('dykIcon');
    const dykCategory = document.getElementById('dykCategory');
    const dykNumber   = document.getElementById('dykNumber');
    const dykCurrent  = document.getElementById('dykCurrent');
    const dykTotal    = document.getElementById('dykTotal');
    if (!dykBtn) return;

    dykTotal.textContent = SPACE_FACTS.length;

    let currentIdx = 0;
    let seenIndices = new Set([0]);

    function getNextIdx() {
        if (seenIndices.size >= SPACE_FACTS.length) seenIndices.clear();
        let idx;
        do { idx = Math.floor(Math.random() * SPACE_FACTS.length); }
        while (seenIndices.has(idx));
        seenIndices.add(idx);
        return idx;
    }

    function showFact(idx) {
        const fact = SPACE_FACTS[idx];

        // Animate card out
        dykCard.classList.add('changing');

        setTimeout(() => {
            dykText.textContent     = fact.text;
            dykIcon.textContent     = fact.icon;
            dykCategory.textContent = fact.category;
            dykNumber.textContent   = String(seenIndices.size).padStart(2, '0');
            dykCurrent.textContent  = seenIndices.size;

            // Animate card in
            dykCard.classList.remove('changing');
        }, 300);
    }

    dykBtn.addEventListener('click', () => {
        currentIdx = getNextIdx();
        showFact(currentIdx);

        // Button pulse effect
        dykBtn.style.transform = 'scale(0.96)';
        setTimeout(() => dykBtn.style.transform = '', 150);
    });

    // Keyboard shortcut: press Space to get new fact (when focused)
    dykBtn.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            dykBtn.click();
        }
    });
}

/* ===================================================
   SPACE QUIZ
   =================================================== */
function initQuiz() {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions  = document.getElementById('quizOptions');
    const quizResult   = document.getElementById('quizResult');
    const nextQuizBtn  = document.getElementById('nextQuizBtn');
    const quizScore    = document.getElementById('quizScore');
    const quizTotal    = document.getElementById('quizTotal');
    if (!quizQuestion) return;

    let currentQ = 0;
    let score = 0;
    let totalAnswered = 0;
    let answered = false;

    // Shuffle questions
    const questions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);

    function loadQuestion(idx) {
        if (idx >= questions.length) {
            // Reset
            currentQ = 0;
            questions.sort(() => Math.random() - 0.5);
            score = 0;
            totalAnswered = 0;
            quizScore.textContent = 0;
            quizTotal.textContent = 0;
            loadQuestion(0);
            return;
        }

        const q = questions[idx];
        answered = false;
        quizResult.textContent = '';
        quizResult.style.color = '';
        nextQuizBtn.style.display = 'none';

        quizQuestion.textContent = q.question;

        quizOptions.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt';
            btn.textContent = opt;
            btn.dataset.answer = (i === q.correct).toString();

            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;
                totalAnswered++;

                const isCorrect = i === q.correct;

                // Reveal all answers
                quizOptions.querySelectorAll('.quiz-opt').forEach((b, bi) => {
                    b.disabled = true;
                    if (bi === q.correct) {
                        b.classList.add('correct');
                    } else if (bi === i && !isCorrect) {
                        b.classList.add('wrong');
                    }
                });

                if (isCorrect) {
                    score++;
                    quizResult.textContent = '✅ Correct! ' + q.explanation;
                    quizResult.style.color = 'var(--neon-green)';
                } else {
                    quizResult.textContent = '❌ Not quite! ' + q.explanation;
                    quizResult.style.color = 'var(--neon-pink)';
                }

                quizScore.textContent = score;
                quizTotal.textContent = totalAnswered;
                nextQuizBtn.style.display = 'inline-flex';
            });

            quizOptions.appendChild(btn);
        });
    }

    nextQuizBtn.addEventListener('click', () => {
        currentQ++;
        loadQuestion(currentQ % questions.length);
    });

    loadQuestion(0);
}

/* ===================================================
   MUSIC TOGGLE
   =================================================== */
function initMusicToggle() {
    const btn   = document.getElementById('musicToggle');
    const icon  = document.getElementById('musicIcon');
    const audio = document.getElementById('bgMusic');
    if (!btn || !audio) return;

    let playing = false;

    // Set low volume for ambient
    audio.volume = 0.25;

    btn.addEventListener('click', () => {
        if (playing) {
            audio.pause();
            playing = false;
            icon.className = 'fas fa-music';
            btn.classList.remove('playing');
            btn.title = 'Play Space Ambient Music';
        } else {
            // Try to play — browser may block without user interaction first
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    playing = true;
                    icon.className = 'fas fa-pause';
                    btn.classList.add('playing');
                    btn.title = 'Pause Music';
                }).catch(() => {
                    // Playback prevented — show visual feedback
                    showToast('🎵 Music unavailable in this browser environment');
                });
            }
        }
    });

    audio.addEventListener('ended', () => {
        playing = false;
        icon.className = 'fas fa-music';
        btn.classList.remove('playing');
    });
}

/* ===================================================
   BACK TO TOP
   =================================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===================================================
   TOAST NOTIFICATION
   =================================================== */
function showToast(message, duration = 3000) {
    const existing = document.querySelector('.space-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'space-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(10,15,35,0.95);
        color: var(--text-primary, #e8f0ff);
        border: 1px solid rgba(0,212,255,0.3);
        border-radius: 50px;
        padding: 12px 24px;
        font-family: 'Exo 2', sans-serif;
        font-size: 0.9rem;
        z-index: 99998;
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

/* ===================================================
   PLANET CARDS — 3D Tilt Effect
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    if (window.matchMedia('(hover: hover)').matches) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
                const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -20;
                card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
});

/* ===================================================
   SMOOTH SECTION REVEALS — on initial load
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Ensure hero section elements animate nicely on first load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.15}s`;
        });
    }, 200);
});

/* ===================================================
   NAV LINK HOVER — Active state via CSS variable
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.setProperty('--glow', '1');
        });
        link.addEventListener('mouseleave', () => {
            link.style.removeProperty('--glow');
        });
    });
});

/* ===================================================
   STAGGER ANIMATION for fact-cards & event-cards
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Fact cards within BH section
    const factCards = document.querySelectorAll('.fact-card');
    factCards.forEach((card, i) => {
        card.dataset.delay = String(i * 100);
    });

    // Flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach((card, i) => {
        card.dataset.delay = String(i * 80);
    });

    // Planet cards
    const planetCards = document.querySelectorAll('.planet-card');
    planetCards.forEach((card, i) => {
        card.dataset.delay = String(i * 100);
    });
});

/* ===================================================
   KEYBOARD NAVIGATION ENHANCEMENTS
   =================================================== */
document.addEventListener('keydown', e => {
    // Escape closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navLinks  = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    }
});

/* ===================================================
   PERFORMANCE: Pause canvas animations when tab hidden
   =================================================== */
document.addEventListener('visibilitychange', () => {
    const audio = document.getElementById('bgMusic');
    if (document.hidden && audio && !audio.paused) {
        audio.pause();
        const btn  = document.getElementById('musicToggle');
        const icon = document.getElementById('musicIcon');
        if (btn && icon) {
            btn.classList.remove('playing');
            icon.className = 'fas fa-music';
        }
    }
});

console.log('%c🌌 Mysteries of Space', 'font-size:18px;color:#00d4ff;font-weight:bold;text-shadow:0 0 10px #00d4ff;');
console.log('%cExploring the cosmos, one pixel at a time.', 'font-size:12px;color:#8899cc;');
