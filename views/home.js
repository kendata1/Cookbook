const url = "http://localhost:3030/data/recipes";
const mainArticleElement = document.getElementById("home-article");

export default function homePage() {
  mainArticleElement.style.display = "block";
  showRecipes();
}

function showRecipes() {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      mainArticleElement.innerHTML = "";
      const data = Object.values(res);
      renderRecipies(data);
    })
    .catch((err) => console.log(err));
}

function renderRecipies(data) {
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

    mainArticleElement.appendChild(articleElement);
  }
}

function renderDeatailedArticle(data) {
  mainArticleElement.innerHTML = "";
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

  mainArticleElement.appendChild(articleElement);
}
