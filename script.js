/* =========================================================
   THEA.TECH
   INTERACTIONS
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
   HEADER SCROLL EFFECT
========================================================= */

const siteHeader =
    document.getElementById("siteHeader");


function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 30) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


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


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = [

    {
        title: "THEA Books",
        category: "Business Software",
        description:
            "A business management and accounting platform bringing sales, purchases, expenses, inventory, accounting and reporting into one organized environment.",
        type: "software"
    }

];


/* =========================================================
   PROJECT RENDERING
========================================================= */

const projectGrid =
    document.getElementById("projectGrid");


function createProjectVisual() {

    return `

        <div class="project-visual">

            <div class="project-visual-top">

                <i></i>
                <i></i>
                <i></i>

            </div>

            <div class="project-visual-body">

                <div class="project-visual-row">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

                <div class="project-visual-chart">

                    <span style="height:35%"></span>
                    <span style="height:55%"></span>
                    <span style="height:42%"></span>
                    <span style="height:73%"></span>
                    <span style="height:63%"></span>
                    <span style="height:84%"></span>
                    <span style="height:70%"></span>

                </div>

            </div>

        </div>

    `;
}


function renderProjects() {

    if (!projectGrid) return;

    projectGrid.innerHTML = "";

    projects.forEach(
        (project, index) => {

            const article =
                document.createElement("article");

            article.className =
                "project-card reveal";

            article.style.transitionDelay =
                `${index * 80}ms`;

            article.innerHTML = `

                <div class="project-category">
                    ${project.category}
                </div>

                <h3>
                    ${project.title}
                </h3>

                <p>
                    ${project.description}
                </p>

                ${createProjectVisual()}

            `;

            projectGrid.appendChild(article);

        }
    );


    const newRevealElements =
        projectGrid.querySelectorAll(".reveal");


    newRevealElements.forEach(
        element => {

            revealObserver.observe(element);

        }
    );

}


renderProjects();


/* =========================================================
   CONTACT FORM MESSAGE
========================================================= */

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


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   HERO MOUSE DEPTH
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


const canUseHover =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;


if (
    heroVisual &&
    canUseHover
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;


            heroVisual.style.transform =
                `
                perspective(1000px)
                rotateY(${x * 3}deg)
                rotateX(${y * -3}deg)
                `;
        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "";

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        '.main-nav a[href^="#"]'
    );


const pageSections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute("href")
                        === `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


pageSections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   PARTICLE SYSTEM
========================================================= */

const canvas =
    document.getElementById(
        "particleCanvas"
    );


const ctx =
    canvas ?
        canvas.getContext("2d") :
        null;


let particles = [];

let animationFrame;


/* Keep particles lighter on smaller screens */

function getParticleCount() {

    if (
        window.matchMedia(
            "(max-width: 600px)"
        ).matches
    ) {

        return 28;

    }

    if (
        window.matchMedia(
            "(max-width: 1000px)"
        ).matches
    ) {

        return 45;

    }

    return 70;

}


function resizeCanvas() {

    if (!canvas || !ctx) return;

    const pixelRatio =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        window.innerWidth * pixelRatio;

    canvas.height =
        window.innerHeight * pixelRatio;

    canvas.style.width =
        `${window.innerWidth}px`;

    canvas.style.height =
        `${window.innerHeight}px`;

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

    if (!canvas || !ctx) return;

    const count =
        getParticleCount();


    particles = [];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push({

            x:
                Math.random()
                * window.innerWidth,

            y:
                Math.random()
                * window.innerHeight,

            vx:
                (Math.random() - 0.5)
                * 0.22,

            vy:
                (Math.random() - 0.5)
                * 0.22,

            size:
                Math.random() * 1.7
                + 0.7,

            alpha:
                Math.random() * 0.35
                + 0.18,

            phase:
                Math.random()
                * Math.PI
                * 2

        });

    }

}


function drawParticles(time) {

    if (!canvas || !ctx) return;


    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    particles.forEach(
        particle => {

            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.phase += 0.008;


            if (particle.x < -20)
                particle.x = width + 20;

            if (particle.x > width + 20)
                particle.x = -20;

            if (particle.y < -20)
                particle.y = height + 20;

            if (particle.y > height + 20)
                particle.y = -20;


            const pulse =
                (
                    Math.sin(
                        particle.phase
                    ) + 1
                ) / 2;


            const alpha =
                particle.alpha
                * (0.72 + pulse * 0.28);


            /*
             * THEA.TECH palette:
             * blue / cyan / violet
             */

            const palette =
                particle.x % 3;


            if (palette < 1) {

                ctx.fillStyle =
                    `rgba(37,99,235,${alpha})`;

            } else if (palette < 2) {

                ctx.fillStyle =
                    `rgba(6,182,212,${alpha})`;

            } else {

                ctx.fillStyle =
                    `rgba(124,58,237,${alpha})`;

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }
    );


    /*
     * Connect only nearby particles.
     * This gives the background a real
     * digital-network feel.
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


            if (distance < 125) {

                const opacity =
                    (
                        1 -
                        distance / 125
                    ) * 0.09;


                ctx.strokeStyle =
                    `rgba(37,99,235,${opacity})`;

                ctx.lineWidth = 0.7;

                ctx.beginPath();

                ctx.moveTo(
                    a.x,
                    a.y
                );

                ctx.lineTo(
                    b.x,
                    b.y
                );

                ctx.stroke();

            }

        }

    }


    animationFrame =
        requestAnimationFrame(
            drawParticles
        );

}


function startParticles() {

    if (!canvas || !ctx) return;

    resizeCanvas();

    cancelAnimationFrame(
        animationFrame
    );

    animationFrame =
        requestAnimationFrame(
            drawParticles
        );

}


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            window.__theaResizeTimer
        );

        window.__theaResizeTimer =
            setTimeout(
                resizeCanvas,
                180
            );

    }
);


if (
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    startParticles();

}


/* =========================================================
   SENT MESSAGE CHECK
========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


if (
    urlParams.get("sent") === "1" &&
    formMessage
) {

    formMessage.textContent =
        "Your inquiry has been sent successfully.";

}
