let nameUser;

const Errores = document.querySelector("#errores");
const Resetear = document.querySelector("#Resetear");

//Para API
const logUrl = "http://localhost:3001/auth/login"
const getNotUrl = 'http://localhost:3001/auth/login/noticias'

window.onload = function () {
    document.getElementById("Enviar").onclick = function () {
        Login()
    }
}

function Login() {
    
    let user = (document.getElementById("Correo").value).trim();
    let password = (document.getElementById("Contrasena").value).trim();

console.log(password)
    fetch(logUrl, {
            method: 'GET',
            headers: {
                Authorization: 'Basic ' + btoa(user + ':' + password)
            }
        })
        .then(function (respuesta) {
            if (respuesta.status !== 200) {
                alert("Error")
            } else {
                return respuesta.json()
            }
        })
        .then(data => {
            console.log(data)
            crearCookieUser(data)
        })
}


function crearCookieUser(datos) {
    var fechaGalleta = new Date();
    fechaGalleta.setTime(fechaGalleta.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = `access_token=${datos.access_token}`;
    window.location.replace("index.html");
}