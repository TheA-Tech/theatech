/* =========================================================
   THEA.TECH — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =========================================
           MOBILE MENU
        ========================================== */

        const menuToggle =
            document.getElementById("menuToggle");

        const mainNav =
            document.getElementById("mainNav");


        if (menuToggle && mainNav) {

            menuToggle.addEventListener(
                "click",
                function () {

                    const opened =
                        mainNav.classList.toggle("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        opened
                    );

                }
            );


            mainNav
                .querySelectorAll("a")
                .forEach(function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            mainNav.classList.remove(
                                "active"
                            );

                            menuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }
                    );

                });

        }


        /* =========================================
           YEAR
        ========================================== */

        const currentYear =
            document.getElementById(
                "currentYear"
            );

        if (currentYear) {

            currentYear.textContent =
                new Date().getFullYear();

        }


        /* =========================================
           SCROLL REVEAL
        ========================================== */

        const revealItems =
            document.querySelectorAll(
                ".service-card, " +
                ".project-card, " +
                ".process-card, " +
                ".about-content, " +
                ".about-panel, " +
                ".contact-card, " +
                ".contact-form, " +
                ".section-heading"
            );


        revealItems.forEach(
            function (item) {

                item.classList.add(
                    "reveal"
                );

            }
        );


        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.10
                    }
                );


            revealItems.forEach(
                function (item) {

                    observer.observe(item);

                }
            );

        } else {

            revealItems.forEach(
                function (item) {

                    item.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =========================================
           FORM SUCCESS
        ========================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );


        if (
            params.get("sent") === "1"
        ) {

            const message =
                document.createElement("div");


            message.className =
                "success-notification";


            message.textContent =
                "Your message has been sent successfully.";


            document.body.appendChild(
                message
            );


            setTimeout(
                function () {

                    message.classList.add(
                        "hide"
                    );


                    setTimeout(
                        function () {

                            message.remove();

                        },
                        400
                    );

                },
                4500
            );

        }


        /* =========================================
           START PARTICLES
        ========================================== */

        startParticles();

    }
);


/* =========================================================
   PREMIUM TECH PARTICLES
   ========================================================= */

function startParticles() {

    const canvas =
        document.getElementById(
            "techParticles"
        );


    if (!canvas) {
        return;
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


    if (reducedMotion) {
        return;
    }


    let width =
        window.innerWidth;

    let height =
        window.innerHeight;


    let particles = [];


    const mouse = {
        x: null,
        y: null
    };


    /* =========================================
       RESIZE
    ========================================== */

    function resizeCanvas() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;


        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;


        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        createParticles();

    }


    /* =========================================
       CREATE
    ========================================== */

    function createParticles() {

        particles = [];


        const amount =
            width < 600
                ? 65
                : 125;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random()
                    * width,

                y:
                    Math.random()
                    * height,

                radius:
                    Math.random()
                    * 2
                    + 1,

                vx:
                    (
                        Math.random()
                        - 0.5
                    ) * 0.42,

                vy:
                    (
                        Math.random()
                        - 0.5
                    ) * 0.42,

                alpha:
                    Math.random()
                    * 0.45
                    + 0.35

            });

        }

    }


    /* =========================================
       DRAW
    ========================================== */

    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* -------------------------------------
           PARTICLES
        -------------------------------------- */

        particles.forEach(
            function (particle) {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;


                /* LOOP AROUND */

                if (
                    particle.x < -20
                ) {

                    particle.x =
                        width + 20;

                }

                if (
                    particle.x >
                    width + 20
                ) {

                    particle.x = -20;

                }

                if (
                    particle.y < -20
                ) {

                    particle.y =
                        height + 20;

                }

                if (
                    particle.y >
                    height + 20
                ) {

                    particle.y = -20;

                }


                /* GLOW */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.radius * 4,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(0,140,255,0.08)";

                ctx.fill();


                /* MAIN DOT */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(0,105,220," +
                    particle.alpha +
                    ")";

                ctx.fill();

            }
        );


        /* -------------------------------------
           CONNECTION LINES
        -------------------------------------- */

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

                const a =
                    particles[i];

                const b =
                    particles[j];


                const dx =
                    a.x - b.x;

                const dy =
                    a.y - b.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 145
                ) {

                    const opacity =
                        (
                            1 -
                            distance / 145
                        ) * 0.30;


                    ctx.beginPath();

                    ctx.moveTo(
                        a.x,
                        a.y
                    );

                    ctx.lineTo(
                        b.x,
                        b.y
                    );


                    ctx.strokeStyle =
                        "rgba(8,105,217," +
                        opacity +
                        ")";


                    ctx.lineWidth =
                        0.8;


                    ctx.stroke();

                }

            }

        }


        /* -------------------------------------
           MOUSE CONNECTION
        -------------------------------------- */

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            particles.forEach(
                function (particle) {

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


                    if (
                        distance < 170
                    ) {

                        const opacity =
                            (
                                1 -
                                distance / 170
                            ) * 0.45;


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
                            "rgba(0,140,255," +
                            opacity +
                            ")";


                        ctx.lineWidth =
                            1;


                        ctx.stroke();

                    }

                }
            );

        }


        requestAnimationFrame(
            drawParticles
        );

    }


    /* =========================================
       MOUSE
    ========================================== */

    window.addEventListener(
        "mousemove",
        function (event) {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        }
    );


    window.addEventListener(
        "mouseleave",
        function () {

            mouse.x = null;

            mouse.y = null;

        }
    );


    /* =========================================
       RESIZE
    ========================================== */

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* START */

    resizeCanvas();

    drawParticles();

}
