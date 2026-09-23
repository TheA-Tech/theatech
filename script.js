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
   REPEATING SCROLL REVEAL
   Animation returns every time section enters viewport.
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

                } else {

                    /*
                       Important:
                       Remove class when element leaves
                       viewport so animation can happen again.
                    */

                    entry.target.classList.remove(
                        "visible"
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


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (
    heroVisual &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    .5);

            const y =
                (event.clientY /
                    window.innerHeight -
                    .5);


            heroVisual.style.transform =
                `translate3d(
                    ${x * 18}px,
                    ${y * 18}px,
                    0
                )`;

        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "translate3d(0,0,0)";

        }
    );

}


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const canvas =
    document.getElementById(
        "particleCanvas"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];

let particleCount =
    window.innerWidth < 700
        ? 45
        : 90;


function resizeCanvas() {

    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

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

}


resizeCanvas();


window.addEventListener(
    "resize",
    () => {

        resizeCanvas();

        particleCount =
            window.innerWidth < 700
                ? 45
                : 90;

        createParticles();

    }
);


function createParticles() {

    particles = [];

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() *
                1.8 +
                .5,

            speedX:
                (Math.random() - .5)
                * .25,

            speedY:
                (Math.random() - .5)
                * .25,

            alpha:
                Math.random() *
                .45 +
                .1

        });

    }

}


createParticles();


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

        const particle =
            particles[i];


        particle.x +=
            particle.speedX;

        particle.y +=
            particle.speedY;


        if (
            particle.x < -20 ||
            particle.x >
            window.innerWidth + 20
        ) {

            particle.x =
                Math.random() *
                window.innerWidth;

        }


        if (
            particle.y < -20 ||
            particle.y >
            window.innerHeight + 20
        ) {

            particle.y =
                Math.random() *
                window.innerHeight;

        }


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
                103,
                232,
                249,
                ${particle.alpha}
            )`;

        ctx.fill();


        /*
           Connect nearby particles.
        */

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const other =
                particles[j];

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


            if (distance < 120) {

                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    other.x,
                    other.y
                );

                ctx.strokeStyle =
                    `rgba(
                        103,
                        232,
                        249,
                        ${(
                            1 -
                            distance / 120
                        ) * .10}
                    )`;

                ctx.lineWidth = .5;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(
        drawParticles
    );

}


drawParticles();


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


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

    const message =
        document.createElement("div");


    message.textContent =
        "Your inquiry has been submitted successfully.";


    message.style.position =
        "fixed";

    message.style.right =
        "20px";

    message.style.bottom =
        "20px";

    message.style.zIndex =
        "9999";

    message.style.padding =
        "15px 18px";

    message.style.borderRadius =
        "12px";

    message.style.background =
        "#0f172a";

    message.style.color =
        "white";

    message.style.boxShadow =
        "0 20px 50px rgba(0,0,0,.25)";

    message.style.fontSize =
        "13px";


    document.body.appendChild(
        message
    );


    setTimeout(
        () => {

            message.remove();

            history.replaceState(
                {},
                document.title,
                window.location.pathname
            );

        },
        4500
    );

}
