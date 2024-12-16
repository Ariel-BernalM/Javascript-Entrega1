const juegos = [
  { nombre: "Producto A", precio: 30 },
  { nombre: "Producto B", precio: 50 },
  { nombre: "Producto C", precio: 70 },
  { nombre: "Producto D", precio: 50 },
  { nombre: "Producto E", precio: 50 },
];

let carrito = [];
let total = 0;

function mostrarJuegos() {
  let listaJuegos = "Productos disponibles:\n";
  for (let i = 0; i < juegos.length; i++) {
    listaJuegos += `${i + 1}. ${juegos[i].nombre} - $${juegos[i].precio}\n`;
  }

  let seleccion;
  let opcionValida = false;

  while (!opcionValida) {
    seleccion = prompt(
      `${listaJuegos}\nSelecciona el número del producto que deseas agregar al carrito:`
    );

    if (seleccion !== null && !isNaN(seleccion)) {
      seleccion = parseInt(seleccion, 10);
      if (seleccion >= 1 && seleccion <= juegos.length) {
        opcionValida = true;
        return seleccion - 1;
      } else {
        alert("Por favor, selecciona un número dentro del rango.");
      }
    } else {
      alert("Por favor, ingresa un número válido.");
    }
  }
}

function agregarAlCarrito(indice, cantidad) {
  if (indice >= 0 && indice < juegos.length && cantidad > 0) {
    const producto = juegos[indice];

    const productoExistente = carrito.find(
      (item) => item.nombre === producto.nombre
    );
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }

    total += producto.precio * cantidad;
    console.log(
      `${cantidad} unidad(es) de "${producto.nombre}" añadido(s) al carrito.`
    );
    console.log("Carrito actual:", carrito);
    console.log("Total actual: $" + total);
  } else {
    console.error(
      "Índice o cantidad inválidos. No se pudo agregar al carrito."
    );
  }
}

function editarCantidad(indice, nuevaCantidad) {
  if (indice.toLowerCase() === "volver") {
    return;
  }
  indice--;

  if (indice >= 0 && indice < carrito.length) {
    const producto = carrito[indice]; 
    if (nuevaCantidad > 0) {
      total -= producto.precio * producto.cantidad;
      producto.cantidad = nuevaCantidad;
      total += producto.precio * nuevaCantidad; 

      alert(
        `Cantidad actualizada para "${producto.nombre}". Nueva cantidad: ${nuevaCantidad}.`
      );
      console.log("Carrito actualizado:", carrito);
      console.log("Total actualizado: $" + total);
    } else {
      alert("La cantidad debe ser mayor a 0.");
    }
  } else {
    alert("Índice inválido. No se encontró el producto.");
  }
}

function eliminarDelCarrito(seleccion) {
  if (seleccion.toLowerCase() === "volver") {
    return; 
  }

  if (seleccion !== null && !isNaN(seleccion)) {
    seleccion = parseInt(seleccion, 10) - 1; 
    if (seleccion >= 0 && seleccion < carrito.length) {
      const productoEliminado = carrito[seleccion];
      total -= productoEliminado.precio * productoEliminado.cantidad;
      carrito.splice(seleccion, 1);

      alert(
        `El producto "${productoEliminado.nombre}" ha sido eliminado del carrito.`
      );
      console.log("Carrito actualizado:", carrito);
      console.log("Total actualizado: $" + total);
    } else {
      alert("Por favor, selecciona un número válido.");
    }
  } else {
    alert("Por favor, ingresa un número válido.");
  }
}

// Función para finalizar la compra
function realizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. No se puede realizar la compra.");
    return;
  }

  let confirmacion = prompt(
    "¿Deseas confirmar la compra? (Escribe 'si' para confirmar o 'volver' para regresar al menú)"
  );

  if (confirmacion.toLowerCase() === "volver") {
    return; // Volver al menú principal
  }

  if (confirmacion.toLowerCase() === "si") {
    console.log("Resumen de tu compra:");
    carrito.forEach((item) => {
      console.log(
        `${item.nombre} - $${item.precio} x ${item.cantidad} = $${
          item.precio * item.cantidad
        }`
      );
    });
    console.log(`Total: $${total}`);
    alert(`Gracias por tu compra. El total es $${total}.`);
    carrito = []; 
    total = 0;
  } else {
    alert("Opción no válida, volviendo al menú principal.");
  }
}

function tiendaVideoJuegos() {
  let continuar = true;

  while (continuar) {
    let seleccion = prompt(
      "Bienvenido a la tienda de Videojuegos\n Elige una opción:\n1. Agregar producto al carrito\n2. Eliminar producto del carrito\n3. Editar cantidad de producto\n4. Finalizar compra"
    );

    switch (seleccion) {
      case "1":
        const indice = mostrarJuegos(); 
        const cantidad = parseInt(
          prompt(
            "Escribe la cantidad del producto que deseas agregar al carrito:"
          ),
          10
        );

        if (!isNaN(cantidad) && cantidad > 0) {
          agregarAlCarrito(indice, cantidad); 
        } else {
          alert("Por favor, ingresa una cantidad válida.");
        }
        break;

      case "2":
        if (carrito.length === 0) {
          alert("El carrito está vacío. No hay productos para eliminar.");
          break;
        }

        let listaCarrito = "Productos en tu carrito:\n";
        for (let i = 0; i < carrito.length; i++) {
          listaCarrito += `${i + 1}. ${carrito[i].nombre} - Cantidad: ${
            carrito[i].cantidad
          } - Total: $${carrito[i].precio * carrito[i].cantidad}\n`;
        }
        let seleccionEliminar = prompt(
          `${listaCarrito}\nEscribe el número del producto que deseas eliminar o 'volver' para regresar al menú:`
        );
        eliminarDelCarrito(seleccionEliminar);

        break;

      case "3":
        if (carrito.length === 0) {
          alert("El carrito está vacío. No hay productos para editar.");
          break;
        }

        let listaCarritoEditar = "Productos en tu carrito:\n";
        for (let i = 0; i < carrito.length; i++) {
          listaCarritoEditar += `${i + 1}. ${carrito[i].nombre} - Cantidad: ${
            carrito[i].cantidad
          } - Total: $${carrito[i].precio * carrito[i].cantidad}\n`;
        }
        let seleccionEditar = prompt(
          `${listaCarritoEditar}\nEscribe el número del producto que deseas editar o 'volver' para regresar al menú:`
        );
        let nuevaCantidad = prompt("Escribe la nueva cantidad:");

        editarCantidad(seleccionEditar, parseInt(nuevaCantidad, 10));
        break;

      case "4":
        continuar = false;
        realizarCompra();
        break;

      default:
        console.log("Opción no válida, por favor elige una opción correcta.");
        break;
    }
  }
}


tiendaVideoJuegos();
