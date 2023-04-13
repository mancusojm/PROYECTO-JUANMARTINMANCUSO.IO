let articulosCarrito =  JSON.parse(localStorage.getItem("articulosCarrito")) || [];
const listaProductos = document.querySelector("#productos");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const carrito = document.querySelector('#carrito');

document.addEventListener('DOMContentLoaded', ()=>{

        fetch ('../data/datos.json')
            .then((data)=>{
                return data.json()
            })
            .then ((datos)=>{
                console.log(datos)
                renderProducts (datos)
            })
            .catch((err)=>{
                console.log(err)
            })


    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML ()
})

function renderProducts(datos){
    const contenido = document.querySelector('#productos')

    let html = ""

    datos.forEach(producto=>{
        html += `
                    <div class="card${producto.card_number}">
                        <img src="../assets/${producto.img}" alt="">
                        <div class="cardat">
                            <h3>${producto.name}</h3>
                            <p>€ ${producto.price}</p>
                            <a href="" class="ancla" data-id="${producto.id}">Al Carrito</a>
                        </div>
                    </div>
        `
    });
    contenido.innerHTML = html

}

listaProductos.addEventListener('click', agregarProducto)

vaciarCarritoBtn.addEventListener('click', vaciarCarrito)


carrito.addEventListener('click', eliminarProducto)

function eliminarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('vaciar')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)
        carritoHTML();
    }
}


function agregarProducto(evt){
    evt.preventDefault()
    if(evt.target.classList.contains('ancla')){
        const producto = evt.target.parentElement.parentElement;
        leerDatosProducto(producto)
    }

    
}

function leerDatosProducto(producto){
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    } 
    
    if(articulosCarrito.some( producto => producto.id === infoProducto.id)){
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto
            }else {
                return producto
            }
        })
        articulosCarrito = productos.slice()
    }else {
        
        articulosCarrito.push(infoProducto);
        
    }
    
    
    carritoHTML()
}

function carritoHTML(){
    contenedorCarrito.innerHTML = "";
    let contador = 0;
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100"/>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="vaciar" data-id="${producto.id}">X</a>
            </td>
        `;
        
        contenedorCarrito.appendChild(fila);
        contador += parseInt(producto.cantidad)
        
    })
    document.querySelector("#contador-carrito").textContent = contador;

    sincronizarStorage (); 
}
function sincronizarStorage () {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function vaciarCarrito(){
    articulosCarrito = [];

}



