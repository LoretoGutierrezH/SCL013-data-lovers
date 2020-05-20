import charactersData from "./data/potter/potter.js";

//Using Fetch API (can't use actual data because we modified potter.js :P)
/* const getData = async function() {
  let response = await fetch("./data/potter/potter.json");
  let data = await response.json();
  return data;
}

let fetchedCharData;
getData().then(data => fetchedCharData = data); */

import { filterByHouse, filterByWand, filterByCore, filterByPatronus, showPatronusNameOnly, sortByName, whoHasWandInfo} from "./data.js";
import { welcomeMessages } from "./welcomeMessages.js";

/////////////////* HELPERS (FUNC. PARA COSAS PEQUEÑAS REPETITIVAS) *//////////////////

//1.b. Variables de la estructura básica que se utilizan en todas las pantallas
let clearInnerContentSection; //función
let clearSelectBox; //función
let sectionTitle; 
let welcomeParagraph;
let selectBox; //only for Gryffindor and Slytherin
let innerContentSection;

//2. Función para generar estructura básica que se repite en todas las páginas (header, título entre líneas, section.inner-content para ingresar el contenido dinámico)
function createBasicStructure() {
  document.body.innerHTML = `
  <section class="header">
    <nav id="navbar"></nav>
    <header>
        <div class="small-logo-box">
         <img src="./Imagenes/wizards-unite-logo.png" alt="logo-small">
        </div>     
      </header>
  </section>
    <section id="general-section" class="dynamic-content">
      <h1 class="section-title"></h1>
      <p class="welcome-paragraph"></p>
        <section id="select-box">
        </section>
        <section class="inner-content">
        </section>
    </section>

  `;

  
  innerContentSection = document.querySelector(".inner-content");
  welcomeParagraph = document.querySelector(".welcome-paragraph");
  selectBox = document.querySelector("#select-box");
  sectionTitle = document.querySelector(".section-title");

  //función que nos devuelve a la pantalla de los escudos al hacer click en el logo
  const logoBox = document.querySelector(".small-logo-box");
  logoBox.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0,0);
    houses();
  });
  //función que permite borrar el contenido dinámico que se coloca en .inner-content
  clearInnerContentSection = function () {
    while (innerContentSection.firstChild) {
      innerContentSection.removeChild(innerContentSection.firstChild);
    }
  };
  //función que permite borrar el contenido dinámico que se coloca en .select-box
  clearSelectBox = function () {
    while (selectBox.firstChild) {
      selectBox.removeChild(selectBox.firstChild);
    }
  }
}

/////////////////////////////* PANTALLA DE INICIO *///////////////////////////////////
const root = document.getElementById("root");
root.innerHTML = `
  <div class="img-box">
    <img class="img-box-image" src="./Imagenes/wizards-unite-logo.png">
  </div>
  <h1 class="titulo-inicio">BASE DE DATOS PARA JUGADORES</h1>
  <button class="alohomora-button">Alohomora</button>

`;

const alohomoraBtn = document.querySelector(".alohomora-button");
alohomoraBtn.addEventListener("click", () => {
  (function clearContent() {
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
  })(); //1. limpia pantalla de inicio que está en div#root, se llama de inmediato solo una vez (no tiene más usos)
  return houses();
});

/////////////////////////////////* MENÚ  *////////////////////////////////////////////
function mainMenu() {
  document.getElementById("navbar").innerHTML = `   
  <input type="checkbox" class="checkbox__hack" id="checkbox__hack">
  <label for="checkbox__hack" class="checkbox-hack__label"></label>
  <nav class="nav--top">
    <ul class="menu-lateral nav--top__list">

      <div class="item">
        <input type="checkbox" id="check2"/>
        <label for="check2" id="casas">CASAS</label>
          <ul>
          <li id="Gryffindor"><a href="">Gryffindor</a></li>
          <li id="Slytherin"><a href="">Slytherin</a></li>
          <li id="Hufflepuff"><a href="">Hufflepuff</a></li>
          <li id="Ravenclaw"><a href="">Ravenclaw</a></li>
          </ul>
      </div>
      <div class="item">
        <input type="checkbox" id="check7"/>
        <label for="check7">VARITAS</label>
        <ul>
          <li id="check3"><a href="">Madera</a></li>
          <li id="check4"><a href="">Núcleo</a></li>
        </ul>
      </div>
      <div class="item">
        <input type="checkbox" id="check5"/>
        <label for="check5">PATRONUS</label>
      </div> 

      <div class="item">
      <input type="checkbox" id="check8"/>
      <label for="check8">PRENSA</label>
      <ul>
        <li id="check6"><a href="">Noticias</a></li>
        <li id="check9"><a href="">Comunicados</a></li>
      </ul>
 
`;

  //EVENT LISTENER PARA LAS OPCIONES DEL MENÚ

  //Casas > Gryffindor, Slytherin, Hufflepuff, Ravenclaw
  const Gryffindor = document.getElementById("Gryffindor");
  Gryffindor.addEventListener("click", (event) => {
    let gryffindorMembers = filterByHouse(charactersData, "Gryffindor");
    event.preventDefault();
    window.scrollTo(0, 0);
    return showHouseMembers(gryffindorMembers);
  });

  const Slytherin = document.getElementById("Slytherin");
  Slytherin.addEventListener("click", () => {
    let slytherinMembers = filterByHouse(charactersData, "Slytherin");
    event.preventDefault();
    window.scrollTo(0, 0);
    return showHouseMembers(slytherinMembers);
  });
  const Hufflepuff = document.getElementById("Hufflepuff");
  Hufflepuff.addEventListener("click", () => {
    let hufflepuffMembers = filterByHouse(charactersData, "Hufflepuff");
    event.preventDefault();
    window.scrollTo(0, 0);
    clearSelectBox();
    return showHouseMembers(hufflepuffMembers);
  });

  const Ravenclaw = document.getElementById("Ravenclaw");
  Ravenclaw.addEventListener("click", () => {
    let ravenclawMembers = filterByHouse(charactersData, "Ravenclaw");
    event.preventDefault();
    window.scrollTo(0, 0);
    clearSelectBox();
    return showHouseMembers(ravenclawMembers);
  });

  //Lleva a Varitas-Madera
  const wand = document.getElementById("check3");
  wand.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    clearSelectBox();
    showWood();
  });
  //Lleva a Varitas-Núcleo
  const core = document.getElementById("check4");
  core.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    clearSelectBox();
    showCore();
  });
  //Lleva a Patronus
  const patronus = document.querySelector("#check5");
  patronus.addEventListener("click", () => {
    window.scrollTo(0, 0);
    clearSelectBox();
    showPatronus();
  });
  //Lleva a Noticias
  const noticias = document.querySelector("#check6");
  noticias.addEventListener("click", () => {
    event.preventDefault();
    window.scrollTo(0, 0);
    clearSelectBox();
    noticiasHarry();
  });
  //Lleva a Comunicados
  const comunicados = document.querySelector("#check9");
  comunicados.addEventListener("click", () => {
    event.preventDefault();
    window.scrollTo(0, 0);
    clearSelectBox();
    comunicadosHarry();
  });
}
////////////////////////* MSJE. BIENVENIDA SEGÚN PANTALLA *////////////////////////////
const [hogwartsWelcome, gryffindorWelcome, hufflepuffWelcome, slytherinWelcome, ravenclawWelcome, woodsWelcome, coresWelcome, patronusWelcome, newsWelcome, extraNewsWelcome] = welcomeMessages; //imported welcomeMessages.js file (array)


/////////////////////////////////* PANTALLAS */////////////////////////////////////////

//0. PANTALLA DE ESCUDOS
function houses() {
  createBasicStructure(); //se crea una sola vez la estructura básica (se mantiene)
  mainMenu(); //se crea una sola vez la estructura del menú (se mantiene)
  sectionTitle.classList += " titulo-dorado";
  sectionTitle.textContent = "CASAS";
  //Bienvenida de Hogwarts
  welcomeParagraph.textContent = hogwartsWelcome;
  innerContentSection.innerHTML += `

  <div class="grilla">
    <img src = "./Imagenes/House Gry.jpg" class="grid-item" id="gryffindorShield">
    <img src = "./Imagenes/House Raven.jpg" class="grid-item" id="ravenclawShield">
    <img src = "./Imagenes/House Huff.jpg" class="grid-item" id="hufflepuffShield">
    <img src = "./Imagenes/House Sly.jpg" class="grid-item"id="slytherinShield">
  </div>
`;
  const gryffindorShield = document.getElementById("gryffindorShield");
  gryffindorShield.addEventListener("click", (event) => {
    let gryffindorMembers = filterByHouse(charactersData, "Gryffindor");
    event.preventDefault();
    window.scrollTo(0, 0);
    return showHouseMembers(gryffindorMembers);
  });

  const ravenclawShield = document.getElementById("ravenclawShield");
  ravenclawShield.addEventListener("click", (event) => {
    event.preventDefault();
    let ravenclawMembers = filterByHouse(charactersData, "Ravenclaw");
    window.scrollTo(0, 0);
    return showHouseMembers(ravenclawMembers);
  });

  const hufflepuffShield = document.getElementById("hufflepuffShield");
  hufflepuffShield.addEventListener("click", (event) => {
    event.preventDefault();
    let hufflepuffMembers = filterByHouse(charactersData, "Hufflepuff");
    window.scrollTo(0, 0);
    return showHouseMembers(hufflepuffMembers);
  });

  const slytherinShield = document.getElementById("slytherinShield");
  slytherinShield.addEventListener("click", (event) => {
    event.preventDefault();
    let slytherinMembers = filterByHouse(charactersData, "Slytherin");
    window.scrollTo(0, 0);
    return showHouseMembers(slytherinMembers);
  });
}



//1. PANTALLA DE CADA CASA
function showHouseMembers(houseMembers) {
  clearInnerContentSection(); //se borra el contenido anterior
  const firstHouseMember = houseMembers[0]; 
  //Bienvenida a cada Casa
  //Modificación del color del título y de la presentación según casa (obtenida del primer objeto de cada grupo en houseMembers)
  
  if (firstHouseMember.house === "Gryffindor") {
    sectionTitle.classList = "section-title gryffindor-color";
    sectionTitle.textContent = "GRYFFINDOR";
    welcomeParagraph.textContent = gryffindorWelcome;
    //se crea select de orden porque hay más personajes para ordenar
    selectBox.innerHTML = `
    <select id="sorting-options">
      <option value="A-Z">Ordenar de A-Z</option>
      <option value="Z-A">Ordenar de Z-A</option>
    </select> 
  `;
  } else if (firstHouseMember.house === "Hufflepuff") {
    sectionTitle.classList = "section-title hufflepuff-color";
    sectionTitle.textContent = "HUFFLEPUFF";
    welcomeParagraph.textContent = hufflepuffWelcome;
  } else if (firstHouseMember.house === "Slytherin") {
    sectionTitle.classList = "section-title slytherin-color";
    sectionTitle.textContent = "SLYTHERIN";
    welcomeParagraph.textContent = slytherinWelcome;
    //se crea select de orden porque hay más personajes para ordenar
    selectBox.innerHTML = `
    <select id="sorting-options">
      <option value="A-Z">Ordenar de A-Z</option>
      <option value="Z-A">Ordenar de Z-A</option>
    </select> 
  `;
  } else {
    sectionTitle.classList = "section-title ravenclaw-color";
    sectionTitle.textContent = "RAVENCLAW";
    welcomeParagraph.textContent = ravenclawWelcome;
  }
   
  houseMembers.forEach(character => {
    let patronusName = showPatronusNameOnly(character);
    let wandInfo = whoHasWandInfo(character);
    createCharacterCards(character, patronusName, wandInfo);
  });

  //solo asigna función a un select de orden creado (para evitar errores)
  const sortingBtn = document.querySelector("#sorting-options");
  if (sortingBtn != null) {
    sortingBtn.addEventListener("change", (event) => {
      let sortingOrder = event.target.value;
      sortByName(houseMembers, sortingOrder);
      clearInnerContentSection();
      houseMembers.forEach(character => {
        let patronusName = showPatronusNameOnly(character);
        let wandInfo = whoHasWandInfo(character);
        createCharacterCards(character, patronusName, wandInfo);
      });
    })
  }
  
  
}

//Función para crear tarjetas de personajes (se crea por separado para reutilizarla con opciones de orden)
function createCharacterCards(character, patronusName, wandInfo) {
  innerContentSection.insertAdjacentHTML('beforeend', `
        <div class="card-box">
        <div class="card">
          <div class="card-front">
            <p class="transparent-card-title">${character.name}</p><img
              src="${character.image}">
          </div>
          <div class="card-back">
            <ul class="card-info">
              <h1 class="card-title">${character.name}</h1>
              <li>Género: ${character.gender}</li>
              <li>Año de nacimiento: ${character.yearOfBirth}</li>
              <li>Patronus: ${patronusName}</li>
              <li> Varita: ${wandInfo}</li>
            </ul>
          </div>
        </div>
      </div>
    `);
}

//2. PANTALLA DE VARITAS > MATERIAL
function showWood() {
  clearInnerContentSection(); //se borra el contenido anterior
  sectionTitle.classList = "section-title titulo-dorado";
  sectionTitle.textContent = "MADERA";

  //Bienvenida Pantalla Madera
  welcomeParagraph.textContent = woodsWelcome;

  const wandData = filterByWand(charactersData);
  wandData.forEach(wand => {
    const [wandOwner, wandName, wandDescription, wandImg] = wand;
    innerContentSection.innerHTML += `
    <div class="card-box">
      <div class="card">
      <div class="card-front">
        <p class="transparent-card-title wand-card-title">${wandName}</p>
        <img src="${wandImg}">
      </div>
      <div class="card-back">
        <ul class="card-info">
          <h1 class="card-title">${wandName}</h1>
          <br>
          <li>Pertenece a: ${wandOwner}</li>
          <br>
          <p>${wandDescription}</p>
        </ul>
      </div>
    </div>
  
  `;
  });
}
//3. PANTALLA DE VARITAS > NÚCLEO
function showCore() {
  clearInnerContentSection(); //se borra el contenido anterior
  sectionTitle.classList = "section-title titulo-dorado";
  sectionTitle.textContent = "NÚCLEO";

  ///Bienvenida Pantalla Núcleo
  welcomeParagraph.textContent = coresWelcome;
  const coreData = filterByCore(charactersData);
  coreData.forEach(core => {
    const [coreOwner, coreName, coreDescription, coreImg] = core;
    innerContentSection.innerHTML += `
    <div class="card-box">
      <div class="card">
      <div class="card-front">
        <p class="transparent-card-title">${coreName}</p>
        <img src="${coreImg}">
      </div>
      <div class="card-back">
        <ul class="card-info">
          <h1 class="card-title">${coreName}</h1>
          <br>
          <li>Pertenece a: ${coreOwner}</li>
          <br>
          <p>${coreDescription}</p>
        </ul>
      </div>
    </div>
  
  `;
  });
}

//4. PANTALLA DE PATRONUS
function showPatronus() {
  clearInnerContentSection(); //se borra el contenido anterior
  sectionTitle.classList = "section-title titulo-dorado";
  sectionTitle.textContent = "PATRONUS";
  
  ///Bienvenida Pantalla Patronus
  welcomeParagraph.textContent = patronusWelcome;
  const patronusData = filterByPatronus(charactersData);
  patronusData.forEach(patronus => {
    const [patronusOwner, patronusName, patronusDescription, patronusImg] = patronus;
    innerContentSection.innerHTML += `
    <div class="card-box">
      <div class="card">
      <div class="card-front">
        <p class="transparent-card-title">${patronusName}</p>
        <img src="${patronusImg}">
      </div>
      <div class="card-back">
        <ul class="card-info">
          <h1 class="card-title">${patronusName}</h1>
          <br>
          <li>Pertenece a: ${patronusOwner}</li>
          <br>
          <p>${patronusDescription}</p>
        </ul>
      </div>
    </div>
  
  `;
  });
}

//5. PANTALLA DE NOTICIAS
function noticiasHarry() {
  clearInnerContentSection(); //borra el contenido anterior
  sectionTitle.classList += " titulo-dorado";
  sectionTitle.textContent = "NOTICIAS";
  ///Bienvenida Pantalla Noticias
  welcomeParagraph.textContent = newsWelcome;
  innerContentSection.innerHTML += `

  
<div class="grid">
<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;" src="https://i.gifer.com/Bmem.gif" width="394" height="625"></img>
<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;" src="https://i.pinimg.com/originals/7e/7e/64/7e7e64774dfa76fa78c7ff9ec0e8c2be.gif" width="394" height="625">
<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;" src="https://3.bp.blogspot.com/-6_b7S5eI9E8/W-2cfOWfrQI/AAAAAAAANsQ/MiNO-7GaJzUVzI570PNJ7cjl7AKd_QkFACK4BGAYYCw/s1600/tumblr_mwbw366JFJ1rrrafbo1_r1_500.gif" <img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;" src="https://66.media.tumblr.com/ab5ac61ded6b74ac87096281783f3ba8/tumblr_oaycdg1N6c1v4x4oqo1_1280.gifv" width="394" height="625"></img>
<img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;" src="https://1.bp.blogspot.com/-vdV5enNSVc4/Vz20kYrJa0I/AAAAAAAAAgw/V8scCw7xMZQKJXnDdbFOijpD-Alf97RewCLcB/s1600/Daily-Prophet-Sports.gif" width="394" height="625">
</div>
`;
}

//6. PANTALLA DE COMUNICADOS
function comunicadosHarry() {
  clearInnerContentSection(); //se borra el contenido anterior que está en .inner-content
  sectionTitle.classList += " titulo-dorado";
  sectionTitle.textContent = "COMUNICADOS";

  ///Bienvenida Pantalla Noticias
  welcomeParagraph.textContent = extraNewsWelcome;
  innerContentSection.innerHTML += `
  
<div class="grill">
<br>
<p><strong>VIDEO: COMUNICACIÓN OFICIAL PARA TODOS LOS MAGOS</strong></p>
<video class="youtube-fallback-video" width="600" height="500"playsinline="true" controls="true"><p>Tu navegador no implementa el elemento audio.</p><source src="https://storage.googleapis.com/nianticweb-hpwu-blog/video/teaser@es.mp4"></video>
<br>
<br>
<p><strong>VIDEO: HIPOGRIFO AVISTADO MIENTRAS VOLABA CERCA DE UNA VÍA FÉRREA MUGGLE</strong></p>
<video class="youtube-fallback-video" width="600" height="500"playsinline="true" controls="true"><source src="https://storage.googleapis.com/nianticweb-hpwu-blog/video/turbulenthippogriff/BBT_ES_24sec_1_WEB.mp4"></video>
</div>
`;
}
