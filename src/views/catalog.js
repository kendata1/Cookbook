import showDetails from './detailed.js';
import {html, render} from 'https://unpkg.com/lit-html';

const url = 'http://localhost:3030/data/recipes';
const mainElement = document.querySelector('body main');

export default async function catalogPage() {
	const recipes = await getRecipes();
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

async function getRecipes() {
	try {
		const result = await fetch(url);
		const data = await result.json();
		return data;
	} catch {
		err => console.log(err);
	}
}

function detailsHandler(id) {
	showDetails(id);
}
