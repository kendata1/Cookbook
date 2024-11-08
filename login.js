const formElement = document.getElementById("login-form");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const loginUrl = "http://localhost:3030/users/login";

  const form = event.currentTarget;

  const formData = new FormData(form);

  fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      sessionStorage.setItem("accessToken", res.accessToken);
      sessionStorage.setItem("_ownerId", res._id);
      window.location.href = "index.html";
    })
    .catch((err) => console.log(err));
});
