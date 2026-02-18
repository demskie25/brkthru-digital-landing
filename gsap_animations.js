/**
 * GSAP Animations for Brkthru Digital
 * Premium scroll-triggered reveals and micro-interactions
 */

// Load GSAP and ScrollTrigger via CDN if not already present
function loadGSAP(callback) {
    if (window.gsap) {
        callback();
        return;
    }

    const gsapScript = document.createElement('script');
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    
    const triggerScript = document.createElement('script');
    triggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";

    gsapScript.onload = () => {
        document.head.appendChild(triggerScript);
        triggerScript.onload = () => {
            gsap.registerPlugin(ScrollTrigger);
            callback();
        };
    };

    document.head.appendChild(gsapScript);
}

function initAnimations() {
    // 1. Hero Content Reveal
    gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 2. Section Reveals (replaces/augments AOS)
    gsap.utils.toArray("section").forEach(section => {
        const elements = section.querySelectorAll(".card, .feature-item, h2, .animate-reveal");
        
        if (elements.length > 0) {
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });

    // 3. Premium Hover Effects for Cards
    const cards = gsap.utils.toArray(".card, [class*='bg-white'].rounded-[2rem]");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                duration: 0.3,
                ease: "power1.out"
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                duration: 0.3,
                ease: "power1.in"
            });
        });
    });

    // 4. Button Micro-interactions
    const buttons = gsap.utils.toArray(".univ-btn-tour, .univ-btn-video, [class*='bg-accent']");
    buttons.forEach(btn => {
        btn.addEventListener("mouseenter", () => {
            gsap.to(btn, { scale: 1.05, duration: 0.2 });
        });
        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, { scale: 1, duration: 0.2 });
        });
        btn.addEventListener("mousedown", () => {
            gsap.to(btn, { scale: 0.95, duration: 0.1 });
        });
        btn.addEventListener("mouseup", () => {
            gsap.to(btn, { scale: 1.05, duration: 0.1 });
        });
    });

    // 5. Parallax Hero Effect (Subtle)
    const heroes = gsap.utils.toArray("section.relative.overflow-hidden img");
    heroes.forEach(img => {
        if (img.src.includes('hero')) {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 100,
                ease: "none"
            });
        }
    });
}

// Start when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => loadGSAP(initAnimations));
} else {
    loadGSAP(initAnimations);
}
