class APIModelAccess {
  constructor() {
    this._authData = new Map();
    this._maxLoginFailedAttempts = 3;

    const storedProductos = sessionStorage.getItem("productos");
    this._productos = storedProductos
      ? JSON.parse(storedProductos)
      : [
          { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 },
          { id: 4, nombre: "Detergente x 500mL", precio: 1102.45, stock: 2010 },
          {
            id: 22,
            nombre: "Jabon en polvo x 250g",
            precio: 650.22,
            stock: 407,
          },
        ];
    this._saveProductos();

    this._permissions = {
      Administrador: ["2", "3", "4", "5", "6", "7"],
      Cliente: ["2", "5"],
      Vendedor: ["2", "5"],
      Trabajador: ["2", "3", "4"],
    };

    const defaultUsers = {
      admin: {
        password: "Admin@123",
        failedLoginCounter: 0,
        isLocked: false,
        role: "Administrador",
      },
      cliente: {
        password: "Cli#4567",
        failedLoginCounter: 0,
        isLocked: false,
        role: "Cliente",
      },
      vendedor: {
        password: "Ven$89AB",
        failedLoginCounter: 0,
        isLocked: false,
        role: "Vendedor",
      },
      deposito: {
        password: "Dep%2345",
        failedLoginCounter: 0,
        isLocked: false,
        role: "Trabajador",
      },
    };

    const storedUsers = sessionStorage.getItem("usuarios");
    const usuarios = storedUsers ? JSON.parse(storedUsers) : defaultUsers;
    for (let username in usuarios) {
      this._authData.set(username, usuarios[username]);
    }
    this._saveUsers();
  }

  _saveProductos() {
    sessionStorage.setItem("productos", JSON.stringify(this._productos));
  }

  _saveUsers() {
    const obj = {};
    for (let [k, v] of this._authData.entries()) {
      obj[k] = v;
    }
    sessionStorage.setItem("usuarios", JSON.stringify(obj));
  }

  isValidUserGetData(u) {
    return this._authData.get(u);
  }

  authenticateUser(u, p) {
    let api = { status: false, result: null };
    let user = this.isValidUserGetData(u);
    if (!user) api.result = "USER_NOT_FOUND";
    else if (user.isLocked) api.result = "BLOCKED_USER";
    else if (user.password === p) {
      api.status = true;
    } else {
      user.failedLoginCounter += 1;
      if (user.failedLoginCounter >= this._maxLoginFailedAttempts) {
        user.isLocked = true;
        api.result = "BLOCKED_USER";
      } else api.result = "USER_PASSWORD_FAILED";
    }
    this._saveUsers();
    return api;
  }

  isPasswordSecure(pw) {
    if (!pw || pw.length < 8 || pw.length > 16)
      return { ok: false, reason: "longitud 8-16" };
    if (!/[A-Z]/.test(pw)) return { ok: false, reason: "una mayuscula" };
    let s = pw.match(/[^A-Za-z0-9]/g);
    if (!s || s.length < 2)
      return { ok: false, reason: "dos simbolos especiales" };
    return { ok: true };
  }

  getMaxLoginAttempts() {
    return this._maxLoginFailedAttempts;
  }

  searchArticle(id) {
    for (let i = 0; i < this._productos.length; i++) {
      if (this._productos[i].id === id) {
        return {
          product: this._productos[i],
          message: "Producto encontrado",
        };
      }
    }
    if (id < 0) {
      return { product: "no encontrado", message: "Producto invalido" };
    } else {
      return { product: "no encontrado", message: "Producto inexistente" };
    }
  }

  getArticles() {
    if (this._productos.length === 0) {
      return { articles: [], message: "no hay articulos" };
    }
    return { articles: this._productos, message: "productos listados" };
  }

  eraseArticle(id) {
    let existe = this.searchArticle(id);
    if (existe.message !== "Producto encontrado") {
      return { message: "No se encontro el articulo" };
    }
    let index = this._productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      this._productos.splice(index, 1);
      this._saveProductos();
      return { message: "El articulo fue eliminado correctamente" };
    } else {
      return { message: "Error al eliminar el articulo" };
    }
  }

  editArticle(_id, price, _stock, name) {
    let existe = this.searchArticle(_id);
    if (existe.message !== "Producto encontrado") {
      return { message: "No se encontro el articulo" };
    }
    let producto = existe.product;
    producto.nombre = name;
    producto.stock = _stock;
    producto.precio = price;
    this._saveProductos();
    return { message: "El articulo fue editado exitosamente" };
  }

  addArticle(_id, price, _stock, name) {
    let existe = this.searchArticle(_id).message;
    if (existe === "Producto encontrado") {
      return { message: "Ya hay un articulo con esa id" };
    }
    let newProduct = {
      id: _id,
      nombre: name,
      precio: price,
      stock: _stock,
    };
    this._productos.push(newProduct);
    this._saveProductos();
    return { message: "Producto agregado exitosamente" };
  }

  changeArticleStock(cantidad, id) {
    let encontrado = this.searchArticle(id);
    if (isNaN(encontrado.product.stock)) {
      return { message: "Stock invalido" };
    } else if (
      encontrado.product.stock <= 0 ||
      cantidad > encontrado.product.stock
    ) {
      return { message: "No hay stock suficiente" };
    } else {
      encontrado.product.stock -= cantidad;
      this._saveProductos();
      return { message: "Stock cambiado exitosamente" };
    }
  }

  addUser(username, password, role) {
    if (this._authData.has(username)) {
      return { ok: false, message: "El nombre de usuario ya existe" };
    }
    const pwCheck = this.isPasswordSecure(password);
    if (!pwCheck.ok) {
      return {
        ok: false,
        message: "Contraseña insegura: " + pwCheck.reason,
      };
    }
    if (!this._permissions[role]) {
      return { ok: false, message: "Rol inválido" };
    }

    this._authData.set(username, {
      password: password,
      failedLoginCounter: 0,
      isLocked: false,
      role: role,
    });
    this._saveUsers();
    return { ok: true, message: "Usuario creado exitosamente" };
  }
}

export { APIModelAccess };

//_marcados como nuevos metodos 

//Si se trabaja sobre una misma pestaña, los cambios (por ejemplo, en stock)
//se mantienen al recargar la pagina, al cambiar de usuario y se transpolan a 
//cualquiera con acceso a la aplicacion.
//A diferencia con el refactoring original, aca tenemos que parcear los objetos a Json
//ya que, si bien se puede trabajar  y convertir cadenas integers u otros datos primitivos
//no puede guardar objetos directamente, por lo que hay que cambiar a json