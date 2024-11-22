import {html, render} from 'https://unpkg.com/lit-html';
import page from '//unpkg.com/page/page.mjs';
import {userApi} from '../api/user.js';
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

export default function registerPage() {
	render(template, mainElement);
}

function handleRegister(e) {
	userApi.register(e);
}
