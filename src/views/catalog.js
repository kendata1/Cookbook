import {recipeApi} from '../api/recipe.js';
import {html, render} from 'https://unpkg.com/lit-html';
import page from '//unpkg.com/page/page.mjs';

const mainElement = document.querySelector('body main');

export default async function catalogPage() {
	const recipes = await recipeApi.getRecipes();
	render(template(recipes), mainElement);
}

const template = recipies => html`
	<section id="catalog-section">
		${recipies.map(
			recipie => html`
				<article @click=${() => detailsHandler(recipie._id)} class="preview">
					<div class="title">
						<h2>${recipie.name}</h2>
					</div>
					<div class="small">
						<img src=${recipie.img} />
					</div>
				</article>
			`
		)}
	</section>
`;

function detailsHandler(id) {
	page.redirect(`/catalog/${id}`);
}
