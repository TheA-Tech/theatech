/* =========================================================
   THEA.TECH
   Website JavaScript
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =========================================
           MOBILE MENU
        ========================================== */

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const mainNav =
            document.getElementById(
                "mainNav"
            );


        if (
            menuToggle &&
            mainNav
        ) {

            menuToggle.addEventListener(
                "click",
                function () {

                    const isOpen =
                        mainNav.classList.toggle(
                            "active"
                        );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        isOpen
                    );

                }
            );


            const navLinks =
                mainNav.querySelectorAll(
                    "a"
                );


            navLinks.forEach(
                function (link) {

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

                }
            );

        }



        /* =========================================
           CURRENT YEAR
        ========================================== */

        const year =
            document.getElementById(
                "currentYear"
            );


        if (year) {

            year.textContent =
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
            function (element) {

                element.classList.add(
                    "reveal"
                );

            }
        );


        if (
            "IntersectionObserver"
            in window
        ) {

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
                        threshold: 0.12
                    }
                );


            revealItems.forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            revealItems.forEach(
                function (element) {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }



        /* =========================================
           FORM SUCCESS MESSAGE
        ========================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );


        if (
            params.get("sent") === "1"
        ) {

            const note =
                document.createElement(
                    "div"
                );


            note.className =
                "success-notification";


            note.textContent =
                "Your message has been sent successfully.";


            document.body.appendChild(
                note
            );


            setTimeout(
                function () {

                    note.classList.add(
                        "hide"
                    );

                    setTimeout(
                        function () {

                            note.remove();

                        },
                        400
                    );

                },
                4500
            );

        }



        /* =========================================
           PARTICLE SYSTEM
        ========================================== */

        createParticles();

    }
);



/* =========================================================
   PARTICLE SYSTEM
   ========================================================= */

function createParticles() {


    const canvas =
        document.getElementById(
            "techParticles"
        );


    if (!canvas) {
        return;
    }


    const context =
        canvas.getContext("2d");


    if (!context) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;
    }


    let width =
        window.innerWidth;


    let height =
        window.innerHeight;


    let particles = [];


    const mouse = {

        x: null,

        y: null,

        radius: 130

    };



    /* =========================================
       RESIZE
    ========================================== */

    function resize() {

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


        context.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        generateParticles();

    }



    /* =========================================
       CREATE PARTICLES
    ========================================== */

    function generateParticles() {

        particles = [];


        const count =
            width < 600
                ? 45
                : 85;


        for (
            let i = 0;
            i < count;
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
                    * 1.5
                    + .5,

                speedX:
                    (
                        Math.random()
                        - .5
                    ) * .25,

                speedY:
                    (
                        Math.random()
                        - .5
                    ) * .25,

                opacity:
                    Math.random()
                    * .45
                    + .15

            });

        }

    }



    /* =========================================
       DRAW
    ========================================== */

    function draw() {


        context.clearRect(
            0,
            0,
            width,
            height
        );


        /* DOTS */

        particles.forEach(
            function (particle) {


                particle.x +=
                    particle.speedX;


                particle.y +=
                    particle.speedY;


                /* WRAP */

                if (
                    particle.x < -10
                ) {

                    particle.x =
                        width + 10;

                }


                if (
                    particle.x >
                    width + 10
                ) {

                    particle.x = -10;

                }


                if (
                    particle.y < -10
                ) {

                    particle.y =
                        height + 10;

                }


                if (
                    particle.y >
                    height + 10
                ) {

                    particle.y = -10;

                }


                /* MOUSE */

                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {

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
                        distance <
                        mouse.radius
                    ) {

                        const force =
                            (
                                mouse.radius -
                                distance
                            ) /
                            mouse.radius;


                        particle.x +=
                            dx *
                            force *
                            .006;


                        particle.y +=
                            dy *
                            force *
                            .006;

                    }

                }


                /* DRAW DOT */

                context.beginPath();


                context.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );


                context.fillStyle =
                    "rgba(95,180,255," +
                    particle.opacity +
                    ")";


                context.fill();

            }
        );



        /* CONNECTIONS */

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


                const first =
                    particles[i];


                const second =
                    particles[j];


                const dx =
                    first.x -
                    second.x;


                const dy =
                    first.y -
                    second.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 115
                ) {


                    const opacity =
                        (
                            1 -
                            distance / 115
                        ) * .13;


                    context.beginPath();


                    context.moveTo(
                        first.x,
                        first.y
                    );


                    context.lineTo(
                        second.x,
                        second.y
                    );


                    context.strokeStyle =
                        "rgba(75,155,220," +
                        opacity +
                        ")";


                    context.lineWidth =
                        .6;


                    context.stroke();

                }

            }

        }


        requestAnimationFrame(
            draw
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
       WINDOW RESIZE
    ========================================== */

    window.addEventListener(
        "resize",
        resize
    );


    /* START */

    resize();

    draw();

}
