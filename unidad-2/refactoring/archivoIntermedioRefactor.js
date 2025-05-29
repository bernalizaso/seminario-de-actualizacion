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

console.log(_authData.get("vendedor"));

function comprarArticulo() {
  //backfront
  let id = parseInt(prompt("ingrese id a comprar"));
  let idx = -1;
  for (let i = 0; i < productos.length; i = i + 1) {
    if (productos[i].id === id) {
      idx = i;
      break;
    }
  }
  if (idx < 0) {
    alert("articulo no valido");
    return;
  }
  let a = productos[idx];
  if (a.stock <= 0) {
    alert("sin stock disponible");
    return;
  }
  let c = parseInt(prompt("ingrese cantidad a comprar"));
  if (isNaN(c) || c <= 0) {
    alert("cantidad invalida");
    return;
  }
  if (c > a.stock) {
    alert("no hay suficiente stock");
    return;
  }
  a.stock = a.stock - c;
  alert("compra realizada. stock restante: " + a.stock);
}
