/**
 * BRKTHRU DIGITAL V2 - INTERACTIVE ENGINE
 * Restores functionality and adds premium dynamic effects.
 */

document.addEventListener("DOMContentLoaded", () => {
  initRevealObserver();
  initHeroParallax();
  initNavEffect();
});

// --- TOUR TRACK SWITCHER ---
function switchTrack(trackId) {
  // Update Buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("onclick").includes(trackId)) {
      btn.classList.add("active");
    }
  });

  // Update Tracks
  document.querySelectorAll(".pricing-track").forEach((track) => {
    track.style.display = "none";
    track.classList.remove("active");
  });

  const activeTrack = document.getElementById(trackId);
  if (activeTrack) {
    activeTrack.style.display = "block";
    setTimeout(() => activeTrack.classList.add("active"), 10);
  }
}

// --- PAYMENT & MODAL SYSTEM ---
function initiateWorkshopPayment(program, tier, price) {
  const modal = document.getElementById("payment-modal");
  if (!modal) return;

  document.getElementById("modal-program-name").textContent = program;
  document.getElementById("modal-tier").textContent = tier;
  document.getElementById("modal-amount").textContent = price;

  modal.classList.add("active");
}

// Modal Handlers
document.addEventListener("click", (e) => {
  const modal = document.getElementById("payment-modal");
  if (e.target === modal || e.target.id === "modal-close") {
    modal.classList.remove("active");
  }

  if (e.target.id === "modal-confirm") {
    // Redirect logic (using existing HitPay generic portal or specific logic if needed)
    window.location.href = "https://hitpay.app/pay/brkthru";
  }
});

// --- DYNAMIC REVEALS ---
function initRevealObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal, .reveal-up, .reveal-stagger").forEach((el) => {
    observer.observe(el);
  });
}

// --- HERO PARALLAX ---
function initHeroParallax() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const bgImg = hero.querySelector(".hero-bg img");

  window.addEventListener("scroll", () => {
    const scroll = window.pageYOffset;
    if (bgImg) {
      bgImg.style.transform = `scale(1.1) translateY(${scroll * 0.4}px)`;
    }
  });
}

// --- NAV EFFECT ---
function initNavEffect() {
  const header = document.querySelector(".univ-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });
}
