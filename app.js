import createRecipe from "./views/create-recipe.js";
import login from "./views/login.js";
import register from "./views/register.js";
import homePage from "./views/home.js";
import logout from "./views/logout.js";

const pathnameView = {
  "/register": register,
  "/login": login,
  "/create": createRecipe,
  "/": homePage,
  "/logout": logout,
};

const mainElement = document.querySelector("main");
document.addEventListener("DOMContentLoaded", onLoad());

function onLoad() {
  const userNavButtonsSection = document.getElementById("user");
  const guestNavButtonsSection = document.getElementById("guest");

  initNavigation();

  function initNavigation() {
    const navElement = document.querySelector("header nav");
    navElement.addEventListener("click", (e) => {
      if (e.target.tagName !== "A") {
        return;
      }
      e.preventDefault();
      const url = new URL(e.target.href);
      const pathname = url.pathname;

      document
        .querySelectorAll(".hidden")
        .forEach((article) => (article.style.display = "none"));
      pathnameView[pathname]();
      renderNavigation();
    });
  }
  renderNavigation();

  function renderNavigation() {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      userNavButtonsSection.style.display = "block";
      guestNavButtonsSection.style.display = "none";
    } else {
      guestNavButtonsSection.style.display = "block";
      userNavButtonsSection.style.display = "none";
    }
  }
}
