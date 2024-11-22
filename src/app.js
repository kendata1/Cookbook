import createRecipePage from './views/create-recipe.js';
import showDetails from './views/detailed.js';
import loginPage from './views/login.js';
import registerPage from './views/register.js';
import catalogPage from './views/catalog.js';
import {userApi} from './api/user.js';
import homePage from './views/home.js';
import renderNavigation from './views/navigation.js';
import page from '//unpkg.com/page/page.mjs';

page(renderNavigation);

page('/', homePage);
page('/catalog', catalogPage);
page('/catalog/:recipeId', showDetails);
page('/create', createRecipePage);
page('/register', registerPage);
page('/login', loginPage);
page('/logout', userApi.logout);

page();
