// VARIABLES 
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

// Contenedor para los resultados
const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear()
const min = max - 10

// Generar año con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


// EVENTOS 
document.addEventListener('DOMContentLoaded', () => {

    // Muestra los automóviles al cargar
    mostrarAutos(autos)

    //llenar las opciones de años
    llenarSelect()

})


// Event listener para los select de búsqueda
marca.addEventListener('change', (e) => {
    // Asignando valor de la opción seleccionada
    datosBusqueda.marca = e.target.value

    filtrarAuto()
})

year.addEventListener('change', (e) => {
    // Convirtiendo el año a int porque el formulario lo devuelve como string
    datosBusqueda.year = parseInt(e.target.value)

    filtrarAuto()
})

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = parseInt(e.target.value)

    filtrarAuto()
})

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = parseInt(e.target.value)

    filtrarAuto()
})

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value)

    filtrarAuto()
})

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value

    filtrarAuto()
})

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value
    // console.log( datosBusqueda )
    filtrarAuto()

})




//* FUNCIONES
const mostrarAutos = (autos) => {

    // Eliminandno el HTML previo   
    limpiarHTML()

    autos.forEach(auto => {

        const { marca, modelo, year, puertas, transmision, precio, color } = auto

        const autoHTML = document.createElement('p')
        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `

        // Insertar en el HTML
        resultado.appendChild(autoHTML)
    })
}


// Limpiar HTML
const limpiarHTML = () => {
    while( resultado.firstChild ){
        resultado.removeChild( resultado.firstChild ) 
    }
}


// Genera los años del select
const llenarSelect = () => {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option')
        opcion.value = i
        opcion.textContent = i

        // Agrega las opciones de año al select
        year.appendChild(opcion)
        
    }
}


const filtrarAuto = () => {
    /** 
     * 
     * APLICANDO PROGRAMACIÓN FUNCIONAL
     * Dentro del filter tendrá una función de alto nivel, que es una función que toma como parámetro otra función    
     *   
    *  Filtrando primero por marca, año
    */
    const resultado = autos
        .filter(filtrarMarca)
        .filter( filtrarYear )
        .filter( filtrarMinimo )
        .filter( filtrarMaximo )
        .filter( filtrarPuertas )
        .filter( filtrarTransmision )
        .filter( filtrarColor )

        
        
    if ( resultado.length ){
        // Mostrar el filtro en el HTML
        mostrarAutos(resultado)
    } else {
        sinResultados()
    }
}



const sinResultados = () => {

    limpiarHTML()    
    
    const sinResultado = document.createElement('div')
    sinResultado.classList.add('alerta', 'error')
    sinResultado.textContent = 'Sin resultados. Intenta con otros filtros'
    resultado.appendChild( sinResultado )
}


const filtrarMarca = (auto) => {
    const { marca } = datosBusqueda
    // Si se selecciona una marca se busca la propiedad marca que tiene valor
    if ( marca ){
        return auto.marca === marca
    }

    // Si no se selecciona nada se manda el arreglo completo
    return auto 
}



const filtrarYear = (auto) => {
    const { year } = datosBusqueda
    if ( year ){
        return auto.year === year   
    }

    return auto 
}


const filtrarMinimo = (auto) => {
    const { minimo } = datosBusqueda
    if ( minimo ){
        return auto.precio >= minimo   
    }

    return auto 
}


const filtrarMaximo = (auto) => {
    const { maximo } = datosBusqueda
    if ( maximo ){
        return auto.precio <= maximo   
    }

    return auto 
}


const filtrarPuertas = (auto) => {
    const { puertas } = datosBusqueda
    if ( puertas ){
        return auto.puertas === puertas   
    }

    return auto 
}

const filtrarTransmision = (auto) => {
    const { transmision } = datosBusqueda
    if ( transmision ){
        return auto.transmision === transmision   
    }

    return auto 
}

const filtrarColor = (auto) => {
    const { color } = datosBusqueda
    if ( color ){
        return auto.color === color   
    }

    return auto 
}
