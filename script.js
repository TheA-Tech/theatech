/* =========================================================
   THEA.TECH
   Interactive Experience
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
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


    mainNav.querySelectorAll("a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mainNav.classList.remove("open");

                }
            );

        }
    );

}


/* =========================================================
   REPEATING SCROLL ANIMATIONS
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
                     * Remove the class when the element
                     * leaves the screen.
                     *
                     * This makes the animation run again
                     * whenever the user comes back.
                     */

                    entry.target.classList.remove(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.14
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(element);

    }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
    document.querySelector(".hero");

const heroVisual =
    document.querySelector(".hero-visual");


const supportsHover =
    window.matchMedia(
        "(hover: hover)"
    ).matches;


if (
    hero &&
    heroVisual &&
    supportsHover
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - .5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - .5;


            heroVisual.style.transform =
                `
                rotateY(${x * 5}deg)
                rotateX(${y * -5}deg)
                `;
        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "rotateY(0deg) rotateX(0deg)";

        }
    );

}


/* =========================================================
   THEA.TECH — GLOBAL PARTICLE ENGINE
========================================================= */

const particleCanvas =
    document.getElementById("particles");

const particleContext =
    particleCanvas.getContext("2d");


let particleWidth;
let particleHeight;

let particleMouse = {
    x: null,
    y: null
};


const particleCount =
    window.innerWidth < 700
        ? 45
        : 100;


const particleList = [];


/* ---------------------------------------------------------
   RESIZE
--------------------------------------------------------- */

function resizeParticleCanvas() {

    const ratio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    particleWidth =
        window.innerWidth;

    particleHeight =
        window.innerHeight;

    particleCanvas.width =
        particleWidth * ratio;

    particleCanvas.height =
        particleHeight * ratio;

    particleCanvas.style.width =
        particleWidth + "px";

    particleCanvas.style.height =
        particleHeight + "px";

    particleContext.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


resizeParticleCanvas();


window.addEventListener(
    "resize",
    resizeParticleCanvas
);


/* ---------------------------------------------------------
   MOUSE
--------------------------------------------------------- */

window.addEventListener(
    "mousemove",
    function(event) {

        particleMouse.x =
            event.clientX;

        particleMouse.y =
            event.clientY;

    }
);


window.addEventListener(
    "mouseleave",
    function() {

        particleMouse.x = null;
        particleMouse.y = null;

    }
);


/* ---------------------------------------------------------
   CREATE PARTICLES
--------------------------------------------------------- */

for (
    let i = 0;
    i < particleCount;
    i++
) {

    particleList.push({

        x:
            Math.random() *
            window.innerWidth,

        y:
            Math.random() *
            window.innerHeight,

        size:
            Math.random() * 1.8 + 0.5,

        speedX:
            (Math.random() - 0.5) * 0.25,

        speedY:
            (Math.random() - 0.5) * 0.25,

        opacity:
            Math.random() * 0.6 + 0.15

    });

}


/* ---------------------------------------------------------
   DRAW
--------------------------------------------------------- */

function drawParticles() {

    particleContext.clearRect(
        0,
        0,
        particleWidth,
        particleHeight
    );


    particleList.forEach(
        function(particle) {

            particle.x +=
                particle.speedX;

            particle.y +=
                particle.speedY;


            /* Screen wrapping */

            if (
                particle.x < 0
            ) {
                particle.x =
                    particleWidth;
            }


            if (
                particle.x > particleWidth
            ) {
                particle.x = 0;
            }


            if (
                particle.y < 0
            ) {
                particle.y =
                    particleHeight;
            }


            if (
                particle.y > particleHeight
            ) {
                particle.y = 0;
            }


            /* Mouse interaction */

            if (
                particleMouse.x !== null
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
                    distance < 120
                ) {

                    particle.x +=
                        dx * 0.002;

                    particle.y +=
                        dy * 0.002;

                }

            }


            /* Particle */

            particleContext.beginPath();

            particleContext.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            particleContext.fillStyle =
                `rgba(
                    100,
                    150,
                    255,
                    ${particle.opacity}
                )`;


            particleContext.fill();

        }
    );


    /* -----------------------------------------------------
       CONNECTION LINES
    ----------------------------------------------------- */

    for (
        let i = 0;
        i < particleList.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particleList.length;
            j++
        ) {

            const a =
                particleList[i];

            const b =
                particleList[j];


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
                distance < 110
            ) {

                const opacity =
                    (1 - distance / 110)
                    * 0.12;


                particleContext.beginPath();

                particleContext.moveTo(
                    a.x,
                    a.y
                );

                particleContext.lineTo(
                    b.x,
                    b.y
                );


                particleContext.strokeStyle =
                    `rgba(
                        100,
                        150,
                        255,
                        ${opacity}
                    )`;


                particleContext.lineWidth =
                    0.5;


                particleContext.stroke();

            }

        }

    }


    requestAnimationFrame(
        drawParticles
    );
}


drawParticles();


/* =========================================================
   HERO VISUAL MOVEMENT
========================================================= */

const floatingNodes =
    document.querySelectorAll(
        ".floating-node"
    );


if (supportsHover) {

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (
                    event.clientX /
                    window.innerWidth
                ) - .5;

            const y =
                (
                    event.clientY /
                    window.innerHeight
                ) - .5;


            floatingNodes.forEach(
                (node, index) => {

                    const depth =
                        (index + 1) * 4;


                    node.style.transform =
                        `
                        translate(
                            ${x * depth}px,
                            ${y * depth}px
                        )
                        `;

                }
            );

        }
    );

}


/* =========================================================
   CONTACT SUCCESS MESSAGE
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


if (
    params.get("sent") === "1"
) {

    const form =
        document.querySelector(
            ".contact-form"
        );


    if (form) {

        const message =
            document.createElement(
                "div"
            );


        message.textContent =
            "Your inquiry has been submitted successfully.";


        message.style.cssText = `
            margin-bottom:20px;
            padding:12px 14px;
            border:1px solid rgba(34,211,238,.25);
            border-radius:8px;
            background:rgba(34,211,238,.08);
            color:#a5f3fc;
            font-size:.75rem;
        `;


        form.prepend(message);

    }

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

        if (
            window.scrollY > 30
        ) {

            header.style.background =
                "rgba(3,6,17,.91)";

            header.style.borderBottomColor =
                "rgba(255,255,255,.12)";

        } else {

            header.style.background =
                "rgba(4,8,22,.72)";

            header.style.borderBottomColor =
                "rgba(255,255,255,.08)";

        }

    },
    {
        passive: true
    }
);
