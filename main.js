const menuContainer = document.querySelector(".nav-content__menu-container");
const sideBar = document.getElementById("side-bar");

menuContainer.addEventListener("click", () => {
  if (sideBar.style.display === "flex") {
    sideBar.style.display = "none";
  } else {
    sideBar.style.display = "flex";
  }
});

document.addEventListener("click", (event) => {
  if (
    sideBar.style.display === "flex" &&
    !sideBar.contains(event.target) &&
    !menuContainer.contains(event.target)
  ) {
    sideBar.style.display = "none";
  }
});
