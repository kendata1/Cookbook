export default function createRecipe() {
  const articleElement = document.getElementById("create-article");
  articleElement.style.display = "block";

  const formElement = document.getElementById("create-recipe");

  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = "http://localhost:3030/data/recipes";

    const form = event.currentTarget;
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
      .then(window.location.replace("index.html"))
      .catch((err) => console.log(err));
  });
}
