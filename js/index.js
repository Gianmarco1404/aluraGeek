document.addEventListener("DOMContentLoaded", () => {
  const apiURL =
    "https://my-json-server.typicode.com/Gianmarco1404/productos-geek-api/productos";

  // Cargar productos desde la API
  async function cargarProductos() {
    const response = await fetch(apiURL);
    const productos = await response.json();
    mostrarProductos(productos);
  }

  // Mostrar productos en la interfaz
  function mostrarProductos(productos) {
    const contenedor = document.getElementById("mis-productos");
    const mensaje = document.getElementById("mensaje-no-productos");
    contenedor.innerHTML = "";
    console.log(mensaje);

    if (productos.length === 0) {
      mensaje.style.display = "block";
    } else {
      mensaje.style.display = "none";
      productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
                  <img src="${producto.imagen}" alt="${producto.nombre}">
                  <div class="contenedor-informacion-producto">
                      <p>${producto.nombre}</p>
                      <div class="contenedor-valor-producto">
                          <p>$${producto.precio.toFixed(2)}</p> 
                          <i class="fa-solid fa-trash" onclick="eliminarProducto(${
                            producto.id
                          })"></i>
                      </div>
                  </div>
              `;
        contenedor.appendChild(productoDiv);
      });
    }
  }

  // Función para agregar producto a la interfaz
  function agregarProducto(producto) {
    const contenedor = document.getElementById("mis-productos");
    const mensaje = document.getElementById("mensaje-no-productos");
    mensaje.style.display = "none";
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
                  <div class="contenedor-informacion-producto">
                      <p>${producto.nombre}</p>
                      <div class="contenedor-valor-producto">
                          <p>$${producto.precio.toFixed(2)}</p> 
                          <i class="fa-solid fa-trash" onclick="eliminarProducto(${
                            producto.id
                          })"></i>
                      </div>
                  </div>
      `;
    contenedor.appendChild(productoDiv);
  }

  // Eliminar producto
  window.eliminarProducto = function (id) {
    const productos = document.querySelectorAll(".producto");
    productos.forEach((producto) => {
      if (producto.querySelector("i").onclick.toString().includes(id)) {
        producto.remove();
      }
    });
    verificarProductos();
  };

  // Verificar si hay productos y mostrar/ocultar mensaje
  function verificarProductos() {
    const productos = document.querySelectorAll(".producto");
    const mensaje = document.getElementById("mensaje-no-productos");
    if (productos.length == 0) {
      mensaje.style.display = "block";
    } else {
      mensaje.style.display = "none";
    }
  }

  // Agregar nuevo producto
  document
    .getElementById("form-agregar-producto")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevoProducto = {
        id: Date.now(),
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value,
      };
      agregarProducto(nuevoProducto);
    });

  // Inicializar la carga de productos
  cargarProductos();
});
