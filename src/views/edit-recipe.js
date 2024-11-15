import {html, render} from 'https://unpkg.com/lit-html';
const mainElement = document.querySelector('body main');

export default function editRecipe(recipe) {
	render(template(recipe), mainElement);
}

const template = recipe => html`
	<article id="create-section">
		<h2>Edit Recipe</h2>
		<form @submit=${e => formSubmitHandler(recipe, e)}>
			<label
				>Name:
				<input value=${recipe.name} type="text" name="name" placeholder="Recipe name"
			/></label>
			<label
				>Image:
				<input value=${recipe.img} type="text" name="img" placeholder="Image URL"
			/></label>
			<label class="ml"
				>Ingredients:
				<textarea
					name="ingredients"
					placeholder="Enter ingredients on separate lines">
${recipe.ingredients.join('\n')}</textarea
				>
			</label>
			<label class="ml"
				>Preparation:
				<textarea
					name="steps"
					placeholder="Enter preparation steps on separate lines">
${recipe.steps.join('\n')}</textarea
				>
			</label>
			<input type="submit" value="Edit Recipe" />
		</form>
	</article>
`;

function formSubmitHandler(recipe, e) {
	e.preventDefault();
	const url = `http://localhost:3030/data/recipes/${recipe._id}`;

	const form = e.currentTarget;
	const formData = new FormData(form);

	fetch(url, {
		method: 'PUT',
		body: JSON.stringify({
			name: formData.get('name'),
			img: formData.get('img'),
			ingredients: formData.get('ingredients').split('\n'),
			steps: formData.get('steps').split('\n'),
		}),
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken'),
		},
	})
		.then(() => (window.location.href = '/'))
		.catch(err => console.log(err));
}
