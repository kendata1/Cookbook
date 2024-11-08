document.addEventListener("DOMContentLoaded", onLoad());

function onLoad() {
  const url = "http://localhost:3030/data/recipes";
  const mainElement = document.querySelector("main");
  const userNavButtonsSection = document.getElementById("user");
  const guestNavButtonsSection = document.getElementById("guest");

  if (isLogged()) {
    userNavButtonsSection.style.display = "block";
  } else {
    guestNavButtonsSection.style.display = "block";
  }

  function isLogged() {
    if (sessionStorage.getItem("accessToken") !== null) {
      return true;
    } else {
      return false;
    }
  }
  console.log(isLogged());

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const data = Object.values(res);
      createRecipies(data);
    })
    .catch((err) => console.log(err));

  function createRecipies(data) {
    mainElement.innerHTML = "";

    for (const element of data) {
      const h2Element = document.createElement("h2");
      h2Element.textContent = element.name;

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("title");
      titleDiv.appendChild(h2Element);

      const imgElement = document.createElement("img");
      imgElement.src = element.img;

      const smallDiv = document.createElement("div");
      smallDiv.classList.add("small");
      smallDiv.appendChild(imgElement);

      const articleElement = document.createElement("article");
      articleElement.classList.add("preview");
      articleElement.appendChild(titleDiv);
      articleElement.appendChild(smallDiv);
      articleElement.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `http://localhost:3030/data/recipes/${element._id}`
          );
          const articleDetails = await response.json();
          renderDeatailedArticle(articleDetails);
        } catch (err) {
          console.log(err);
        }
      });

      mainElement.appendChild(articleElement);
    }
  }

  function renderDeatailedArticle(data) {
    mainElement.innerHTML = "";

    // Creating desc div
    const descDiv = document.createElement("div");
    descDiv.classList.add("description");

    const descHeader = document.createElement("h3");
    descHeader.textContent = "Preparation:";
    descDiv.appendChild(descHeader);

    for (const element of data.steps) {
      const currStep = document.createElement("p");
      currStep.textContent = element;

      descDiv.appendChild(currStep);
    }

    // Creating band div
    const bandDiv = document.createElement("div");
    bandDiv.classList.add("band");

    const imgElement = document.createElement("img");
    imgElement.src = data.img;

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("thumb");
    imgDiv.appendChild(imgElement);

    bandDiv.appendChild(imgDiv);

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add("ingredients");

    const ingredientsHeader = document.createElement("h3");
    ingredientsHeader.textContent = "Ingredients:";

    ingredientsDiv.appendChild(ingredientsHeader);

    const ingredientsUl = document.createElement("ul");

    for (const element of data.ingredients) {
      const currIngredient = document.createElement("li");
      currIngredient.textContent = element;
      ingredientsUl.appendChild(currIngredient);
    }

    ingredientsDiv.appendChild(ingredientsUl);
    bandDiv.appendChild(ingredientsDiv);

    //Article and append children
    const articleElement = document.createElement("article");
    const articleHeader = document.createElement("h2");
    articleHeader.textContent = data.name;

    articleElement.appendChild(articleHeader);
    articleElement.appendChild(bandDiv);
    articleElement.appendChild(descDiv);

    mainElement.appendChild(articleElement);
  }
}
