import createRecipe from './views/create-recipe.js';
import login from './views/login.js';
import register from './views/register.js';
import catalogPage from './views/catalog.js';
import logout from './views/logout.js';
import homePage from './views/home.js';

const pathnameView = {
	'/register': register,
	'/login': login,
	'/create': createRecipe,
	'/catalog': catalogPage,
	'/logout': logout,
	'/': homePage,
};

const userNavButtonsSection = document.getElementById('user');
const guestNavButtonsSection = document.getElementById('guest');
document.addEventListener('DOMContentLoaded', onLoad());

function onLoad() {
	pathnameView['/']();
	initNavigation();
	renderNavigation();
}

function renderNavigation() {
	const accessToken = sessionStorage.getItem('accessToken');
	if (accessToken && accessToken !== 'undefined') {
		userNavButtonsSection.style.display = 'block';
		guestNavButtonsSection.style.display = 'none';
	} else {
		guestNavButtonsSection.style.display = 'block';
		userNavButtonsSection.style.display = 'none';
	}
}

function initNavigation() {
	const navElement = document.querySelector('header nav');
	navElement.addEventListener('click', e => {
		if (e.target.tagName !== 'A') {
			return;
		}
		e.preventDefault();
		const url = new URL(e.target.href);
		const pathname = url.pathname;

		pathnameView[pathname]();
		renderNavigation();
	});
}
