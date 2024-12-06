import {recipeApi} from '../api/recipe.js';
import {html, render} from 'https://unpkg.com/lit-html';
import page from '//unpkg.com/page/page.mjs';

const mainElement = document.querySelector('body main');

export default async function catalogPage(ctx) {
	const searchParams = new URLSearchParams(ctx.querystring);

	const filter = {
		search: searchParams.get('search'),
	};

	render(template([], searchHandler), mainElement);

	const recipes = await recipeApi.getRecipes(filter);
	render(template(recipes, searchHandler), mainElement);
}

const template = (recipies = [], onSearch) => html`
	<form @submit=${onSearch} style="display: flex; justify-content: center;">
		<div>
			<input type="text" name="search" style="position: unset;" />
			<input type="submit" value="Search" style="display: inline;" />
		</div>
	</form>

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

function searchHandler(e) {
	e.preventDefault();
	const formData = new FormData(e.target);

	const search = formData.get('search');

	page.redirect(`/catalog/?search=${search}`);
}
