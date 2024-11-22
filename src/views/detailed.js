import {html, render} from 'https://unpkg.com/lit-html';
import deleteRecipeById from '/views/delete.js';
import editRecipe from './edit-recipe.js';
import {recipeApi} from '../api/recipe.js';

const mainElement = document.querySelector('body main');

export default async function showDetails(ctx) {
	const {recipeId} = ctx.params;

	const recipe = await recipeApi.getRecipeById(recipeId);
	const currUserId = sessionStorage.getItem('_userId');
	const isOwner = !!currUserId != null && currUserId == recipe._ownerId;

	render(template(recipe, isOwner), mainElement);
}

const template = (recipe, isOwner) => html`
	<article>
		<h2>${recipe.name}</h2>
		<div class="description">
			<h3>Preparation:</h3>
			${recipe.steps.map(step => html`<p>${step}</p>`)}
		</div>

		<div class="band">
			<div class="thumb">
				<img src=${recipe.img} />
			</div>
			<div class="ingredients">
				<h3>Ingredients:</h3>
				<ul>
					${recipe.ingredients.map(ingr => html` <li>${ingr}</li>`)}
				</ul>
			</div>
		</div>
		${isOwner
			? html`
					<div class="controls">
						<button @click=${() => handleEdit(recipe)}>✎ Edit</button>
						<button @click=${() => handleDelete(recipe)}>✖ Delete</button>
					</div>
			  `
			: ''}
	</article>
`;

function handleDelete(recipe) {
	const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
	if (confirmed) {
		deleteRecipeById(recipe._id);
	}
}

function handleEdit(recipe) {
	editRecipe(recipe);
}
