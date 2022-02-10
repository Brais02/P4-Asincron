export {
    ComprobarCookie as ComprobarCookie
};

const getNotUrl = 'http://localhost:3001/auth/login/noticias'

const noticiasContainer = document.querySelector(".noticias-container");

async function getNoticias(token) {
    await fetch(getNotUrl, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    const response = await fetch(getNotUrl);
    const json = await response.json();
    console.log(json)
    recorrerNoticia(json)
}


function recorrerNoticia(noticias) {

    noticias.forEach(noticia => {

        // Por cada elemento del array le añadimos las respectivas etiquetas
        let titulo = document.createElement("h3");
        titulo.innerHTML = noticia.name;

        let imagen = document.createElement("img");
        imagen.classList.add("imagen-noticia")
        imagen.src = noticia.img;

        let texto = document.createElement("p");
        texto.innerHTML = noticia.motto;

        // Creacion de elementos DOM

        // Vamos insertanto cada elemento en el DOM

        let divNoticia = document.createElement("div");
        divNoticia.classList.add("noticia");

        let divInfoNoticia = document.createElement("div");
        divInfoNoticia.classList.add("info-noticia");
        divInfoNoticia.appendChild(titulo);

        let divGraficoNoticia = document.createElement("div");
        divGraficoNoticia.classList.add("grafico-noticia");
        divGraficoNoticia.appendChild(imagen);
        divGraficoNoticia.appendChild(texto);

        noticiasContainer.appendChild(divNoticia);
        divNoticia.appendChild(divInfoNoticia);
        divNoticia.appendChild(divGraficoNoticia);
    });
}

function ComprobarCookie() {
    if (document.cookie == "") {
        alert("No puedes ver las noticias, Registrate!")
    } else {
        var token = document.cookie
        token = token.split("access_token=")
        getNoticias(token)
    }
}