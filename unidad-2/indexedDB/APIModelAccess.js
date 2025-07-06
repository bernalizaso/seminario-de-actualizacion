//APIModelAccess.js implementado con indexedDB y metodos async/await
class APIModelAccess {
  constructor() {
    this._dbName = "MyAppDB";
    this._dbVersion = 1;
    this._db = null;
    this._maxLoginFailedAttempts = 3;

    this._permissions = {
      Administrador: ["2", "3", "4", "5", "6", "7"],
      Cliente: ["2", "5"],
      Vendedor: ["2", "5"],
      Trabajador: ["2", "3", "4"],
    };
  }

  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._dbName, this._dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains("productos")) {
          db.createObjectStore("productos", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("usuarios")) {
          const userStore = db.createObjectStore("usuarios", { keyPath: "username" });
          userStore.createIndex("username", "username", { unique: true });
        }
      };

      request.onsuccess = (event) => {
        this._db = event.target.result;
        this._initDefaultData().then(resolve).catch(reject);
      };

      request.onerror = (event) => reject("Error al abrir IndexedDB: " + event.target.errorCode);
    });
  }

  async _initDefaultData() {
    await this._insertDefaultProducts();
    await this._insertDefaultUsers();
  }

  async _insertDefaultProducts() {
    const defaultProducts = [
      { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 },
      { id: 4, nombre: "Detergente x 500mL", precio: 1102.45, stock: 2010 },
      { id: 22, nombre: "Jabon en polvo x 250g", precio: 650.22, stock: 407 },
    ];

    for (const product of defaultProducts) {
      const exists = await this.searchArticle(product.id);
      if (exists.message !== "Producto encontrado") {
        await this._addToStore("productos", product);
      }
    }
  }

  async _insertDefaultUsers() {
    const defaultUsers = [
      { username: "admin", password: "Admin@123", failedLoginCounter: 0, isLocked: false, role: "Administrador" },
      { username: "cliente", password: "Cli#4567", failedLoginCounter: 0, isLocked: false, role: "Cliente" },
      { username: "vendedor", password: "Ven$89AB", failedLoginCounter: 0, isLocked: false, role: "Vendedor" },
      { username: "deposito", password: "Dep%2345", failedLoginCounter: 0, isLocked: false, role: "Trabajador" },
    ];

    for (const user of defaultUsers) {
      const existing = await this.isValidUserGetData(user.username);
      if (!existing) await this._addToStore("usuarios", user);
    }
  }

  async _addToStore(storeName, value) {
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction([storeName], "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.put(value);

      request.onsuccess = () => resolve();
      request.onerror = () => reject("Error al agregar en " + storeName);
    });
  }

  async searchArticle(id) {
    return new Promise((resolve) => {
      const tx = this._db.transaction(["productos"], "readonly");
      const store = tx.objectStore("productos");
      const request = store.get(id);

      request.onsuccess = () => {
        const product = request.result;
        if (product) resolve({ product, message: "Producto encontrado" });
        else resolve({ product: "no encontrado", message: id < 0 ? "Producto invalido" : "Producto inexistente" });
      };

      request.onerror = () => resolve({ product: "no encontrado", message: "Error buscando producto" });
    });
  }

  async getArticles() {
    return new Promise((resolve) => {
      const tx = this._db.transaction(["productos"], "readonly");
      const store = tx.objectStore("productos");
      const request = store.getAll();

      request.onsuccess = () => {
        const articles = request.result;
        if (articles.length === 0) resolve({ articles: [], message: "no hay articulos" });
        else resolve({ articles, message: "productos listados" });
      };

      request.onerror = () => resolve({ articles: [], message: "Error listando productos" });
    });
  }

  async addArticle(_id, price, _stock, name) {
    const exists = await this.searchArticle(_id);
    if (exists.message === "Producto encontrado") return { message: "Ya hay un articulo con esa id" };

    const newProduct = { id: _id, nombre: name, precio: price, stock: _stock };
    await this._addToStore("productos", newProduct);
    return { message: "Producto agregado exitosamente" };
  }

  async editArticle(_id, price, _stock, name) {
    const existe = await this.searchArticle(_id);
    if (existe.message !== "Producto encontrado") return { message: "No se encontro el articulo" };

    const producto = existe.product;
    producto.nombre = name;
    producto.stock = _stock;
    producto.precio = price;

    await this._addToStore("productos", producto);
    return { message: "El articulo fue editado exitosamente" };
  }

  async eraseArticle(id) {
    const existe = await this.searchArticle(id);
    if (existe.message !== "Producto encontrado") return { message: "No se encontro el articulo" };

    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(["productos"], "readwrite");
      const store = tx.objectStore("productos");
      const request = store.delete(id);

      request.onsuccess = () => resolve({ message: "El articulo fue eliminado correctamente" });
      request.onerror = () => reject({ message: "Error al eliminar el articulo" });
    });
  }

  async changeArticleStock(cantidad, id) {
    const encontrado = await this.searchArticle(id);
    if (encontrado.message !== "Producto encontrado" || isNaN(encontrado.product.stock)) {
      return { message: "Stock invalido" };
    } else if (encontrado.product.stock <= 0 || cantidad > encontrado.product.stock) {
      return { message: "No hay stock suficiente" };
    } else {
      encontrado.product.stock -= cantidad;
      await this._addToStore("productos", encontrado.product);
      return { message: "Stock cambiado exitosamente" };
    }
  }

  async isValidUserGetData(username) {
    return new Promise((resolve) => {
      const tx = this._db.transaction(["usuarios"], "readonly");
      const store = tx.objectStore("usuarios");
      const request = store.get(username);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }

  async authenticateUser(u, p) {
    let api = { status: false, result: null };
    let user = await this.isValidUserGetData(u);

    if (!user) api.result = "USER_NOT_FOUND";
    else if (user.isLocked) api.result = "BLOCKED_USER";
    else if (user.password === p) api.status = true;
    else {
      user.failedLoginCounter += 1;
      if (user.failedLoginCounter >= this._maxLoginFailedAttempts) {
        user.isLocked = true;
        api.result = "BLOCKED_USER";
      } else api.result = "USER_PASSWORD_FAILED";
      await this._addToStore("usuarios", user);
    }
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

  async addUser(username, password, role) {
    const existing = await this.isValidUserGetData(username);
    if (existing) return { ok: false, message: "El nombre de usuario ya existe" };

    const pwCheck = this.isPasswordSecure(password);
    if (!pwCheck.ok) return { ok: false, message: "Contraseña insegura: " + pwCheck.reason };

    if (!this._permissions[role]) return { ok: false, message: "Rol invalido" };

    const newUser = { username, password, failedLoginCounter: 0, isLocked: false, role };
    await this._addToStore("usuarios", newUser);

    return { ok: true, message: "Usuario creado exitosamente" };
  }
}

export { APIModelAccess };
