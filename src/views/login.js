import {html, render} from 'https://unpkg.com/lit-html';
const mainElement = document.querySelector('body main');

export default function login() {
	render(template, mainElement);
}

const template = html` <article id="login-article">
	<h2>Login</h2>
	<form @submit=${handleLogin} id="login-form" method="post">
		<label>E-mail: <input type="text" name="email" /></label>
		<label>Password: <input type="password" name="password" /></label>
		<input type="submit" value="Login" />
	</form>
</article>`;

function handleLogin(e) {
	e.preventDefault();
	const loginUrl = 'http://localhost:3030/users/login';

	const form = e.currentTarget;

	const formData = new FormData(form);

	fetch(loginUrl, {
		method: 'POST',
		body: JSON.stringify({
			email: formData.get('email'),
			password: formData.get('password'),
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(res => {
			console.log(res);
			sessionStorage.setItem('accessToken', res.accessToken);
			sessionStorage.setItem('_userId', res._id);
			window.location.href = '/';
		})
		.catch(err => console.log(err));
}
