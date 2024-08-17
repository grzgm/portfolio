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
const projectCardWrappers = document.querySelectorAll(".project-card--wrapper");

projectCardWrappers.forEach((projectCardWrapper) => {
  const projectCard = projectCardWrapper.querySelector(".project-card");
  projectCard.addEventListener("mousemove", (e) => {
    const rect = projectCard.getBoundingClientRect();
    const x = e.clientX - rect.left; // Get x position within the card
    const y = e.clientY - rect.top; // Get y position within the card

    // Calculate rotation angles based on cursor position
    const xRotation = (y / rect.height - 0.5) * -30; // Rotate between -15deg to 15deg
    const yRotation = (x / rect.width - 0.5) * 30; // Rotate between -15deg to 15deg

    // Calculate brightness level based on cursor position
    const brightnessMax = 1.1;
    const brightnessMin = 0.80;
    const brightnessSlope = (brightnessMax - brightnessMin) / (0 - 1);
    const brightness = brightnessMin + brightnessSlope * (y / rect.height - 1);

    // Apply the rotation and brightness to the card
    projectCard.style.transform = `scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    projectCard.style.filter = `brightness(${brightness})`;
  });

  projectCard.addEventListener("mouseleave", () => {
    // Reset the card's transform and filter when the cursor leaves
    projectCard.style.transform = "";
    projectCard.style.filter = "";
  });
});

tagContainerWrappers = document.querySelectorAll(
  ".project-card__content__bottom-row__tag-container--wrapper"
);

tagContainerWrappers.forEach((tagContainerWrapper) => {
  const tagContainer = tagContainerWrapper.querySelector(
    ".project-card__content__bottom-row__tag-container"
  );
  tagContainer.addEventListener("wheel", (event) => {
    console.log(tagContainer.scrollLeft + tagContainer.clientWidth, tagContainer.scrollWidth);
    // prevent the page scrolling
    event.preventDefault();

    // invert the scroll
    tagContainer.scrollLeft += event.deltaY;

    // add/hide after and before elements
    if (tagContainer.scrollLeft == 0) {
      tagContainerWrapper.style.setProperty("--before-visibility", "hidden");
    } else {
      tagContainerWrapper.style.setProperty("--before-visibility", "visible");
    }

    if (tagContainer.scrollLeft + tagContainer.clientWidth >= tagContainer.scrollWidth) {
      tagContainerWrapper.style.setProperty("--after-visibility", "hidden");
    } else {
      tagContainerWrapper.style.setProperty("--after-visibility", "visible");
    }
  });
});

// Experience card gradient animation
document.querySelectorAll(".experience-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Get x position within the card
    const y = e.clientY - rect.top; // Get y position within the card

    // Calculate the angle based on mouse position
    const angle =
      Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) +
      90;

    // Update the gradient with the new angle
    card.style.background = `linear-gradient(${angle}deg, var(--experience-card-white) 0%, var(--experience-card-silver) 100%)`;
  });

  card.addEventListener("mouseleave", () => {
    // Reset the gradient when the mouse leaves the card
    card.style.background = "";
  });
});

// Skill card animation
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    console.log(card.style.backgroundColor);
    card.style.transition = "none";
    card.style.backgroundColor = "rgb(255, 255, 255, 0)";
    card.style.boxShadow =
      "0 0 0 rgba(0, 0, 0, 0.10), 0 0 0 rgba(0, 0, 0, 0.25), inset 5px 5px 10px rgba(0, 0, 0, 0.25), inset -3px -3px 5px rgb(255, 255, 255)";
  });

  card.addEventListener("mouseleave", () => {
    // Reset background when the mouse leaves the card
    card.style.transition = "";
    card.style.background = "";
    card.style.boxShadow = "";
  });
});
