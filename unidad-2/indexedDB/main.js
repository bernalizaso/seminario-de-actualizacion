import { APIModelAccess } from './APIModelAccess.js';
import { Application } from './Application.js';

function main()
{
	let model = new APIModelAccess();
	let app = new Application(model);

	app.init().then(() => app.run());
}

window.onload = main;