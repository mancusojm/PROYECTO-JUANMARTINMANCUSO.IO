const articulosCarrito = [];
const listaProductos = document.querySelector("#productos");

listaProductos.addEventListener('click', agregarProducto)

function agregarProducto(e){
    e.preventDefault()
    if(e.target.classList.contains('Al Carrito')){
        const producto = e.target.parentElement.parentElement;
        console.log(producto);
    }

    


    
}

