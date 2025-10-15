import { WCModalDialogUI } from "./WCComponents/WCModalDialog.js";
import { WCContactForm } from "./WCComponents/WCContactForm.js";

function main() {
  const modal = new WCModalDialogUI();
  const form = new WCContactForm();

  modal.setContent(form);

  document.body.appendChild(modal);
}

window.onload = main;
