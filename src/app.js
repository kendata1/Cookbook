import createRecipePage from './views/create-recipe.js';
import login from './views/login.js';
import register from './views/register.js';
import catalogPage from './views/catalog.js';
import logout from './views/logout.js';
import homePage from './views/home.js';
import renderNavigation from './views/navigation.js';
import page from '//unpkg.com/page/page.mjs';

renderNavigation();

page.start();
page('/', homePage);
page('/catalog', catalogPage);
page('/create', createRecipePage);
page('/register', register);
page('/login', login);
page('/logout', logout);
