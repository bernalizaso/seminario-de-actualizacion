import { DataTable } from "./Table.js";

class XMLHttpRequestTable extends HTMLElement {
  constructor() {
    super();

    this.requestButton = document.createElement("button");
    this.clearButton = document.createElement("button");
    this.outputTable = new DataTable();

    this.requestButton.innerText = "Request";
    this.clearButton.innerText = "Clear";

    this.appendChild(this.requestButton);
    this.appendChild(this.clearButton);
    this.appendChild(this.outputTable);
  }

  // Manejo del botón de petición con fetch
  onRequestButtonClick() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const headers = ["ID", "Usuario", "Nombre", "Correo", "Web", "Celular"];
        const fields = ["id", "username", "name", "email", "website", "phone"];

        this.outputTable.setHeader(headers);
        this.outputTable.setData(data, fields);
      });
  }

  // Manejo del botón de limpieza
  onClearButtonClick() {
    this.outputTable.clear();
  }

  connectedCallback() {
    this.requestButton.onclick = this.onRequestButtonClick.bind(this);
    this.clearButton.onclick = this.onClearButtonClick.bind(this);
  }

  disconnectedCallback() {
    this.requestButton.onclick = null;
    this.clearButton.onclick = null;
  }
}

customElements.define("xmlhttprequest-table", XMLHttpRequestTable);
export { XMLHttpRequestTable };
