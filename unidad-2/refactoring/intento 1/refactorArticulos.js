_authData = new Map();
_maxLoginFailedAttempts = 3;
_productos = [
  { id: 1, nombre: "Lavandina x 1L", precio: 875.25, stock: 3000 },
  { id: 4, nombre: "Detergente x 500mL", precio: 1102.45, stock: 2010 },
  { id: 22, nombre: "Jabon en polvo x 250g", precio: 650.22, stock: 407 },
];
_permissions = {
  Administrador: ["2", "3", "4", "5", "6", "8"],
  Cliente: ["2", "5"],
  Vendedor: ["2", "5"],
  Trabajador: ["2", "3", "4"],
};

_authData.set("admin", {
  password: "Admin@123",
  failedLoginCounter: 0,
  isLocked: false,
  role: "Administrador",
});
_authData.set("cliente", {
  password: "Cli#4567",
  failedLoginCounter: 0,
  isLocked: false,
  role: "Cliente",
});
_authData.set("vendedor", {
  password: "Ven$89AB",
  failedLoginCounter: 0,
  isLocked: false,
  role: "Vendedor",
});
_authData.set("deposito", {
  password: "Dep%2345",
  failedLoginCounter: 0,
  isLocked: false,
  role: "Trabajador",
});

//separacion
function eliminarArticulo() {
  let id = parseInt(prompt("ingrese id a eliminar"));
  if (isNaN(id) || id <= -1) {
    alert("Id invalido");
    return;
  }
  resultado = eraseArticle(id);
  alert(resultado.message);
}
///////////////Back////////////////////
function eraseArticle(id) {
  existe = searchArticle(id);
  if (existe.message !== "Producto encontrado") {
    return { message: "No se encontro el articulo" };
  }

  index = -1;
  for (i = 0; i < _productos.length; i++) {
    if (id === _productos[i].id) {
      index = i;
    }
  }
  if (index !== -1) {
    _productos.splice(index, 1);
    return { message: "El articulo fue eliminado correctamente" };
  } else {
    return { message: "Error al eliminar el articulo" };
  }
}

function editArticle(_id, price, _stock, name) {
  existe = searchArticle(_id);
  if (existe.message !== "Producto encontrado") {
    return { message: "No se encontro el articulo" };
  }
  producto = existe.product;
  producto.nombre = name;
  producto.stock = _stock;
  producto.precio = price;
  return { message: "El articulo fue editado exitosamente" };
}

function addArticle(_id, price, _stock, name) {
  existe = searchArticle(_id).message;
  if (existe === "Producto encontrado") {
    return { message: "Ya hay un articulo con esa id" };
  }
  newProduct = { id: _id, nombre: name, precio: price, stock: _stock };
  _productos.push(newProduct);
  return { message: "Producto agregado exitosamente" };
}

function changeArticleStock(cantidad, id) {
  encontrado = searchArticle(id);

  if (isNaN(encontrado.product.stock)) {
    return { message: "Stock invalido" };
  } else if (
    encontrado.product.stock <= 0 ||
    cantidad > encontrado.product.stock
  ) {
    return { message: "No hay stock suficiente" };
  } else {
    encontrado.product.stock = encontrado.product.stock - cantidad;
    return { message: "Stock cambiado exitosamente" };
  }
}

function searchArticle(id) {
  for (let i = 0; i < _productos.length; i++) {
    if (_productos[i].id === id) {
      return { product: _productos[i], message: "Producto encontrado" };
    }
  }
  if (id < 0) {
    return { product: "no encontrado", message: "Producto invalido" };
  } else {
    return { product: "no encontrado", message: "Producto inexistente" };
  }
}

function getArticles() {
  if (_productos.length === 0) {
    return { articles: [], message: "no hay articulos" };
  }
  return { articles: _productos, message: "productos listados" };
}

////////////front///////////////
function editarArticulo() {
  let id = parseInt(prompt("ingrese id a editar"));
  if (isNaN(id) || id <= -1) {
    alert("Id invalido");
    return;
  }
  let nombre = prompt("ingrese nuevo nombre");
  if (!nombre) {
    alert("El producto debe tener un nombre");
    return;
  }

  let precio = parseFloat(prompt("ingrese nuevo precio"));
  if (isNaN(precio) || id <= -1) {
    alert("Precio invalido");
    return;
  }
  let stock = parseInt(prompt("ingrese nuevo stock"));
  if (isNaN(stock) || id <= -1) {
    alert("Stock invalido");
    return;
  }

  resultado = editArticle(id, precio, stock, nombre);
  alert(resultado.message);
}
function nuevoArticulo() {
  let id = parseInt(prompt("ingrese id"));

  if (isNaN(id) || id <= -1) {
    alert("id invalido");
    return;
  }
  let nombre = prompt("ingrese nombre");
  if (!nombre) {
    alert("El producto debe tener un nombre");
    return;
  }
  let precio = parseFloat(prompt("ingrese precio"));
  if (isNaN(precio)) {
    alert("El producto debe tener un precio y ser numerico");
    return;
  }
  let stock = parseInt(prompt("ingrese stock"));
  if (isNaN(stock)) {
    alert("Stock invalido");
    return;
  }
  producto = addArticle(id, precio, stock, nombre);
  alert(producto.message);
}

function buyArticle() {
  let id = parseInt(prompt("ingrese id a comprar"));

  if (isNaN(id) || id <= -1) {
    alert("Id del producto invalida");
    return;
  }
  let cantidad = parseInt(prompt("ingrese cantidad a comprar"));
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("cantidad invalida");
    return;
  } else {
    resultado = changeArticleStock(cantidad, id);
    if (resultado.message === "Stock cambiado exitosamente") {
      alert("Articulo comprado exitosamente");
      return;
    } else {
      alert("El articulo no fue comprado");
      return;
    }
  }
}

function listArticles() {
  productos = getArticles();
  lista = productos.articles;

  for (let i = 0; i < lista.length; i = i + 1) {
    console.log(lista[i]);
  }
  alert(productos.message);
}


