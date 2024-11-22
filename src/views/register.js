import {html, render} from 'https://unpkg.com/lit-html';
import page from '//unpkg.com/page/page.mjs';
const mainElement = document.querySelector('body main');

const template = html` <article id="register-article">
	<h2>Register</h2>
	<form @submit=${handleRegister} id="register-form" method="post">
		<label>E-mail: <input type="text" name="email" /></label>
		<label>Password: <input type="password" name="password" /></label>
		<label>Repeat: <input type="password" name="rePass" /></label>
		<input type="submit" value="Register" name="submit" />
	</form>
</article>`;

export default function register() {
	render(template, mainElement);
}

function handleRegister(e) {
	e.preventDefault();
	const form = e.target;

	const formData = new FormData(form);
	const registerUrl = 'http://localhost:3030/users/register';

	fetch(registerUrl, {
		method: 'POST',
		body: JSON.stringify({
			email: formData.get('email'),
			password: formData.get('password'),
			rePass: formData.get('rePass'),
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(res => {
			sessionStorage.setItem('accessToken', res.accessToken);
			sessionStorage.setItem('_userId', res._id);
			page.redirect('/');
		})
		.catch(err => console.log(err));
}
