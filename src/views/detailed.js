import {html, render} from 'https://unpkg.com/lit-html';
import deleteRecipeById from '/views/delete.js';
import editRecipe from './edit-recipe.js';

const mainElement = document.querySelector('body main');

async function getRecipeById(id) {
	try {
		const response = await fetch(`http://localhost:3030/data/recipes/${id}`);
		const recipe = await response.json();
		return recipe;
	} catch (err) {
		console.log(err);
	}
}
const currUserId = sessionStorage.getItem('_userId');

export default async function showDetails(id) {
	const recipe = await getRecipeById(id);
	const isOwner = currUserId != null && currUserId == recipe._ownerId;

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

function handleDelete(data) {
	const confirmed = confirm(`Are you sure you want to delete ${data.name}?`);
	if (confirmed) {
		deleteRecipeById(data._id);
	}
}

function handleEdit(recipe) {
	editRecipe(recipe);
}
