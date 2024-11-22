import {html, render} from 'https://unpkg.com/lit-html';
import {recipeApi} from '../api/recipe.js';

const mainElement = document.querySelector('body main');

const template = html`<article>
	<h2>Recipe deleted</h2>
</article>`;

export default async function deleteRecipeById(id) {
	await recipeApi.deleteRecipe(id);
	render(template, mainElement);
}
