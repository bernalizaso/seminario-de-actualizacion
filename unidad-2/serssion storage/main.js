import { APIModelAccess } from './APIModelAccess_sessionStorage.js';
import { Application } from './Application.js';

function main() {
  let model = new APIModelAccess();
  let app = new Application(model);

  app.init();
  app.run();
}

window.onload = main;
