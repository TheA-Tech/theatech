/* =========================================================
   THEA.TECH — INTERACTIVE EXPERIENCE
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.classList.remove("active");
        });

    });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

}


/* =========================================================
   HERO PARALLAX
   ========================================================= */

const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".hero-visual");

const supportsHover = window.matchMedia(
    "(hover: hover)"
).matches;

if (hero && heroVisual && supportsHover) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

        const rotateY = x * 8;
        const rotateX = y * -8;

        heroVisual.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });

    hero.addEventListener("mouseleave", () => {

        heroVisual.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

    });

}


/* =========================================================
   FULL WEBSITE TECH PARTICLE SYSTEM
   ========================================================= */

const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const particleMouse = {
    x: null,
    y: null,
    radius: 140
};


/* ---------------------------------------------------------
   RESIZE CANVAS
   --------------------------------------------------------- */

function resizeCanvas() {

    if (!canvas || !ctx) return;

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;

    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    createParticles();

}


/* ---------------------------------------------------------
   CREATE PARTICLES
   --------------------------------------------------------- */

function createParticles() {

    if (!canvas || !ctx) return;

    particles = [];

    const area =
        canvasWidth * canvasHeight;

    let amount =
        Math.floor(area / 12500);

    /* Desktop limit */
    amount = Math.min(amount, 110);

    /* Mobile limit */
    if (canvasWidth < 768) {
        amount = Math.min(amount, 45);
    }

    for (let i = 0; i < amount; i++) {

        const isCyan =
            Math.random() > 0.5;

        particles.push({

            x: Math.random() * canvasWidth,

            y: Math.random() * canvasHeight,

            vx:
                (Math.random() - 0.5) *
                0.35,

            vy:
                (Math.random() - 0.5) *
                0.35,

            size:
                Math.random() * 1.8 + 0.6,

            alpha:
                Math.random() * 0.5 + 0.25,

            color:
                isCyan
                    ? "34,211,238"
                    : "96,165,250"

        });

    }

}


/* ---------------------------------------------------------
   DRAW PARTICLES
   --------------------------------------------------------- */

function drawParticles() {

    if (!canvas || !ctx) return;

    ctx.clearRect(
        0,
        0,
        canvasWidth,
        canvasHeight
    );


    /* -----------------------------------------
       PARTICLE CONNECTION LINES
       ----------------------------------------- */

    for (let i = 0; i < particles.length; i++) {

        const particle = particles[i];

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const other = particles[j];

            const dx =
                particle.x -
                other.x;

            const dy =
                particle.y -
                other.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 125) {

                const opacity =
                    (1 - distance / 125) *
                    0.18;

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(96,165,250,${opacity})`;

                ctx.lineWidth = 0.6;

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    other.x,
                    other.y
                );

                ctx.stroke();

            }

        }

    }


    /* -----------------------------------------
       UPDATE + DRAW PARTICLES
       ----------------------------------------- */

    particles.forEach(particle => {

        /* Movement */

        particle.x += particle.vx;
        particle.y += particle.vy;


        /* -----------------------------------------
           SCREEN WRAP
           ----------------------------------------- */

        if (particle.x < -10) {
            particle.x = canvasWidth + 10;
        }

        if (particle.x > canvasWidth + 10) {
            particle.x = -10;
        }

        if (particle.y < -10) {
            particle.y = canvasHeight + 10;
        }

        if (particle.y > canvasHeight + 10) {
            particle.y = -10;
        }


        /* -----------------------------------------
           MOUSE INTERACTION
           ----------------------------------------- */

        if (
            particleMouse.x !== null &&
            particleMouse.y !== null
        ) {

            const dx =
                particle.x -
                particleMouse.x;

            const dy =
                particle.y -
                particleMouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance < particleMouse.radius &&
                distance > 0.001
            ) {

                const force =
                    (particleMouse.radius -
                        distance) /
                    particleMouse.radius;

                particle.x +=
                    (dx / distance) *
                    force *
                    0.7;

                particle.y +=
                    (dy / distance) *
                    force *
                    0.7;

            }

        }


        /* -----------------------------------------
           DRAW PARTICLE
           ----------------------------------------- */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(
                ${particle.color},
                ${particle.alpha}
            )`;

        ctx.fill();

    });


    requestAnimationFrame(drawParticles);

}


/* =========================================================
   PARTICLE MOUSE TRACKING
   ========================================================= */

if (canvas) {

    window.addEventListener(
        "mousemove",
        (event) => {

            particleMouse.x =
                event.clientX;

            particleMouse.y =
                event.clientY;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            particleMouse.x = null;
            particleMouse.y = null;

        }
    );

}


/* =========================================================
   PARTICLE RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   START PARTICLE ENGINE
   ========================================================= */

if (canvas && ctx) {

    resizeCanvas();

    requestAnimationFrame(drawParticles);

}


/* =========================================================
   HERO FLOATING NODES
   ========================================================= */

const floatingNodes =
    document.querySelectorAll(".floating-node");

if (
    floatingNodes.length &&
    supportsHover
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5);

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5);

            floatingNodes.forEach(
                (node, index) => {

                    const speed =
                        (index + 1) * 5;

                    const moveX =
                        x * speed;

                    const moveY =
                        y * speed;

                    node.style.transform =
                        `translate3d(
                            ${moveX}px,
                            ${moveY}px,
                            0
                        )`;

                }
            );

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   CONTACT FORM SUCCESS MESSAGE
   ========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

if (
    urlParams.get("sent") === "1"
) {

    const contactForm =
        document.querySelector(
            ".contact-form"
        );

    if (contactForm) {

        const successMessage =
            document.createElement("div");

        successMessage.className =
            "form-success";

        successMessage.textContent =
            "Your message has been sent successfully.";

        contactForm.prepend(
            successMessage
        );

    }

}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

const siteHeader =
    document.querySelector(
        ".site-header"
    );

function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 30) {

        siteHeader.classList.add(
            "scrolled"
        );

        siteHeader.style.background =
            "rgba(3, 6, 17, 0.91)";

        siteHeader.style.borderBottom =
            "1px solid rgba(96, 165, 250, 0.12)";

    } else {

        siteHeader.classList.remove(
            "scrolled"
        );

        siteHeader.style.background = "";

        siteHeader.style.borderBottom = "";

    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


/* =========================================================
   HERO WORD ROTATION
   ========================================================= */

const heroWords =
    document.querySelectorAll(
        ".hero-word"
    );

if (heroWords.length > 1) {

    let currentWord = 0;

    setInterval(() => {

        heroWords[
            currentWord
        ].classList.remove("active");

        currentWord =
            (currentWord + 1) %
            heroWords.length;

        heroWords[
            currentWord
        ].classList.add("active");

    }, 2600);

}


/* =========================================================
   THEA.TECH READY
   ========================================================= */

console.log(
    "THEA.TECH Interactive Experience loaded."
);
