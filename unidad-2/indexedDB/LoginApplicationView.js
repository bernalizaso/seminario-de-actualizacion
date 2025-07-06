//LoginApplicationView.js actualizada con los async/await 
class LoginApplicationView {
  constructor(model) {
    this.model = model;
  }

  async show() {
    let opt = "";
    do {
      opt = prompt("Menu principal:\n1) Iniciar sesion\n2) Salir");
      if (opt === "1") await this.loginFlow();
      else if (opt === "2") alert("Saliendo...");
      else alert("Opcion invalida");
    } while (opt !== "2");
  }

  async loginFlow() {
    while (true) {
      let u = prompt("Ingrese usuario:");
      let p = prompt("Ingrese contraseña:");
      let result = await this.model.authenticateUser(u, p);
      if (result.status) {
        alert("Bienvenido " + u);
        await this.postLoginMenu(u);
        break;
      } else {
        alert("Error: " + result.result);
        if (result.result === "BLOCKED_USER") break;
      }
    }
  }

  async postLoginMenu(username) {
    const user = await this.model.isValidUserGetData(username);
    const role = user.role;
    const permissions = this.model._permissions[role];

    let opt = "";
    do {
      opt = prompt(
        `Menu para ${role}:\n` +
          (permissions.includes("2") ? "2) Listar articulos\n" : "") +
          (permissions.includes("3") ? "3) Agregar articulo\n" : "") +
          (permissions.includes("4") ? "4) Editar articulo\n" : "") +
          (permissions.includes("5") ? "5) Comprar articulo\n" : "") +
          (permissions.includes("6") ? "6) Eliminar articulo\n" : "") +
          (permissions.includes("7") ? "7) Crear nuevo usuario\n" : "") +
          "0) Cerrar sesion"
      );

      switch (opt) {
        case "2":
          if (permissions.includes("2")) await this.listArticles();
          else alert("No tiene permiso");
          break;
        case "3":
          if (permissions.includes("3")) await this.nuevoArticulo();
          else alert("No tiene permiso");
          break;
        case "4":
          if (permissions.includes("4")) await this.editarArticulo();
          else alert("No tiene permiso");
          break;
        case "5":
          if (permissions.includes("5")) await this.buyArticle();
          else alert("No tiene permiso");
          break;
        case "6":
          if (permissions.includes("6")) await this.eraseArticulo();
          else alert("No tiene permiso");
          break;
        case "7":
          if (permissions.includes("7")) await this.crearUsuario();
          else alert("No tiene permiso");
          break;
        case "0":
          alert("Sesion cerrada.");
          break;
        default:
          alert("Opcion invalida");
      }
    } while (opt !== "0");
  }

  async listArticles() {
    const resultado = await this.model.getArticles();
    resultado.articles.forEach((art) => {
      alert(
        `ID: ${art.id} | Nombre: ${art.nombre} | Precio: $${art.precio} | Stock: ${art.stock}`
      );
    });
    alert(resultado.message);
  }

  async nuevoArticulo() {
    let id = parseInt(prompt("Ingrese ID"));
    if (isNaN(id) || id < 0) return alert("ID invalido");

    let nombre = prompt("Ingrese nombre");
    if (!nombre) return alert("Debe tener nombre");

    let precio = parseFloat(prompt("Ingrese precio"));
    if (isNaN(precio)) return alert("Precio invalido");

    let stock = parseInt(prompt("Ingrese stock"));
    if (isNaN(stock)) return alert("Stock invalido");

    const resultado = await this.model.addArticle(id, precio, stock, nombre);
    alert(resultado.message);
  }

  async editarArticulo() {
    let id = parseInt(prompt("Ingrese ID a editar"));
    if (isNaN(id) || id < 0) return alert("ID invalido");

    let nombre = prompt("Ingrese nuevo nombre");
    if (!nombre) return alert("Debe tener nombre");

    let precio = parseFloat(prompt("Ingrese nuevo precio"));
    if (isNaN(precio)) return alert("Precio invalido");

    let stock = parseInt(prompt("Ingrese nuevo stock"));
    if (isNaN(stock)) return alert("Stock invalido");

    const resultado = await this.model.editArticle(id, precio, stock, nombre);
    alert(resultado.message);
  }

  async buyArticle() {
    let id = parseInt(prompt("Ingrese ID a comprar"));
    if (isNaN(id) || id < 0) return alert("ID invalido");

    let cantidad = parseInt(prompt("Ingrese cantidad a comprar"));
    if (isNaN(cantidad) || cantidad <= 0) return alert("Cantidad invalida");

    const resultado = await this.model.changeArticleStock(cantidad, id);
    alert(resultado.message);
  }

  async eraseArticulo() {
    let id = parseInt(prompt("Ingrese ID a eliminar"));
    if (isNaN(id) || id < 0) return alert("ID invalido");

    const resultado = await this.model.eraseArticle(id);
    alert(resultado.message);
  }

  async crearUsuario() {
    let username = prompt("Ingrese nombre de usuario:");
    if (!username) return alert("Nombre invalido");

    let password = prompt("Ingrese contraseña:");
    if (!password) return alert("Contraseña invalida");

    let role = prompt(
      "Ingrese rol (Administrador, Cliente, Vendedor, Trabajador):"
    );
    if (
      !["Administrador", "Cliente", "Vendedor", "Trabajador"].includes(role)
    ) {
      return alert("Rol invalido");
    }

    const resultado = await this.model.addUser(username, password, role);
    alert(resultado.message);
  }
}

export { LoginApplicationView };
