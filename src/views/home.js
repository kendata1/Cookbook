import {html, render} from 'https://unpkg.com/lit-html';
import showDetails from './detailed.js';
import {recipeApi} from '../api/recipe.js';
import page from '//unpkg.com/page/page.mjs';

const mainElement = document.querySelector('body main');

export default async function homePage() {
	const recipes = await recipeApi.getThreeMostRecentRecipies();
	render(template(recipes), mainElement);
}

const template = recipes => html` <section class="recent-recipies">
	<section class="hero">
		<h2 class="recent-title">Welcome to My Cookbook</h2>
	</section>
	<section class="section-title">
		<p class="recent-title">Recently added recipies</p>
	</section>
	<section class="recent-recipes">
		${recipes.map(
			recipe => html`
				<article @click=${() => handleClick(recipe._id)} class="recent card">
					<div class="recent-preview">
						<img src=${recipe.img} />
					</div>
					<p class="recent-title">${recipe.name}</p>
				</article>
			`
		)}
	</section>
	<section class="section-title">
		<p class="recent-title">
			Browse all recipies in the <a href="/catalog">Catalog</a>
		</p>
	</section>
</section>`;

function handleClick(id) {
	page.redirect(`/catalog/${id}`);
}
