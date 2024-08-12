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
