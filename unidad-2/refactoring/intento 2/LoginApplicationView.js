class LoginApplicationView {
      constructor(model) {
        this.model = model;
      }

      show() {
        let opt = "";
        do {
          opt = prompt("Menú principal:\n1) Iniciar sesión\n2) Salir");
          if (opt === "1") this.loginFlow();
          else if (opt === "2") alert("Saliendo...");
          else alert("Opción inválida");
        } while (opt !== "2");
      }

      loginFlow() {
        while (true) {
          let u = prompt("Ingrese usuario:");
          let p = prompt("Ingrese contraseña:");
          let result = this.model.authenticateUser(u, p);
          if (result.status) {
            alert("Bienvenido " + u);
            this.postLoginMenu(u);
            break;
          } else {
            alert("Error: " + result.result);
            if (result.result === "BLOCKED_USER") break;
          }
        }
      }

      postLoginMenu(username) {
        const role = this.model.isValidUserGetData(username).role;
        const permissions = this.model._permissions[role];

        let opt = "";
        do {
          opt = prompt(
            `Menú para ${role}:\n` +
              (permissions.includes("2") ? "2) Listar artículos\n" : "") +
              (permissions.includes("3") ? "3) Agregar artículo\n" : "") +
              (permissions.includes("4") ? "4) Editar artículo\n" : "") +
              (permissions.includes("5") ? "5) Comprar artículo\n" : "") +
              (permissions.includes("6") ? "6) Eliminar artículo\n" : "") +
              (permissions.includes("7") ? "7) Crear nuevo usuario\n" : "") +
              "0) Cerrar sesión"
          );

          switch (opt) {
            case "2":
              if (permissions.includes("2")) this.listArticles();
              else alert("No tiene permiso");
              break;
            case "3":
              if (permissions.includes("3")) this.nuevoArticulo();
              else alert("No tiene permiso");
              break;
            case "4":
              if (permissions.includes("4")) this.editarArticulo();
              else alert("No tiene permiso");
              break;
            case "5":
              if (permissions.includes("5")) this.buyArticle();
              else alert("No tiene permiso");
              break;
            case "6":
              if (permissions.includes("6")) this.eraseArticulo();
              else alert("No tiene permiso");
              break;
            case "7":
              if (permissions.includes("7")) this.crearUsuario();
              else alert("No tiene permiso");
              break;

            case "0":
              alert("Sesión cerrada.");
              break;
            default:
              alert("Opción inválida");
          }
        } while (opt !== "0");
      }

      nuevoArticulo() {
        let id = parseInt(prompt("Ingrese ID"));
        if (isNaN(id) || id < 0) return alert("ID inválido");

        let nombre = prompt("Ingrese nombre");
        if (!nombre) return alert("Debe tener nombre");

        let precio = parseFloat(prompt("Ingrese precio"));
        if (isNaN(precio)) return alert("Precio inválido");

        let stock = parseInt(prompt("Ingrese stock"));
        if (isNaN(stock)) return alert("Stock inválido");

        let resultado = this.model.addArticle(id, precio, stock, nombre);
        alert(resultado.message);
      }

      editarArticulo() {
        let id = parseInt(prompt("Ingrese ID a editar"));
        if (isNaN(id) || id < 0) return alert("ID inválido");

        let nombre = prompt("Ingrese nuevo nombre");
        if (!nombre) return alert("Debe tener nombre");

        let precio = parseFloat(prompt("Ingrese nuevo precio"));
        if (isNaN(precio)) return alert("Precio inválido");

        let stock = parseInt(prompt("Ingrese nuevo stock"));
        if (isNaN(stock)) return alert("Stock inválido");

        let resultado = this.model.editArticle(id, precio, stock, nombre);
        alert(resultado.message);
      }

      buyArticle() {
        let id = parseInt(prompt("Ingrese ID a comprar"));
        if (isNaN(id) || id < 0) return alert("ID inválido");

        let cantidad = parseInt(prompt("Ingrese cantidad a comprar"));
        if (isNaN(cantidad) || cantidad <= 0) return alert("Cantidad inválida");

        let resultado = this.model.changeArticleStock(cantidad, id);
        alert(resultado.message);
      }

      listArticles() {
        let resultado = this.model.getArticles();
        resultado.articles.forEach((art) => {
          alert(
            `ID: ${art.id} | Nombre: ${art.nombre} | Precio: $${art.precio} | Stock: ${art.stock}`
            //cambiar de console a alert para mantener sintaxis y funcionamiento
          );
        });
        alert(resultado.message);
      }

      eraseArticulo() {
        let id = parseInt(prompt("Ingrese ID a eliminar"));
        if (isNaN(id) || id < 0) return alert("ID inválido");

        let resultado = this.model.eraseArticle(id);
        alert(resultado.message);
      }

      crearUsuario() {
        let username = prompt("Ingrese nombre de usuario:");
        if (!username) return alert("Nombre inválido");

        let password = prompt("Ingrese contraseña:");
        if (!password) return alert("Contraseña inválida");

        let role = prompt(
          "Ingrese rol (Administrador, Cliente, Vendedor, Trabajador):"
        );
        if (
          !["Administrador", "Cliente", "Vendedor", "Trabajador"].includes(role)
        ) {
          return alert("Rol inválido");
        }

        const resultado = this.model.addUser(username, password, role);
        alert(resultado.message);
      }
    }

export { LoginApplicationView };