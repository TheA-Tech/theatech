/* =========================================================
   THEA.TECH MAIN WEBSITE
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (mainNav.classList.contains("open")) {

            icon.className = "fa-solid fa-xmark";

        } else {

            icon.className = "fa-solid fa-bars";

        }

    });


    document.querySelectorAll("#mainNav a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.className = "fa-solid fa-bars";

            }

        });

    });

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");


const sectionObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        threshold: 0.35
    }

);


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealItems = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealItems.forEach(item => {

    revealObserver.observe(item);

});


/* =========================================================
   FORM
   ========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener("submit", () => {

        if (formMessage) {

            formMessage.textContent =
                "Preparing your inquiry...";

        }

    });

}


/* =========================================================
   FORM SUCCESS MESSAGE
   ========================================================= */

const params = new URLSearchParams(
    window.location.search
);


if (params.get("sent") === "1") {

    if (formMessage) {

        formMessage.textContent =
            "Your inquiry was submitted successfully.";

    }

    const contact = document.getElementById("contact");

    if (contact) {

        setTimeout(() => {

            contact.scrollIntoView({
                behavior: "smooth"
            });

        }, 300);

    }

}


/* =========================================================
   PARTICLE SYSTEM
   ========================================================= */

const canvas = document.getElementById("techParticles");


if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    let width = 0;
    let height = 0;

    let mouse = {
        x: null,
        y: null,
        radius: 130
    };


    function resizeCanvas() {

        const pixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

    }


    class Particle {

        constructor() {

            this.reset();

        }


        reset() {

            this.x =
                Math.random() * width;

            this.y =
                Math.random() * height;

            this.size =
                Math.random() * 2.4 + 0.8;

            this.speedX =
                (Math.random() - 0.5) * 0.32;

            this.speedY =
                (Math.random() - 0.5) * 0.32;

            const colors = [
                "8,124,255",
                "0,198,255",
                "124,77,255",
                "55,110,210"
            ];

            this.color =
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ];

            this.alpha =
                Math.random() * 0.38 + 0.14;

        }


        update() {

            this.x += this.speedX;
            this.y += this.speedY;


            if (this.x < -20) {
                this.x = width + 20;
            }

            if (this.x > width + 20) {
                this.x = -20;
            }

            if (this.y < -20) {
                this.y = height + 20;
            }

            if (this.y > height + 20) {
                this.y = -20;
            }


            if (mouse.x !== null) {

                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {

                    const force =
                        (mouse.radius - distance)
                        / mouse.radius;

                    const angle =
                        Math.atan2(dy, dx);

                    this.x +=
                        Math.cos(angle) *
                        force *
                        0.8;

                    this.y +=
                        Math.sin(angle) *
                        force *
                        0.8;

                }

            }

        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(${this.color},${this.alpha})`;

            ctx.shadowBlur = 10;

            ctx.shadowColor =
                `rgba(${this.color},0.35)`;

            ctx.fill();

            ctx.shadowBlur = 0;

        }

    }


    function createParticles() {

        particles = [];

        const density =
            window.innerWidth < 650
                ? 45
                : 85;

        for (let i = 0; i < density; i++) {

            particles.push(
                new Particle()
            );

        }

    }


    function connectParticles() {

        const maxDistance =
            window.innerWidth < 650
                ? 105
                : 130;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < maxDistance) {

                    const opacity =
                        (1 - distance / maxDistance)
                        * 0.13;


                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );


                    ctx.strokeStyle =
                        `rgba(8,124,255,${opacity})`;

                    ctx.lineWidth = .7;

                    ctx.stroke();

                }

            }

        }

    }


    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(particle => {

            particle.update();

            particle.draw();

        });


        connectParticles();


        requestAnimationFrame(
            animateParticles
        );

    }


    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

            createParticles();

        }
    );


    window.addEventListener(
        "mousemove",
        event => {

            mouse.x = event.clientX;
            mouse.y = event.clientY;

        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;
            mouse.y = null;

        }
    );


    resizeCanvas();

    createParticles();

    animateParticles();

}


/* =========================================================
   SMOOTH ANCHOR OFFSET
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerOffset = 85;

            const position =
                target.getBoundingClientRect().top
                + window.scrollY
                - headerOffset;


            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

        }
    );

});
