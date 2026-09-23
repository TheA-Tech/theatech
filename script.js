/* =====================================================
   THEA.TECH
   INTERACTIONS + PARTICLES
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

    });


    document
        .querySelectorAll(".nav-link, .portal-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

            });

        });

}



/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement =
    document.getElementById("currentYear");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {

                        link.classList.add("active");

                    }

                });

            });

        },
        {
            threshold: 0.25
        }
    );


sections.forEach(section => {

    navObserver.observe(section);

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

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


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            if (formMessage) {

                formMessage.textContent =
                    "Sending your inquiry...";

            }

        }
    );

}


/* =====================================================
   FORM SUCCESS MESSAGE
===================================================== */

const params =
    new URLSearchParams(
        window.location.search
    );


if (
    params.get("sent") === "1" &&
    formMessage
) {

    formMessage.textContent =
        "Your inquiry has been submitted successfully.";

}



/* =====================================================
   PARTICLE NETWORK
===================================================== */

function startParticles() {

    let canvas =
        document.getElementById(
            "techParticles"
        );


    /*
       Safety:
       If the canvas is missing from HTML,
       JavaScript creates it automatically.
    */

    if (!canvas) {

        canvas =
            document.createElement("canvas");

        canvas.id =
            "techParticles";

        canvas.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.prepend(canvas);

    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    let width =
        window.innerWidth;

    let height =
        window.innerHeight;


    let mouse = {
        x: null,
        y: null,
        radius: 180
    };


    let particles = [];


    function resize() {

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


        width =
            window.innerWidth;

        height =
            window.innerHeight;


        createParticles();

    }


    function createParticles() {

        particles = [];


        const amount =
            window.innerWidth < 700
                ? 55
                : 110;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                vx:
                    (Math.random() - .5)
                    * (
                        reducedMotion
                            ? .05
                            : .20
                    ),

                vy:
                    (Math.random() - .5)
                    * (
                        reducedMotion
                            ? .05
                            : .20
                    ),

                size:
                    Math.random() *
                    1.6 + .6,

                alpha:
                    Math.random() *
                    .55 + .25

            });

        }

    }


    function drawParticle(particle) {

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
                0,
                217,
                255,
                ${particle.alpha}
            )`;


        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "rgba(0,217,255,.65)";


        ctx.fill();

        ctx.shadowBlur = 0;

    }


    function connectParticles() {

        const distanceLimit =
            window.innerWidth < 700
                ? 105
                : 145;


        for (
            let a = 0;
            a < particles.length;
            a++
        ) {

            for (
                let b = a + 1;
                b < particles.length;
                b++
            ) {

                const dx =
                    particles[a].x -
                    particles[b].x;

                const dy =
                    particles[a].y -
                    particles[b].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    distanceLimit
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            distanceLimit
                        ) * .15;


                    ctx.beginPath();


                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );


                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            0,
                            217,
                            255,
                            ${opacity}
                        )`;


                    ctx.lineWidth = .7;

                    ctx.stroke();

                }

            }

        }

    }


    function connectMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {

            return;

        }


        const limit =
            mouse.radius;


        particles.forEach(particle => {

            const dx =
                particle.x -
                mouse.x;

            const dy =
                particle.y -
                mouse.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < limit) {

                const opacity =
                    (
                        1 -
                        distance /
                        limit
                    ) * .28;


                ctx.beginPath();


                ctx.moveTo(
                    particle.x,
                    particle.y
                );


                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );


                ctx.strokeStyle =
                    `rgba(
                        129,
                        92,
                        255,
                        ${opacity}
                    )`;


                ctx.lineWidth = .8;

                ctx.stroke();

            }

        });

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(particle => {

            if (!reducedMotion) {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

            }


            if (
                particle.x < -10 ||
                particle.x > width + 10
            ) {

                particle.vx *= -1;

            }


            if (
                particle.y < -10 ||
                particle.y > height + 10
            ) {

                particle.vy *= -1;

            }


            drawParticle(particle);

        });


        connectParticles();

        connectMouse();


        if (!reducedMotion) {

            requestAnimationFrame(
                animate
            );

        }

    }


    window.addEventListener(
        "resize",
        resize
    );


    window.addEventListener(
        "mousemove",
        event => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;
            mouse.y = null;

        }
    );


    resize();

    animate();

}


startParticles();
