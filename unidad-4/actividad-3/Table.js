class DataTable extends HTMLElement {
  constructor() {
    super();


    this.table = document.createElement("table");
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.appendChild(this.table);
  }


  setHeader(headers) {

    this.thead.textContent = "";

    const headerRow = document.createElement("tr");

    for (let i = 0; i < headers.length; i++) {
      const th = document.createElement("th");
      th.textContent = headers[i];
      headerRow.appendChild(th);
    }

    this.thead.appendChild(headerRow);
  }


  setData(dataArray) {
    this.tbody.textContent = "";

    for (let i = 0; i < dataArray.length; i++) {
      const row = document.createElement("tr");
      const values = Object.values(dataArray[i]);

      for (let j = 0; j < values.length; j++) {
        const cell = document.createElement("td");
        cell.textContent = values[j];
        row.appendChild(cell);
      }

      this.tbody.appendChild(row);
    }
  }


  clear() {
    this.thead.textContent = "";
    this.tbody.textContent = "";
  }
}

customElements.define("data-table", DataTable);
export { DataTable };