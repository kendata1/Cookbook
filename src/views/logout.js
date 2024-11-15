export default function logout() {
  const logoutUrl = "http://localhost:3030/users/login";
  fetch(logoutUrl, {
    headers: {
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
  });
  sessionStorage.clear();
}
