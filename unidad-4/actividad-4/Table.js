class DataTable extends HTMLElement {
  constructor() {
    super();

    this.table = document.createElement("table");
    this.thead = document.createElement("thead");
    this.tbody = document.createElement("tbody");

    
    this.table.classList.add(
      "w3-card-4",
      "w3-centered",
      "w3-table-all",
      "w3-hoverable",
      "w3-margin",
      "w3-small"
    );
    this.thead.classList.add("w3-green", "w3-text-white");
    //no entiendo bien por que no funciona
    this.table.style.width = "60%";


    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.appendChild(this.table);
  }

  setHeader(headers) {
    this.thead.textContent = "";

    const headerRow = document.createElement("tr");
    headerRow.classList.add("w3-green", "w3-text-white");

    for (let i = 0; i < headers.length; i++) {
      const th = document.createElement("th");
      th.textContent = headers[i];
      headerRow.appendChild(th);
    }

    this.thead.appendChild(headerRow);
  }

  setData(dataArray, fields) {
    this.tbody.textContent = "";

    for (let i = 0; i < dataArray.length; i++) {
      const row = document.createElement("tr");
      let values;

      if (fields) {
        values = fields.map((field) => dataArray[i][field]);
      } else {
        values = Object.values(dataArray[i]);
      }

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
