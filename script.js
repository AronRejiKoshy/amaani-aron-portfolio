const projectCards = document.querySelectorAll(".project-card");
const projectsContainer = document.getElementById("projects-container");
const root = document.documentElement;
const resetButton = document.getElementById("reset-toggle");
const mainLogo = document.getElementById("main-logo");

// Store the default neutral colors
const defaultBg = "#111111";
const defaultText = "#f5f5f5";
const defaultSec = "#7a7a7a";

/* =========================
   RESET TO DEFAULT FUNCTION
========================= */
function resetArchive() {
  projectCards.forEach((item) => {
    item.classList.remove("active");
    item.classList.remove("inactive");
  });
  
  projectsContainer.classList.remove("has-active");
  mainLogo.classList.remove("is-active-amaani", "is-active-aron");

  root.style.setProperty('--bg', defaultBg);
  root.style.setProperty('--text', defaultText);
  root.style.setProperty('--secondary', defaultSec);

  // Stop any global backgrounds
  document.querySelectorAll('.global-bg-layer').forEach(layer => layer.classList.remove('active'));

  document.querySelectorAll('video').forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

/* =========================
   BUTTON LISTENER
========================= */
resetButton.addEventListener("click", resetArchive);

/* =========================
   EXPAND PROJECTS & COLOR SHIFT
========================= */
projectCards.forEach((card) => {
  const header = card.querySelector(".project-header");

  header.addEventListener("click", () => {
    const isActive = card.classList.contains("active");

    if (isActive) {
      resetArchive();
    } else {
      projectsContainer.classList.add("has-active");

      document.querySelectorAll('video').forEach(video => {
        video.pause();
      });

      projectCards.forEach((item) => {
        item.classList.remove("active");
        item.classList.add("inactive");
      });
      
      card.classList.remove("inactive");
      card.classList.add("active");

      // Handle Full-Screen Backgrounds
      document.querySelectorAll('.global-bg-layer').forEach(layer => layer.classList.remove('active'));
      const bgLayerId = card.getAttribute("data-bg-layer");
      if (bgLayerId) {
        const layer = document.getElementById(bgLayerId + "-global-bg");
        if (layer) layer.classList.add("active");
      }

      const author = card.getAttribute("data-author");
      mainLogo.classList.remove("is-active-amaani", "is-active-aron");
      if (author) {
        mainLogo.classList.add(`is-active-${author}`);
      }

      const newBg = card.getAttribute("data-bg");
      const newText = card.getAttribute("data-text");
      const newSec = card.getAttribute("data-sec");

      root.style.setProperty('--bg', newBg);
      root.style.setProperty('--text', newText);
      root.style.setProperty('--secondary', newSec);
    }
  });
});

/* =========================
   CAROUSEL LOGIC
========================= */
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(carousel => {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const nextBtn = carousel.querySelector('.next-btn');
  const prevBtn = carousel.querySelector('.prev-btn');
  let currentIndex = 0;

  function updateSlider() {
    slides.forEach((slide) => {
      slide.classList.remove('active');
      // Auto-pause video if the user slides away from it
      const vid = slide.querySelector('video');
      if (vid) {
        vid.pause();
      }
    });
    slides[currentIndex].classList.add('active');
  }

  if(nextBtn && prevBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });
  }
});

/* =========================
   VIDEO CONTROL LOGIC
========================= */
const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach(container => {
  const video = container.querySelector('video');
  const playBtn = container.querySelector('.play-btn');
  const pauseBtn = container.querySelector('.pause-btn');
  const resetBtn = container.querySelector('.reset-btn');

  if (video && playBtn && pauseBtn && resetBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.play();
    });

    pauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.pause();
    });

    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.pause();
      video.currentTime = 0;
    });
  }
});