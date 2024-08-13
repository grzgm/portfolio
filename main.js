// Navbar logic
const navBar = document.querySelector("nav");
const navBarGradient = document.querySelector("#gradient-background-nav");
let prevScrollpos = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-100%";
  }
  if (currentScrollPos < 100) {
    navBar.style.backgroundColor = "initial";
    navBarGradient.style.opacity = "0";
  } else {
    navBar.style.backgroundColor = "";
    navBarGradient.style.opacity = "0.75";
  }
  prevScrollpos = currentScrollPos;
});

// Sidebar logic
const menuContainer = document.querySelector(".nav-content__menu-container");
const sideBar = document.getElementById("side-bar");

menuContainer.addEventListener("click", () => {
  if (sideBar.classList.contains("side-bar--show")) {
    sideBar.classList.remove("side-bar--show");
    setTimeout(() => {
      sideBar.style.display = "none";
    }, 300); // Wait for animation to complete before hiding
  } else {
    sideBar.style.display = "flex";
    setTimeout(() => {
      sideBar.classList.add("side-bar--show");
    }, 10); // Allow the display property to apply before animating
  }
});

document.addEventListener("click", (event) => {
  if (
    sideBar.classList.contains("side-bar--show") &&
    !sideBar.contains(event.target) &&
    !menuContainer.contains(event.target)
  ) {
    sideBar.classList.remove("side-bar--show");
    setTimeout(() => {
      sideBar.style.display = "none";
    }, 300); // Wait for animation to complete before hiding
  }
});

// Copy email to clipboard
const emailCopyButton = document.querySelector(
  ".contact-section__wrapper__email-container__copy-button"
);

emailCopyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText("grzegorzmalisz02@gmail.com");
  emailCopyButton.style.transform = "scale(1.2)";
  setTimeout(() => {
    emailCopyButton.style.transform = "";
  }, 200); // Wait for animation to complete before hiding
});

// Project cards animation
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((projectCard) => {
  projectCard.addEventListener("mousemove", (e) => {
    const rect = projectCard.getBoundingClientRect();
    const x = e.clientX - rect.left; // Get x position within the card
    const y = e.clientY - rect.top; // Get y position within the card

    // Calculate rotation angles based on cursor position
    const xRotation = (y / rect.height - 0.5) * 30; // Rotate between -15deg to 15deg
    const yRotation = (x / rect.width - 0.5) * -30; // Rotate between -15deg to 15deg

    // Calculate brightness level based on cursor position
    const brightnessMax = 1.1;
    const brightnessMin = 0.85;
    const brightnessSlope = (brightnessMax - brightnessMin) / (0 - 1);
    const brightness = brightnessMin + brightnessSlope * (y / rect.height - 1);

    // Apply the rotation and brightness to the card
    projectCard.style.transform = `scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    projectCard.style.filter = `brightness(${brightness})`;
  });

  projectCard.addEventListener("mouseleave", () => {
    // Reset the card's transform and filter when the cursor leaves
    projectCard.style.transform = "scale(1)";
    projectCard.style.filter = `brightness(1)`;
  });
});
