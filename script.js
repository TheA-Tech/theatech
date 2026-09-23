/* =========================================================
   THEA.TECH
   WEBSITE INTERACTIONS
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

    });


    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

        });

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const siteHeader = document.getElementById("siteHeader");

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
   PROJECT DATA
=========================================================

   IMPORTANT:

   Only completed / publicly presentable projects should
   be added here.

   Future projects are NOT displayed.

   When a real project is completed, simply add another
   object to this array.

========================================================= */

const projects = [

    {
        title: "THEA Books",
        category: "Business Software",
        description:
            "A business management and accounting platform developed to organize sales, purchases, expenses, customers, vendors, inventory and reporting.",
        type: "software"
    }

];


/* =========================================================
   PROJECT RENDERER
========================================================= */

const projectList = document.getElementById("projectList");


function renderProjects() {

    if (!projectList) return;

    projectList.innerHTML = "";

    projects.forEach((project, index) => {

        const card = document.createElement("article");

        card.className = "project-card";

        card.innerHTML = `

            <div class="project-content">

                <div class="project-index">
                    ${String(index + 1).padStart(2, "0")}
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

                <a href="#products" class="project-link">
                    View project
                    <span>→</span>
                </a>

            </div>


            <div class="project-visual">

                <div class="project-screen"></div>

            </div>

        `;

        projectList.appendChild(card);

    });

}

renderProjects();


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealItems = document.querySelectorAll(
    ".solution-card, " +
    ".service-item, " +
    ".process-step, " +
    ".project-card, " +
    ".feature-list div, " +
    ".architecture, " +
    ".product-showcase"
);


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    },

    {
        threshold: .12
    }

);


revealItems.forEach(item => {

    item.classList.add("reveal-item");

    revealObserver.observe(item);

});


/* =========================================================
   SUCCESS MESSAGE
========================================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const formMessage = document.getElementById(
    "formMessage"
);

if (
    formMessage &&
    urlParams.get("sent") === "1"
) {

    formMessage.textContent =
        "Your inquiry has been submitted successfully.";

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const submitButton =
                contactForm.querySelector(
                    ".form-submit"
                );

            if (!submitButton) return;

            submitButton.disabled = true;

            submitButton.innerHTML =
                "Sending...";

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
   SUBTLE MOUSE DEPTH EFFECT
=========================================================

   Very subtle only.
   This keeps the website professional instead of
   making it look like a gaming / anime website.

========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (
    heroVisual &&
    window.matchMedia("(min-width: 900px)").matches
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;

            const rotateY =
                (x - .5) * 4;

            const rotateX =
                (y - .5) * -2;

            const systemWindow =
                heroVisual.querySelector(
                    ".system-window"
                );

            if (!systemWindow) return;

            systemWindow.style.transform =
                `
                perspective(1400px)
                rotateY(${rotateY - 3}deg)
                rotateX(${rotateX}deg)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const systemWindow =
                heroVisual.querySelector(
                    ".system-window"
                );

            if (!systemWindow) return;

            systemWindow.style.transform =
                `
                perspective(1400px)
                rotateY(-5deg)
                rotateX(2deg)
                `;

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

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
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


sections.forEach(section => {

    sectionObserver.observe(section);

});
