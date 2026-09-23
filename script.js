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
   PARTICLE SYSTEM
========================================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];

let mouse = {
    x: null,
    y: null,
    radius: 130
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createParticles();

}


function createParticles() {

    particles = [];


    const area =
        window.innerWidth *
        window.innerHeight;


    let amount =
        Math.floor(area / 13000);


    amount =
        Math.max(
            35,
            Math.min(amount, 105)
        );


    if (window.innerWidth < 600) {

        amount = 35;

    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random()
                * canvas.width,

            y:
                Math.random()
                * canvas.height,

            vx:
                (Math.random() - .5)
                * .22,

            vy:
                (Math.random() - .5)
                * .22,

            size:
                Math.random()
                * 1.5
                + .4,

            alpha:
                Math.random()
                * .45
                + .15

        });

    }

}


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
     * Draw connections first.
     */

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


            if (distance < 120) {

                const opacity =
                    (1 - distance / 120)
                    * .12;


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
                    `rgba(96,165,250,${opacity})`;

                ctx.lineWidth = .5;

                ctx.stroke();

            }

        }

    }


    /*
     * Draw particles.
     */

    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            /*
             * Wrap around screen.
             */

            if (
                particle.x < -10
            ) {
                particle.x =
                    canvas.width + 10;
            }

            if (
                particle.x >
                canvas.width + 10
            ) {
                particle.x = -10;
            }

            if (
                particle.y < -10
            ) {
                particle.y =
                    canvas.height + 10;
            }

            if (
                particle.y >
                canvas.height + 10
            ) {
                particle.y = -10;
            }


            /*
             * Mouse interaction.
             */

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
                        )
                        / mouse.radius;


                    particle.x +=
                        (dx / distance)
                        * force
                        * .8;

                    particle.y +=
                        (dy / distance)
                        * force
                        * .8;

                }

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            /*
             * RGB-style technology colors.
             */

            const color =
                Math.random() > .5
                    ? "96,165,250"
                    : "34,211,238";


            ctx.fillStyle =
                `rgba(${color},${particle.alpha})`;

            ctx.fill();

        }
    );


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


resizeCanvas();

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
