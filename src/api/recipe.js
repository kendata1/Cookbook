import page from '//unpkg.com/page/page.mjs';

const baseUrl = 'http://localhost:3030/data/recipes';
const token = sessionStorage.getItem('accessToken');

export const recipeApi = {
	getRecipes,
	createRecipe,
	deleteRecipe,
	getRecipeById,
	editRecipe,
	getThreeMostRecentRecipies,
};

async function getRecipes() {
	try {
		const result = await fetch(baseUrl);
		const data = await result.json();
		return data;
	} catch {
		err => console.log(err);
	}
}

async function getThreeMostRecentRecipies() {
	try {
		const result = await fetch(
			`${baseUrl}?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3`
		);
		const data = await result.json();

		return data;
	} catch {
		err => console.log(err);
	}
}

async function createRecipe(e) {
	e.preventDefault();

	const form = e.currentTarget;
	const formData = new FormData(form);

	fetch(baseUrl, {
		method: 'POST',
		body: JSON.stringify({
			name: formData.get('name'),
			img: formData.get('img'),
			ingredients: formData.get('ingredients').split('\n'),
			steps: formData.get('steps').split('\n'),
		}),
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': token,
		},
	})
		.then(page.redirect('/'))
		.catch(err => console.log(err));
}

async function deleteRecipe(id) {
	try {
		await fetch(`${baseUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				'X-Authorization': token,
			},
		});
	} catch {
		console.error();
	}
}

async function getRecipeById(id) {
	try {
		const response = await fetch(`${baseUrl}/${id}`);
		const recipe = await response.json();
		return recipe;
	} catch (err) {
		console.log(err);
	}
}

async function editRecipe(recipe, e) {
	e.preventDefault();
	const url = `${baseUrl}/${recipe._id}`;

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
			'X-Authorization': token,
		},
	}).catch(err => console.log(err));
}
