// 1. Typewriter Effect (Home Page ke liye)
const typewriterText = document.getElementById('slider-text');
const phrases = ["Innovative Tech Solutions", "Modern Web Design", "Future-Ready Software"];
let phraseIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < phrases[phraseIndex].length) {
        typewriterText.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    }
}

// Check karein agar element exist karta hai tabhi chalayein
if (typewriterText) {
    typewriterText.textContent = "";
    type();
}

// 2. Sticky Navbar Effect (Scroll karne par color change)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = "#0056b3"; // Blue color on scroll
        nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    } else {
        nav.style.background = "#121212"; // Original Dark
        nav.style.boxShadow = "none";
    }
});

// 3. Simple Alert for Contact Form (Optional)
console.log("TheaTech Professional Script Loaded!");
