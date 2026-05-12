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
  // Remove active/inactive states from all cards
  projectCards.forEach((item) => {
    item.classList.remove("active");
    item.classList.remove("inactive");
  });
  
  projectsContainer.classList.remove("has-active");

  // Reset the top-left logo highlights
  mainLogo.classList.remove("is-active-amaani", "is-active-aron");

  // Reset CSS variables to default
  root.style.setProperty('--bg', defaultBg);
  root.style.setProperty('--text', defaultText);
  root.style.setProperty('--secondary', defaultSec);
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
      // If clicking the currently open project, close it and reset
      resetArchive();
    } else {
      // Add the master class to the container so we know a project is open
      projectsContainer.classList.add("has-active");

      // Set all cards to inactive, then make the clicked one active
      projectCards.forEach((item) => {
        item.classList.remove("active");
        item.classList.add("inactive");
      });
      
      card.classList.remove("inactive");
      card.classList.add("active");

      // Update the top-left logo to highlight the author
      const author = card.getAttribute("data-author");
      mainLogo.classList.remove("is-active-amaani", "is-active-aron");
      if (author) {
        mainLogo.classList.add(`is-active-${author}`);
      }

      // Grab the specific brand colors from the HTML data attributes
      const newBg = card.getAttribute("data-bg");
      const newText = card.getAttribute("data-text");
      const newSec = card.getAttribute("data-sec");

      // Inject the new colors into the entire website's CSS variables
      root.style.setProperty('--bg', newBg);
      root.style.setProperty('--text', newText);
      root.style.setProperty('--secondary', newSec);
    }
  });
});