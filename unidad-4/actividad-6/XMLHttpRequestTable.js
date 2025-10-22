import { DataTable } from "./Table.js";
import { WCModalDialogUI } from "./WCModalDialogUI.js";
import { TableController } from "./TableController.js";

class XMLHttpRequestTable extends HTMLElement {
  constructor() {
    super();

    this.requestButton = document.createElement("button");
    this.clearButton = document.createElement("button");
    this.outputTable = new DataTable();
    this.modal = new WCModalDialogUI();

    this.controller = new TableController(this.outputTable, this.modal);

    this.requestButton.innerText = "Request";
    this.clearButton.innerText = "Clear";

    this.appendChild(this.requestButton);
    this.appendChild(this.clearButton);
    this.appendChild(this.outputTable);
    this.appendChild(this.modal);
  }

  connectedCallback() {
    this.requestButton.addEventListener("click", () => this.controller.fetchUsers());
    this.clearButton.addEventListener("click", () => this.controller.clearTable());
  }

  disconnectedCallback() {
    this.requestButton.removeEventListener("click", () => this.controller.fetchUsers());
    this.clearButton.removeEventListener("click", () => this.controller.clearTable());
  }
}

customElements.define("xmlhttprequest-table", XMLHttpRequestTable);
export { XMLHttpRequestTable };
