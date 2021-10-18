/* // selector
const contadorBtn =$("#contadorBtn")
const totalCarro = $("#totalCarro")
const productos = $("#productos")*/

//carrito visual

$("#btnCarrito").click( (e) => {    
    $(".escondido").toggleClass("mostrado")
    e.stopPropagation()
})

//cerrar carro
$("body").click( () => {
    $(".escondido").removeClass("mostrado")
})    

$(".escondido").click( (e) => {
    e.stopPropagation()
})






//-----------------------------------------------mostrar array de productos al html------------------------------------------------------
    const mostrar = (arr) => {
        $("#contenedor").empty()

        arr.forEach( (juego) => {
        
        $("#contenedor").append(
            `
            <div class ="producto">
                <div class = "producto--Img">
                    <img src = ${juego.img}>
                </div>
                <div class = "producto--Info">
                    <p>Juego: ${juego.juego}</p>
                    <p>Precio: $${juego.precio}</p>
                    <p>Categoria: "${juego.categoria}"</p>
                    <button onclick="añadirAlCarro(${juego.id})"> COMPRAR </button>
                </div>
            </div>
            `
            )
        })
    }
mostrar(juegos)




// -----------------------------------------------------agregar al carro ----------------------------------------------------------------

const añadirAlCarro = (id) => {

    const enCarrito = carrito.find((prod) => prod.id === id)

    if (enCarrito){
        enCarrito.cantidad++
    }else{
        
        const producto = juegos.find ((juego) => juego.id === id)
    
        carrito.push({
            id: producto.id,
            juego: producto.juego,
            precio: producto.precio,
            cantidad: 1
        })
    }

    

    mostrarCarro()
}




//--------------------------------------------------------------pintar en el dom---------------------------------------------



    const mostrarCarro = () => {
        
        if (carritoLS){
            carrito = carritoLS
        }
    
        $("#productos").empty()
    
            carrito.forEach((prod) => {
                
                $("#productos").prepend(
                    `
                    <div class ="carrito"
                        <p>Producto : ${prod.juego}</p>
                        <p>Precio : ${prod.precio * prod.cantidad}</p>
                        <p>Cantidad : ${prod.cantidad}</p>
                        <button onclick = "borrarDelCarro(${prod.id})" value="Eliminar"> <span class="material-icons">
                        delete
                        </span></button>
                    </div/    
                    `
                )                                                    
            })
    
            
    
            localStorage.setItem("juegos",JSON.stringify(carrito))
            
    
        $("#contadorBtn").text(carrito.reduce((acc, prod) => acc += prod.cantidad,0)) 
        totalCarro.innerText = carrito.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)
    }





//------------------------------------------------ELIMINAR DEL CARRO y dom----------------------------------------------

const borrarDelCarro = (id) => {
    const producto = carrito.find ((prod) => prod.id === id)
    const index = carrito.indexOf(producto)

    if (producto.cantidad > 1){
        producto.cantidad--
    } else{ carrito.splice(index,1)}
    

    mostrarCarro()
}

let carritoLS = JSON.parse(localStorage.getItem("juegos"));
