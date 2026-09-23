/* =====================================================
   THEA.TECH
   MAIN WEBSITE SCRIPT
===================================================== */


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initHeader();
        initMobileMenu();
        initParticles();
        initHeroParallax();
        initReveal();
        initProjects();
        initActiveNavigation();
        initYear();

    }
);


/* =====================================================
   HEADER SCROLL
===================================================== */

function initHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 35) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {

    const toggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");

    if (!toggle || !nav) return;


    toggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );


    nav.querySelectorAll("a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("open");

                }
            );

        }
    );

}


/* =====================================================
   PARTICLES
===================================================== */

function initParticles() {

    const container =
        document.getElementById("heroParticles");

    if (!container) return;


    const isMobile =
        window.innerWidth <= 600;


    const particleCount =
        isMobile ? 38 : 85;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "hero-particle";


        const size =
            Math.random() > .88
                ? 3
                : 1 + Math.random() * 1.4;


        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;


        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.opacity =
            `${.25 + Math.random() * .6}`;


        particle.style.animationDuration =
            `${7 + Math.random() * 13}s`;


        particle.style.animationDelay =
            `${Math.random() * -20}s`;


        container.appendChild(
            particle
        );

    }

}


/* =====================================================
   HERO PARALLAX
===================================================== */

function initHeroParallax() {

    const visual =
        document.getElementById(
            "technologyVisual"
        );

    const hero =
        document.querySelector(".hero");


    if (!visual || !hero) return;


    if (window.innerWidth <= 900) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                .5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                .5;


            visual.style.transform =
                `
                perspective(1500px)
                rotateY(${x * 5}deg)
                rotateX(${y * -5}deg)
                `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            visual.style.transform =
                `
                perspective(1500px)
                rotateY(0deg)
                rotateX(0deg)
                `;

        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =====================================================
   PROJECT DATA
===================================================== */

const projects = [

    {
        title: "THEA Books",

        category: "Business Software",

        description:
            "A business management and accounting platform designed to bring operational information into one practical software environment.",

        icon: "TB"
    }

];


/* =====================================================
   PROJECT RENDER
===================================================== */

function initProjects() {

    const container =
        document.getElementById(
            "projectsGrid"
        );


    if (!container) return;


    container.innerHTML = "";


    projects.forEach(
        project => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "project-card reveal";


            card.innerHTML = `

                <div class="project-visual">

                    <div class="project-core">
                        ${project.icon}
                    </div>

                </div>


                <span class="project-category">
                    ${project.category}
                </span>


                <h3>
                    ${project.title}
                </h3>


                <p>
                    ${project.description}
                </p>

            `;


            container.appendChild(
                card
            );


            requestAnimationFrame(
                () => {

                    if (
                        "IntersectionObserver"
                        in window
                    ) {

                        const observer =
                            new IntersectionObserver(
                                entries => {

                                    entries.forEach(
                                        entry => {

                                            if (
                                                entry.isIntersecting
                                            ) {

                                                entry.target
                                                    .classList
                                                    .add("visible");

                                                observer
                                                    .unobserve(
                                                        entry.target
                                                    );

                                            }

                                        }
                                    );

                                },
                                {
                                    threshold: .12
                                }
                            );


                        observer.observe(
                            card
                        );

                    } else {

                        card.classList
                            .add("visible");

                    }

                }
            );

        }
    );

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!sections.length || !links.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;


                            links.forEach(
                                link => {

                                    link.classList
                                        .remove(
                                            "active"
                                        );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    ) {

                                        link.classList
                                            .add(
                                                "active"
                                            );

                                    }

                                }
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            observer.observe(
                section
            );

        }
    );

}


/* =====================================================
   CURRENT YEAR
===================================================== */

function initYear() {

    const year =
        document.getElementById(
            "currentYear"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =====================================================
   CONTACT FORM STATUS
===================================================== */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


if (
    urlParams.get("sent") === "1"
) {

    setTimeout(
        () => {

            const contact =
                document.getElementById(
                    "contact"
                );


            if (contact) {

                contact.scrollIntoView({
                    behavior: "smooth"
                });

            }

        },
        400
    );

}


/* =====================================================
   CURSOR DEPTH FOR TECHNOLOGY NODES
===================================================== */

document.addEventListener(
    "mousemove",
    event => {

        const nodes =
            document.querySelectorAll(
                ".tech-node"
            );


        if (
            window.innerWidth <= 900
        ) {
            return;
        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            );


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            );


        nodes.forEach(
            (node, index) => {

                const strength =
                    4 +
                    index * .7;


                node.style.marginLeft =
                    `${x * strength}px`;


                node.style.marginTop =
                    `${y * strength}px`;

            }
        );

    }
);
