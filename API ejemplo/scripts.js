
const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

//Se crea una variable llamada "request" y se le asigna el objeto XMLHttpRequest
var request = new XMLHttpRequest()

//Se abre la conección, usando un GET en el endpoint de la API
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function(){
    //Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if(request.status >= 200 && request.status < 400){
        data.forEach(movie => {
            //Se crea un div con la clase "card"
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            //Se crea un título h1 y se le asigna el título de cada película
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            //Crear el párrafo con etiqueta p en donde se guardará la descripción de la pelúcula
            const p = document.createElement('p');
            movie.description = movie.description.substring (0, 300); //se limita a 300 caracteres
            p.textContent = `${movie.description}...`;

            //Se adjunta el elemento card al elemento contenedor
            container.appendChild(card);

            //Cada card contendrá su título y su párrafo, por ello se adjuntan también
            card.appendChild(h1);
            card.appendChild(p);
        })
    }
    else{
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Oh! No está jalando esta cosa!`;
        app.appendChild(errorMessage);
    }
    
}

//Envío de Solicitud 
request.send()
