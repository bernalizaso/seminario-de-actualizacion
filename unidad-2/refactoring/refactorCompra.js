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

//Back



function changeArticleStock(cantidad, id) {
  encontrado = searchArticle(id);
  
  if (isNaN(encontrado.product.stock)) {
    return { message: "Stock invalido" };
  }
  else if(encontrado.product.stock <= 0 || cantidad > encontrado.product.stock) {
    return { message: "No hay stock suficiente" };  
  }
  else{
  encontrado.product.stock = encontrado.product.stock-cantidad;  
  return { message: "Stock cambiado exitosamente" };}
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

//front
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
    resultado = changeArticleStock(cantidad, id) 
    if (resultado.message === "Stock cambiado exitosamente") {
      alert("Articulo comprado exitosamente");
    } else {
      alert("El articulo no fue comprado");
    }
  }
}

buyArticle();


