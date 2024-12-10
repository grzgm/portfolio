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
    navBar.style.backgroundColor = "var(--light-mode-background)";
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
  await navigator.clipboard.writeText("g.malisz@student.fontys.nl");
  emailCopyButton.style.transform = "scale(1.2)";
  setTimeout(() => {
    emailCopyButton.style.transform = "";
  }, 200); // Wait for animation to complete before hiding
});

// Project cards animation
const projectCardWrappers = document.querySelectorAll(".project-card--wrapper");

function resetProjectCardAnimation(projectCard){
  // Reset the card's transform and filter when the cursor leaves
  projectCard.style.transform = "";
  projectCard.style.filter = "";
}

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
    const brightnessMin = isMobileOrTabletCheck() ? 0.95 : 0.8;
    const brightnessSlope = (brightnessMax - brightnessMin) / (0 - 1);
    const brightness = brightnessMin + brightnessSlope * (y / rect.height - 1);

    // Apply the rotation and brightness to the card
    projectCard.style.transform = `scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    projectCard.style.filter = `brightness(${brightness})`;
  });

  projectCard.addEventListener("mouseleave", () => { resetProjectCardAnimation(projectCard) });

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

// One Stop Shop multiple links
function isMobileOrTabletCheck() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Old redirection for project cards
// document.querySelector("#project-card--one-stop-shop").addEventListener("click", (e) => {
//   // Do not open new tab if mobile device or clicked on anchor tag
//   if (!mobileAndTabletCheck() && e.target.tagName !== 'A' && !e.target.closest('a'))
//   {
//     window.open("https://github.com/grzgm/one-stop-shop-ida", "_blank");
//   }
// });

// Mobile on scroll animations, substitute for desktop hover effect

const projectCardWrappersWithMultipleLinks = Array.from(projectCardWrappers).filter(card =>
  card.querySelector('.project-card__content__bottom-row__link-container')
);

// On scroll animation substitute of project card hover effect
const projectCardWrapperObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const projectCard = entry.target.querySelector('.project-card');
    if (entry.isIntersecting && isMobileOrTabletCheck()) {
      projectCard.classList.add('project-card--mobile-on-scroll');
    } else {
      projectCard.classList.remove('project-card--mobile-on-scroll');
      resetProjectCardAnimation(projectCard);
    }
  });
}, {
  rootMargin: "-5% 0%",
  threshold: 1.0,
});

// On scroll animation substitute of project card's link container hover effect
const projectCardWithMultipleLinksObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const linksContainer = entry.target.querySelector('.project-card__content__bottom-row__link-container');
    if (entry.isIntersecting && isMobileOrTabletCheck()) {
      linksContainer.classList.add('project-card__content__bottom-row__link-container--mobile-on-scroll');
    } else {
      linksContainer.classList.remove('project-card__content__bottom-row__link-container--mobile-on-scroll');
    }
  });
}, {
  rootMargin: "20% 0% -25%",
  threshold: 1.0,
});

projectCardWrappers.forEach(item => projectCardWrapperObserver.observe(item));
projectCardWrappersWithMultipleLinks.forEach(item => projectCardWithMultipleLinksObserver.observe(item));

// On click animation substitute of project card's link container hover effect
projectCardWrappersWithMultipleLinks.forEach((projectCardWrapper) => {

  const projectCard = projectCardWrapper.querySelector(".project-card");

  // When project card is clicked on mobile display multiple links
  projectCard.addEventListener("click", () => {
    const linksContainer = projectCard.querySelector('.project-card__content__bottom-row__link-container');
    if (!linksContainer.classList.contains("project-card__content__bottom-row__link-container--mobile-on-scroll") && isMobileOrTabletCheck()) {
      linksContainer.classList.add("project-card__content__bottom-row__link-container--mobile-on-scroll")
    } else {
      linksContainer.classList.remove("project-card__content__bottom-row__link-container--mobile-on-scroll")
    }
  });
  
});