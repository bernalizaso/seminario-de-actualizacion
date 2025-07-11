class APIModelAccess {
  constructor() {
    this._authData = new Map();
    this._maxLoginFailedAttempts = 3;

    this._productos = [
      { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 },
      { id: 4, nombre: "Detergente x 500mL", precio: 1102.45, stock: 2010 },
      {
        id: 22,
        nombre: "Jabon en polvo x 250g",
        precio: 650.22,
        stock: 407,
      },
    ];
    this._permissions = {
      Administrador: ["2", "3", "4", "5", "6", "7"],
      Cliente: ["2", "5"],
      Vendedor: ["2", "5"],
      Trabajador: ["2", "3", "4"],
    };

    this._authData.set("admin", {
      password: "Admin@123",
      failedLoginCounter: 0,
      isLocked: false,
      role: "Administrador",
    });
    this._authData.set("cliente", {
      password: "Cli#4567",
      failedLoginCounter: 0,
      isLocked: false,
      role: "Cliente",
    });
    this._authData.set("vendedor", {
      password: "Ven$89AB",
      failedLoginCounter: 0,
      isLocked: false,
      role: "Vendedor",
    });
    this._authData.set("deposito", {
      password: "Dep%2345",
      failedLoginCounter: 0,
      isLocked: false,
      role: "Trabajador",
    });
  }

  isValidUserGetData(u) {
    return this._authData.get(u);
  }

  authenticateUser(u, p) {
    let user = this.isValidUserGetData(u);
    if (!user) return { status: "ERROR", result: "USER_NOT_FOUND" };
    if (user.isLocked) return { status: "ERROR", result: "BLOCKED_USER" };
    if (user.password === p) return { status: "OK", result: "LOGIN_SUCCESS" };

    user.failedLoginCounter++;
    if (user.failedLoginCounter >= this._maxLoginFailedAttempts) {
      user.isLocked = true;
      return { status: "ERROR", result: "BLOCKED_USER" };
    }
    return { status: "ERROR", result: "USER_PASSWORD_FAILED" };
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
    let producto = this._productos.find((p) => p.id === id);
    if (producto) {
      return { status: "OK", result: producto };
    } else if (id < 0) {
      return { status: "ERROR", result: "Producto invalido" };
    } else {
      return { status: "ERROR", result: "Producto inexistente" };
    }
  }

  getArticles() {
    if (this._productos.length === 0) {
      return { status: "OK", result: [] };
    }
    return { status: "OK", result: this._productos };
  }

  eraseArticle(id) {
    let busqueda = this.searchArticle(id);
    if (busqueda.status === "ERROR") {
      return { status: "ERROR", result: "No se encontro el articulo" };
    }

    this._productos = this._productos.filter((p) => p.id !== id);
    return { status: "OK", result: "Articulo eliminado correctamente" };
  }

  editArticle(_id, price, _stock, name) {
    let busqueda = this.searchArticle(_id);
    if (busqueda.status === "ERROR") {
      return { status: "ERROR", result: "No se encontro el articulo" };
    }

    let producto = busqueda.result;
    producto.nombre = name;
    producto.stock = _stock;
    producto.precio = price;
    return { status: "OK", result: "Articulo editado exitosamente" };
  }

  addArticle(_id, price, _stock, name) {
    let existe = this.searchArticle(_id);
    if (existe.status === "OK") {
      return { status: "ERROR", result: "Ya hay un articulo con esa ID" };
    }

    let newProduct = {
      id: _id,
      nombre: name,
      precio: price,
      stock: _stock,
    };
    this._productos.push(newProduct);
    return { status: "OK", result: "Producto agregado exitosamente" };
  }

  changeArticleStock(cantidad, id) {
    let encontrado = this.searchArticle(id);
    if (encontrado.status === "ERROR") {
      return { status: "ERROR", result: encontrado.result };
    }

    let producto = encontrado.result;
    if (isNaN(producto.stock)) {
      return { status: "ERROR", result: "Stock invalido" };
    }
    if (producto.stock <= 0 || cantidad > producto.stock) {
      return { status: "ERROR", result: "No hay stock suficiente" };
    }

    producto.stock -= cantidad;
    return { status: "OK", result: "Stock cambiado exitosamente" };
  }

  addUser(username, password, role) {
    if (this._authData.has(username)) {
      return { status: "ERROR", result: "El nombre de usuario ya existe" };
    }
    const pwCheck = this.isPasswordSecure(password);
    if (!pwCheck.ok) {
      return {
        status: "ERROR",
        result: "Contraseña insegura: " + pwCheck.reason,
      };
    }
    if (!this._permissions[role]) {
      return { status: "ERROR", result: "Rol invalido" };
    }

    this._authData.set(username, {
      password: password,
      failedLoginCounter: 0,
      isLocked: false,
      role: role,
    });

    return { status: "OK", result: "Usuario creado exitosamente" };
  }
}

export { APIModelAccess };
