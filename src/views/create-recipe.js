import {html, render} from 'https://unpkg.com/lit-html';
import {recipeApi} from '../api/recipe.js';

const mainElement = document.querySelector('body main');

export default function createRecipePage() {
	render(template, mainElement);
}

const template = html`
	<article id="create-section">
		<h2>New Recipe</h2>
		<form @submit=${formSubmitHandler} method="post">
			<label>Name: <input type="text" name="name" placeholder="Recipe name" /></label>
			<label>Image: <input type="text" name="img" placeholder="Image URL" /></label>
			<label class="ml"
				>Ingredients:
				<textarea
					name="ingredients"
					placeholder="Enter ingredients on separate lines"></textarea>
			</label>
			<label class="ml"
				>Preparation:
				<textarea
					name="steps"
					placeholder="Enter preparation steps on separate lines"></textarea>
			</label>
			<input type="submit" value="Create Recipe" />
		</form>
	</article>
`;

async function formSubmitHandler(e) {
	await recipeApi.createRecipe(e);
}
