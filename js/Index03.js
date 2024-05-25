
/****************Menu responsive*********************/

const icon = document.querySelector('.icon');
const menu = document.querySelector('.menu');
const span = document.querySelector('.span')

function toggleNavbar() {
    menu.classList.toggle('active');
    icon.classList.toggle('active');
}

document.querySelector('.toggle-btn').addEventListener('click', function () {
    toggleNavbar();
});

/****************Hover****************************/

function mostrarValor(valor) {

    var generoSeleccionado = valor; // esto es lo que traigo desde el menú
    var resultados = document.getElementById('resultados'); //esto es donde voy a escribir el html
    //var valor = 'Todas';
  
    // Pido el archivo json con los datos
    var ArcJson = 'Movies3.json'
    fetch(ArcJson)
      .then(response => response.json())
      .then(data => {
        
  
        // Filtrar por el género seleccionado (si son 'Todas' quito el filtro)
        if(valor ==='Todas'){
          var PelisFiltradas = data;
        }
        else  var PelisFiltradas = data.filter(item => item.genero1 === valor);
        
  
        var jsonContainer = document.getElementById('json-container');  
        jsonContainer.innerHTML = ''; //Esto limpia el html
        
  
        if (PelisFiltradas.length > 0) {
          PelisFiltradas.forEach(item => {
            
          //Esta es la magia: escribo html!
  
            var Nhtml = `
          <div class="contenedor-img hover-1">
            <img src="${item.imagen1}" />
            <div class="mascara">
              <h2>${item.pelicula}</h2>
              <p>${item.descripcion}</p>
              <a href=${item.link} class="link">Ver Trailer</a>
            </div>
          </div>
        `;
  
        jsonContainer.innerHTML += Nhtml; // Agrega lo escrito
  
        });
        }
        })
  
      .catch(error => {
        alert('Error al leer el archivo ' + ArcJson); //Aviso si el Json no se encontró
      });
     
  }