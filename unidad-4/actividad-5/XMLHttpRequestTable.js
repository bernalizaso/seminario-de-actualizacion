import { DataTable } from "./Table.js";
import { WCModalDialogUI } from "./WCModalDialogUI.js";

class XMLHttpRequestTable extends HTMLElement {
  constructor() {
    super();

    this.requestButton = document.createElement("button");
    this.clearButton = document.createElement("button");
    this.outputTable = new DataTable();
    this.modal = new WCModalDialogUI();

    this.requestButton.innerText = "Request";
    this.clearButton.innerText = "Clear";

    this.appendChild(this.requestButton);
    this.appendChild(this.clearButton);
    this.appendChild(this.outputTable);
    this.appendChild(this.modal);
  }

  onRequestButtonClick() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la petición: " + response.status);
        return response.json();
      })
      .then((data) => {
        const headers = ["ID", "Usuario", "Nombre", "Correo", "Web", "Celular"];
        const fields = ["id", "username", "name", "email", "website", "phone"];

        this.outputTable.setHeader(headers);
        this.outputTable.setData(data, fields);


        for (let i = 0; i < this.outputTable.rows.length; i++) {
          const row = this.outputTable.rows[i];
          const userId = data[i].id;

          row.style.cursor = "pointer";
          row.classList.add("w3-hover-light-grey");


          row.addEventListener("click", () => this.showUserDetails(userId));
        }
      })
      .catch((err) => console.error(err));
  }

  async showUserDetails(id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const user = await response.json();

      const info = {
        address: user.address,
        company: user.company,
      };

      this.modal.show(info);
    } catch (error) {
      console.error("Error al obtener detalles:", error);
    }
  }

  onClearButtonClick() {
    this.outputTable.clear();
  }

  connectedCallback() {
    this.requestButton.addEventListener("click", this.onRequestButtonClick.bind(this));
    this.clearButton.addEventListener("click", this.onClearButtonClick.bind(this));
  }

  disconnectedCallback() {
    this.requestButton.removeEventListener("click", this.onRequestButtonClick.bind(this));
    this.clearButton.removeEventListener("click", this.onClearButtonClick.bind(this));
  }
}

customElements.define("xmlhttprequest-table", XMLHttpRequestTable);
export { XMLHttpRequestTable };
