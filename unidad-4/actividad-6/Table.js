class DataTable extends HTMLElement {
  constructor() {
    super();

    this.table = document.createElement("table");
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");
    this.rows = [];

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.appendChild(this.table);
  }

  setHeader(header) {
    this.thead.textContent = "";
    const headerRow = document.createElement("tr");

    for (let i = 0; i < header.length; i++) {
      const th = document.createElement("th");
      th.textContent = header[i];
      headerRow.appendChild(th);
    }

    this.thead.appendChild(headerRow);
  }

  setData(dataArray, fields) {
    this.tbody.textContent = "";
    this.rows = []; // guardamos las filas nuevas

    for (let i = 0; i < dataArray.length; i++) {
      const row = document.createElement("tr");
      const values = fields ? fields.map((f) => dataArray[i][f]) : Object.values(dataArray[i]);

      for (let j = 0; j < values.length; j++) {
        const cell = document.createElement("td");
        cell.textContent = values[j];
        row.appendChild(cell);
      }

      this.tbody.appendChild(row);
      this.rows.push(row); // guardamos referencia
    }
  }

  clear() {
    this.thead.textContent = "";
    this.tbody.textContent = "";
    this.rows = [];
  }
}

customElements.define("data-table", DataTable);
export { DataTable };
