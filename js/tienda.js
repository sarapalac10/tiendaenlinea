const camiseta = document.getElementById("producto");
const botonCompra = document.getElementById("Agregar-carrito");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content; 
const fragment = document.createDocumentFragment();
let carrito = {};

camiseta.addEventListener("click", (e) => {
  addCarrito(e);
});

let talla = document.getElementById("talla-elegida");

const addCarrito = (e) => {
  // console.log(e.target.classList.contains('formulario__submit'))
  if (e.target.classList.contains("formulario__submit")) {
    // console.log(e.target.parentElement);
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (objeto) => {
  /* console.log(objeto); */
  const producto = {
    id: objeto.querySelectorAll("p")[3].textContent,
    title: objeto.querySelectorAll("p")[1].textContent,
    precio: objeto.querySelectorAll("p")[2].textContent,
    tallaSelec: talla.options[talla.selectedIndex].value,
    cantidad: document.getElementById("cantidad-elegida").value,
  };

  /* if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad ;
  } */

  carrito[producto.id] = { ...producto };
  pintarCarrito();
  console.log(carrito);
};

//Pintar carrito'
const pintarCarrito = () => {
    console.log(carrito);
    items.innerHTML = "";
    Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.title;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio;

    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarFooter();

    
  
    localStorage.setItem('carrito', JSON.stringify(carrito))
}; 

  
const pintarFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(carrito).length === 0) {
      footer.innerHTML = ` <th scope="row" colspan="5">Su carrito está vacío</th> `;
      return
    }
  
    const nCantidad = Object.values(carrito).reduce(
      (acc, { cantidad }) => acc + cantidad,
      0
    );
    const nPrecio = Object.values(carrito).reduce(
      (acc, { cantidad, precio }) => acc + cantidad * precio,
      0
    );
  
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;
  
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment)
  
    //Vaciar carrito
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
  };
  
  const btnAccion = e => {
      console.log(e.target);
          //Botón de aumentar
      if(e.target.classList.contains('btn-info')) {
          console.log(carrito[e.target.dataset.id])
  
          const producto = carrito[e.target.dataset.id]
          producto.cantidad++
          carrito[e.target.dataset.id] = {...producto}
          pintarCarrito()
      }
          //Botón de disminuir
      if(e.target.classList.contains('btn-danger')) {
          const producto = carrito[e.target.dataset.id]
          producto.cantidad--
          if(producto.cantidad === 0 ) {
              delete carrito[e.target.dataset.id]
          }
          pintarCarrito()
      }
  
      e.stopPropagation();
  } 