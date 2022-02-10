export {
    CrearEventosFormulario as CrearEventosFormulario,
    ApiCoger as ApiCoger
};

var carpetaImagenes = ["deportes/", "musica/", "arte/", "sociales/"]
const columnaIzquierda = document.querySelector('.columna-izquierda');

/* API */
const myurl = "http://localhost:3000/eventos/";

function ApiCrear(objeto) {
    fetch(myurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                objeto
            })
        })
        .then(resp => resp.json())
}

async function ApiCoger(url) {
    const response = await fetch(url);
    const json = await response.json();

    console.info("Dades obtingudes:", json);
    if (columnaIzquierda == null) {
        GenerarEventos(json)
    } else {
        GenerarEventosIndex(json)
    }
}

//ELIMINAR EVENTOS

/* Para eliminar eventos añado un elemento id en html al icono 
de borrar cuyo valor es el ID del evento en cuestióny recojo 
ese ID y le digo que borre el evento con ese ID*/
function ApiBorrar() {
    var papelera = document.getElementsByClassName("papelera")

    for (let index = 0; index < papelera.length; index++) {
        papelera[index].onclick = function () {

            var id = this.id
            fetch(myurl + id, {
                    method: 'DELETE'
                })
                .then(response => response.json())
        }
    }
}

//CREANDO LOS EVENTOS
function CrearEventosFormulario() {

    /*Coge los datos del formulario y le quita los espacios de las esquinas*/
    var tituloFormulario = (document.getElementById("Titulo").value).trim();
    var lugarFormulario = (document.getElementById("Lugar").value).trim();
    var fechaFormulario = (document.getElementById("Fecha").value).trim();

    /*Si el formulario esta relleno crea un evento y añade los datos y los mete en la
    array, en caso contrario mostrara un mensaje de error*/
    var datosFormulario = ComprobarFormulario(tituloFormulario, lugarFormulario, fechaFormulario)
    if (datosFormulario == true) {
        var evento = new Object();
        evento.titulo = tituloFormulario

        if (document.getElementById("deportes").checked == true) {
            evento.imagen = "img/eventos/deportes/" + Math.floor(Math.random() * 3) + ".jpg";
        } else if (document.getElementById("musica").checked == true) {
            evento.imagen = "img/eventos/musica/" + Math.floor(Math.random() * 3) + ".jpg";
        } else if (document.getElementById("arte").checked == true) {
            evento.imagen = "img/eventos/arte/" + Math.floor(Math.random() * 3) + ".jpg";
        } else if (document.getElementById("sociales").checked == true) {
            evento.imagen = "img/eventos/sociales/" + Math.floor(Math.random() * 3) + ".jpg";
        } else {
            evento.imagen = "img/eventos/" + carpetaImagenes[Math.floor(Math.random() * 3)] + Math.floor(Math.random() * 2) + ".jpg";
        }

        evento.lugar = lugarFormulario
        evento.fecha = fechaFormulario
        ApiCrear(evento)

    } else {
        alert("No has introducido todos los datos!")
    }
}

/*Comprueba si el formulario ha sido rellenado o no*/
function ComprobarFormulario(titulo, lugar, fecha) {
    if (titulo != "" && lugar != "" && fecha != "") {
        return true
    } else {
        return false
    }
}


function GenerarEventos(objeto) {

    objeto.forEach(evento => {
        //Creando los elementos iniciales
        var articulo = document.createElement("article");
        articulo.classList.add("articulo");

        //Introduciendo los datos de los eventos
        var titulo = document.createElement("h3");
        titulo.innerHTML = evento.objeto.titulo

        var img = document.createElement("img");
        img.src = evento.objeto.imagen;
        img.classList.add("imagenobjeto-evento");

        var lugar = document.createElement("p");
        lugar.innerHTML = evento.objeto.lugar

        var fecha = document.createElement("p");
        fecha.innerHTML = evento.objeto.fecha

        //Creando las secciones de los eventos
        var figureTitulo = document.createElement("figure");
        figureTitulo.appendChild(titulo)

        var figureGrafico = document.createElement("figure");
        figureGrafico.appendChild(img)

        var figureTexto = document.createElement("figure");
        figureTexto.classList.add("texto");
        figureTexto.appendChild(lugar)
        figureTexto.appendChild(fecha)

        articulo.appendChild(figureTitulo)
        articulo.appendChild(figureGrafico)
        articulo.appendChild(figureTexto)

        //Eventos especiales
        var figureEventos = document.createElement("figure");
        figureEventos.classList.add("eventosEspeciales");

        var papelera = document.createElement("img")
        papelera.src = "img/iconos/papelera.svg"
        papelera.classList.add("papelera");
        papelera.setAttribute('id', evento.id);
        figureEventos.appendChild(papelera)

        var editar = document.createElement("img")
        editar.src = "img/iconos/editar.svg"
        editar.classList.add("editar");
        figureEventos.appendChild(editar)

        articulo.appendChild(figureEventos)



        salida.appendChild(articulo);
    })
    ApiBorrar()
}

function GenerarEventosIndex(objeto) {

    objeto.forEach(evento => {
        //Creando los elementos iniciales
        var salidaindex = document.getElementById("eventos")
        var articulo = document.createElement("article");
        articulo.classList.add("evento");

        //Introduciendo los datos de los eventos
        var titulo = document.createElement("h3");
        titulo.innerHTML = evento.objeto.titulo

        var img = document.createElement("img");
        img.src = evento.objeto.imagen
        img.classList.add("imagen-evento");

        var lugar = document.createElement("p");
        lugar.innerHTML = evento.objeto.lugar

        var fecha = document.createElement("p");
        fecha.innerHTML = evento.objeto.fecha

        //Creando las secciones de los eventos
        var figureTitulo = document.createElement("div");
        figureTitulo.classList.add("info-evento");
        figureTitulo.appendChild(titulo)

        var figureGrafico = document.createElement("div");
        figureGrafico.classList.add("grafico-evento");
        figureGrafico.appendChild(img)

        var figureTexto = document.createElement("div");
        figureTexto.classList.add("grafico-evento-texto");
        figureTexto.appendChild(lugar)
        figureTexto.appendChild(fecha)

        articulo.appendChild(figureTitulo)
        figureGrafico.appendChild(figureTexto)
        articulo.appendChild(figureGrafico)

        salidaindex.appendChild(articulo);
    })
}