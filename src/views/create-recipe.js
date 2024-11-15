import { html, render } from "https://unpkg.com/lit-html";

const mainElement = document.querySelector("body main");

export default function createRecipe() {
  render(template, mainElement);
}

const template = html`
  <article id="create-section">
    <h2>New Recipe</h2>
    <form @submit=${formSubmitHandler} method="post">
      <label
        >Name: <input type="text" name="name" placeholder="Recipe name"
      /></label>
      <label
        >Image: <input type="text" name="img" placeholder="Image URL"
      /></label>
      <label class="ml"
        >Ingredients:
        <textarea
          name="ingredients"
          placeholder="Enter ingredients on separate lines"
        ></textarea>
      </label>
      <label class="ml"
        >Preparation:
        <textarea
          name="steps"
          placeholder="Enter preparation steps on separate lines"
        ></textarea>
      </label>
      <input type="submit" value="Create Recipe" />
    </form>
  </article>
`;

function formSubmitHandler(e) {
  e.preventDefault();
  const url = "http://localhost:3030/data/recipes";

  const form = e.currentTarget;
  const formData = new FormData(form);

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      img: formData.get("img"),
      ingredients: formData.get("ingredients").split("\n"),
      steps: formData.get("steps").split("\n"),
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
  })
    .then(() => (window.location.href = "/"))
    .catch((err) => console.log(err));
}
