/* =========================================================
   THEA.TECH
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNav =
        document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener(
            "click",
            function () {

                mainNav.classList.toggle("active");

                const expanded =
                    mainNav.classList.contains("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    expanded
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


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".project-card, " +
            ".process-card, " +
            ".about-text, " +
            ".about-panel, " +
            ".contact-item, " +
            ".contact-form, " +
            ".section-heading"
        );

    revealElements.forEach(function (element) {

        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(function (element) {

            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");
        });
    }


    /* =====================================================
       FORM SUCCESS MESSAGE
       ===================================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    if (
        urlParams.get("sent") === "1"
    ) {

        const message =
            document.createElement("div");

        message.textContent =
            "Your message has been sent successfully.";

        message.style.position = "fixed";
        message.style.right = "20px";
        message.style.bottom = "20px";
        message.style.zIndex = "9999";
        message.style.padding = "14px 18px";
        message.style.border =
            "1px solid rgba(22,140,255,.4)";
        message.style.borderRadius = "10px";
        message.style.background =
            "rgba(5,18,32,.95)";
        message.style.color = "#dce9f5";
        message.style.boxShadow =
            "0 15px 40px rgba(0,0,0,.35)";

        document.body.appendChild(message);

        setTimeout(function () {

            message.remove();

        }, 5000);
    }


    /* =====================================================
       TECH PARTICLES
       ===================================================== */

    createTechParticles();

});


/* =========================================================
   TECH PARTICLE ENGINE
   ========================================================= */

function createTechParticles() {

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    let canvas =
        document.getElementById(
            "techParticles"
        );


    if (!canvas) {

        canvas =
            document.createElement("canvas");

        canvas.id =
            "techParticles";

        document.body.prepend(canvas);
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
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

        radius: 140
    };


    function resizeCanvas() {

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            width * pixelRatio;

        canvas.height =
            height * pixelRatio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );


        createParticles();
    }


    function createParticles() {

        particles = [];

        const area =
            width * height;

        const count =
            Math.min(
                115,
                Math.max(
                    40,
                    Math.floor(
                        area / 15000
                    )
                )
            );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            particles.push({

                x:
                    Math.random() * width,

                y:
                    Math.random() * height,

                size:
                    Math.random() * 1.8 + 0.5,

                speedX:
                    (Math.random() - 0.5)
                    * 0.28,

                speedY:
                    (Math.random() - 0.5)
                    * 0.28,

                opacity:
                    Math.random() * 0.45
                    + 0.18
            });
        }
    }


    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* PARTICLES */

        particles.forEach(
            function (particle) {

                particle.x +=
                    particle.speedX;

                particle.y +=
                    particle.speedY;


                /* SCREEN WRAP */

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


                /* MOUSE INTERACTION */

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
                            0.008;

                        particle.y +=
                            dy *
                            force *
                            0.008;
                    }
                }


                /* DOT */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(115,190,255," +
                    particle.opacity +
                    ")";

                ctx.fill();
            }
        );


        /* CONNECTION LINES */

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
                    distance < 125
                ) {

                    const opacity =
                        (
                            1 -
                            distance / 125
                        ) *
                        0.16;


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
                        "rgba(70,160,235," +
                        opacity +
                        ")";

                    ctx.lineWidth =
                        0.6;

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


    resizeCanvas();

    drawParticles();
}
