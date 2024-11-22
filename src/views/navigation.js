import {html, render} from 'https://unpkg.com/lit-html';

const headerElement = document.querySelector('body header');
const accessToken = sessionStorage.getItem('accessToken');

const isLogged = !!accessToken;

export default function renderNavigation(ctx, next) {
	render(template(isLogged), headerElement);
}

const template = isLogged => html`
	<h1>
		<a href="/"><img src="assets/logo.png" /></a>My Cookbook
	</h1>
	<nav>
		${isLogged
			? html`
					<div id="user">
						<a href="/catalog">Catalog</a>
						<a href="/create">Create Recipe</a>
						<a id="logoutBtn" href="/logout">Logout</a>
					</div>
			  `
			: html`
					<div id="guest">
						<a href="/login">Login</a>
						<a href="/register">Register</a>
					</div>
			  `}
	</nav>
`;
