/* =========================================================
   THEA.TECH
   INTERACTIONS + PARTICLES
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle("open");

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove("open");

                }
            );

        });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(element);

    }
);


/* =========================================================
   CONTACT FORM MESSAGE
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm && formMessage) {

    contactForm.addEventListener(
        "submit",
        () => {

            formMessage.textContent =
                "Sending your inquiry...";

        }
    );

}


/* =========================================================
   SENT MESSAGE
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


if (params.get("sent") === "1") {

    const message =
        document.getElementById(
            "formMessage"
        );

    if (message) {

        message.textContent =
            "Your inquiry has been submitted successfully.";

    }

}


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const canvas =
    document.getElementById(
        "techParticles"
    );


if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let particles = [];

    let width = 0;
    let height = 0;


    function resizeCanvas() {

        width =
            canvas.width =
            window.innerWidth *
            window.devicePixelRatio;

        height =
            canvas.height =
            window.innerHeight *
            window.devicePixelRatio;

        canvas.style.width =
            window.innerWidth + "px";

        canvas.style.height =
            window.innerHeight + "px";

        ctx.setTransform(
            window.devicePixelRatio,
            0,
            0,
            window.devicePixelRatio,
            0,
            0
        );

        createParticles();

    }


    function createParticles() {

        particles = [];

        const amount =
            Math.min(
                115,
                Math.floor(
                    window.innerWidth / 11
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                vx:
                    (Math.random() - .5) *
                    .25,

                vy:
                    (Math.random() - .5) *
                    .25,

                size:
                    Math.random() *
                    1.7 +
                    .5,

                alpha:
                    Math.random() *
                    .45 +
                    .15

            });

        }

    }


    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const p =
                particles[i];


            p.x += p.vx;
            p.y += p.vy;


            if (
                p.x < -20 ||
                p.x >
                window.innerWidth + 20
            ) {

                p.vx *= -1;

            }


            if (
                p.y < -20 ||
                p.y >
                window.innerHeight + 20
            ) {

                p.vy *= -1;

            }


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(36,124,255,${p.alpha})`;

            ctx.fill();


            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const q =
                    particles[j];


                const dx =
                    p.x - q.x;

                const dy =
                    p.y - q.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 125) {

                    const opacity =
                        (1 -
                            distance / 125) *
                        .08;


                    ctx.beginPath();

                    ctx.moveTo(
                        p.x,
                        p.y
                    );

                    ctx.lineTo(
                        q.x,
                        q.y
                    );

                    ctx.strokeStyle =
                        `rgba(139,92,246,${opacity})`;

                    ctx.lineWidth = .7;

                    ctx.stroke();

                }

            }

        }


        requestAnimationFrame(
            drawParticles
        );

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    resizeCanvas();

    drawParticles();

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(
        ".site-header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 30) {

            header.style.boxShadow =
                "0 10px 35px rgba(16,24,40,.08)";

        } else {

            header.style.boxShadow =
                "none";

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".main-nav a[href^='#']"
    );


const activeObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(
                        link => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                "#" +
                                entry.target.id
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                }

            });

        },
        {
            rootMargin:
                "-30% 0px -60% 0px"
        }
    );


sections.forEach(
    section => {

        activeObserver.observe(
            section
        );

    }
);


/* =========================================================
   3D CARD MOUSE EFFECT
========================================================= */

const systemCard =
    document.querySelector(
        ".system-card"
    );


if (
    systemCard &&
    window.innerWidth > 850
) {

    systemCard.addEventListener(
        "mousemove",
        event => {

            const rect =
                systemCard.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - .5) *
                8;

            const rotateX =
                ((y / rect.height) - .5) *
                -8;


            systemCard.style.transform =
                `perspective(1000px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)
                 translateY(-5px)`;

        }
    );


    systemCard.addEventListener(
        "mouseleave",
        () => {

            systemCard.style.transform =
                "perspective(1000px) rotateY(-7deg) rotateX(4deg)";

        }
    );

}
