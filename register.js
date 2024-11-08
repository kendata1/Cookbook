const formElement = document.getElementById("register-form");
const registerButton = document.querySelector("form input[name='submit']");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  const registerUrl = "http://localhost:3030/users/register";

  fetch(registerUrl, {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
      rePass: formData.get("rePass"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      sessionStorage.setItem("accessToken", res.accessToken);
      sessionStorage.setItem("_ownerId", res._id);
      window.location.replace("index.html");
    })
    .catch((err) => console.log(err));
});
