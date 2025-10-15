import{WCModalDialogUI}from "./WCComponnents.js"
import{WCModalDialogController}from "./WCController.js"

function main()
{
    let ui = new WCModalDialogUI();
    let controller = new WCModalDialogController(ui);
    ui.controller = controller;
    document.body.appendChild(ui);
}

window.onload = main;