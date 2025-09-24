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

 
  onRequestButtonClick() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {return response.json();})
      .then((data) => {
        const headers = Object.keys(data[0]);
        this.outputTable.setHeader(headers);
        this.outputTable.setData(data);
      })
  }


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
