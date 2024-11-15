import {html, render} from 'https://unpkg.com/lit-html';
import showDetails from './detailed.js';
const url =
	'http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3';

export default async function homePage() {
	const recipes = await getThreeMostRecentRecipies();
	render(template(recipes), mainElement);
}

async function getThreeMostRecentRecipies() {
	try {
		const result = await fetch(url);
		const data = await result.json();

		return data;
	} catch {
		err => console.log(err);
	}
}
const mainElement = document.querySelector('body main');
const template = recipies => html` <section class="recent-recipies">
	<section class="hero">
		<h2 class="recent-title">Welcome to My Cookbook</h2>
	</section>
	<section class="section-title">
		<p class="recent-title">Recently added recipies</p>
	</section>
	<section class="recent-recipes">
		${recipies.map(
			recipie => html`
				<article @click=${() => handleClick(recipie._id)} class="recent card">
					<div class="recent-preview">
						<img src=${recipie.img} />
					</div>
					<p class="recent-title">${recipie.name}</p>
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
	showDetails(id);
}
