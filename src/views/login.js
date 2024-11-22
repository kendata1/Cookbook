import {html, render} from 'https://unpkg.com/lit-html';
import page from '//unpkg.com/page/page.mjs';
import {userApi} from '../api/user.js';
const mainElement = document.querySelector('body main');

export default function loginPage() {
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
	userApi.login(e);
}
