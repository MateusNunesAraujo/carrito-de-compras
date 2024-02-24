//Variables
const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contendorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = []

cargarEventListener()
function cargarEventListener() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCursos)

    //Elimna cursos del carrito
    carrito.addEventListener('click',eliminarCurso)

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
    articulosCarrito = [] //Reseteamos el arreglo
    limpiarHTML();
    })
}

//Funciones

function agregarCursos(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
        /*   console.log(e.target.parentElement.parentElement.firstElementChild.src)
      console.log(e.target.parentElement.firstElementChild.textContent)
      console.log(e.target.parentElement.children[1].textContent)
      console.log(e.target.parentElement.children[3].firstElementChild.textContent) */
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id')

    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
    carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }
}

//Lee el contenido del HTML al que le distes click y extrae la información del curso
function leerDatosCurso(curso) {
    console.log(curso)

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

   
    //Revisa si un elemento ya existe dentro del carrito de compras
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //Actualizamos la cantidad 
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            } else {
                return curso
            }

        })
        articulosCarrito = [...cursos]
    } else {
        console.log(infoCurso)
        //Agregando elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

     /* articulosCarrito.push(infoCurso) */
     console.log(articulosCarrito)
     carritoHTML()

}



//Muestra el carrito de compras en el html
function carritoHTML() {

    //Limpiar HTML
    limpiarHTML()
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        //Usando destruction
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
    <td>
      <img src="${imagen}" alt="" width="100">
    </td>
    <td>
        ${titulo}
    </td>
    <td>
        ${precio}
    </td>
    <td>
        ${cantidad}
    </td>
    <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
    </td>
    `
        contendorCarrito.appendChild(row)
    })


}

//Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    /*  contendorCarrito.innerHTML = '' */
    while (contendorCarrito.firstChild) {
        contendorCarrito.removeChild(contendorCarrito.firstChild)
    }
}