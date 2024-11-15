import {html, render} from 'https://unpkg.com/lit-html';

const token = sessionStorage.getItem('accessToken');
const mainElement = document.querySelector('body main');

const template = html`<article>
	<h2>Recipe deleted</h2>
</article>`;

export default async function deleteRecipeById(id) {
	try {
		await fetch(`http://localhost:3030/data/recipes/${id}`, {
			method: 'DELETE',
			headers: {
				'X-Authorization': token,
			},
		});

		render(template, mainElement);
	} catch {
		console.error();
	}
}
