class TableController {
  constructor(table, modal) {
    this.table = table;
    this.modal = modal;
  }

  async fetchUsers() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Error en la petición: " + response.status);

      const data = await response.json();

      const headers = ["ID", "Usuario", "Nombre", "Correo", "Web", "Celular"];
      const fields = ["id", "username", "name", "email", "website", "phone"];

      this.table.setHeader(headers);
      this.table.setData(data, fields);

      this.addRowEvents(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }

  addRowEvents(users) {
    for (let i = 0; i < this.table.rows.length; i++) {
      const row = this.table.rows[i];
      const userId = users[i].id;

      row.style.cursor = "pointer";
      row.classList.add("w3-hover-light-grey");
      row.addEventListener("click", () => this.showUserDetails(userId));
    }
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

  clearTable() {
    this.table.clear();
  }
}

export { TableController };
