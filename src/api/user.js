import page from '//unpkg.com/page/page.mjs';
const baseUrl = 'http://localhost:3030/users';
export const userApi = {
	login,
	logout,
	register,
};

function login(e) {
	e.preventDefault();
	const form = e.currentTarget;

	const formData = new FormData(form);

	fetch(`${baseUrl}/login`, {
		method: 'POST',
		body: JSON.stringify({
			email: formData.get('email'),
			password: formData.get('password'),
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(res => {
			sessionStorage.setItem('accessToken', res.accessToken);
			sessionStorage.setItem('_userId', res._id);
			page.redirect('/');
		})
		.catch(err => console.log(err));
}

function logout() {
	fetch(`${baseUrl}/login`, {
		headers: {
			'X-Authorization': sessionStorage.getItem('accessToken'),
		},
	}).then(page.redirect('/'));
	sessionStorage.clear();
}

function register(e) {
	e.preventDefault();
	const formData = new FormData(e.target);

	fetch(`${baseUrl}/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: formData.get('email'),
			password: formData.get('password'),
			rePass: formData.get('rePass'),
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => res.json())
		.then(res => {
			sessionStorage.setItem('accessToken', res.accessToken);
			sessionStorage.setItem('_userId', res._id);
			page.redirect('/');
		})
		.catch(err => console.log(err));
}
