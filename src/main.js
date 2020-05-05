//FOR DOM MANIPULATION

import charactersData from "./data/potter/potter.js";
import { filterByHouse } from "./data.js";

const root = document.getElementById("root");
const homepageFragment = new DocumentFragment(); //aquí se agregan todos los elementos, luego este fragmento se agrega al root, así solo se actualiza una vez y podemos agregar imagen, h1 y botón al mismo tiempo

const logoBox = document.createElement("div");
const logo = document.createElement("img");

logoBox.classList.add = "img-box";
logo.classList.add = "img-box-image";

logo.src = "./Imagenes/wizards-unite-logo.png";

logoBox.appendChild(logo);
//root.appendChild(logoBox);  //esto fue reemplazado por root.appendChild(homepageFragment)

const titulo = document.createElement("h1");
titulo.textContent = "BASE DE DATOS PARA JUGADORES";
titulo.classList.add = "tituloinicio";
//root.appendChild(titulo);  //esto fue reemplazado por root.appendChild(homepageFragment)

const alohomoraBtn = document.createElement("button");
alohomoraBtn.classList = "alohomora-button";
alohomoraBtn.textContent = "Alohomora";
alohomoraBtn.addEventListener("click", () => {
  return Casas();
});

//agregando logo, h1 y botón al fragment
homepageFragment.appendChild(logoBox);
homepageFragment.appendChild(titulo);
homepageFragment.appendChild(alohomoraBtn);
//agregando fragment al root
root.appendChild(homepageFragment);

///////////////////////////////////////////////////////////////////////////////////////
/* HELPERS (FUNC. PARA COSAS PEQUEÑAS REPETITIVAS) */
//////////////////////////////////////////////////////////////////////////////////////

//1. Borrar contenido del DOM (div#root y body)
function clearContent() {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

//2. Generar "marco" o estructura básica que se repite en todas las páginas (título entre línea, contenedor para ingresar el contenido dinámico, como personajes, varitas, patronus)
function createBasicStructure() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <nav id="navbar"></nav>
    <header>
        
  <div class="small-logo-box">
          <img src="./Imagenes/wizards-unite-logo.png" alt="logo-small">
        </div>     
        
      </header>

    <section id="general-section" class="dynamic-content">
    
    
      <h1 class="section-title"></h1>
        <section class="inner-content">

        </section>
      
    </section>
  
  `
  );
}

///////////////////////////////////////////////////////////////////////////////////////
/* PANTALLAS */
///////////////////////////////////////////////////////////////////////////////////////

//1. FUNCIÓN PARA MOSTRAR LA PANTALLA DE CADA CASA
function showHouseMembers(houseMembers) {
  clearContent(); //1. limpia pantalla anterior
  createBasicStructure(); //2. crea estructura básica que se repite en cada pantalla
  MenuPrincipal(); //3. crea estructura del menú (provisorio)

  const innerContentSection = document.querySelector(".inner-content");
  const sectionTitle = document.querySelector(".section-title");

  //4. modifica el color del título según la casa
  if (houseMembers[0].house === "Gryffindor") {
    sectionTitle.classList += " gryffindor-color";
    sectionTitle.textContent = "GRYFFINDOR";
  } else if (houseMembers[0].house === "Hufflepuff") {
    sectionTitle.classList += " hufflepuff-color";
    sectionTitle.textContent = "HUFFLEPUFF";
  } else if (houseMembers[0].house === "Slytherin") {
    sectionTitle.classList += " slytherin-color";
    sectionTitle.textContent = "SLYTHERIN";
  } else {
    sectionTitle.classList += " ravenclaw-color";
    sectionTitle.textContent = "RAVENCLAW";
  }

  //5. crea una tarjeta con información de cada personaje
  const fragment = new DocumentFragment();
  houseMembers.forEach((character) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList = "card-box";
    const cardImg = document.createElement("img");
    cardImg.src = `${character.image}`;
    const cardInfo = document.createElement("ul");
    cardInfo.classList = "card-info";

    const card = document.createElement("div");
    card.classList = "card";
    const cardFront = document.createElement("div");
    cardFront.classList = "card-front";
    const cardBack = document.createElement("div");
    cardBack.classList = "card-back";

    //6. se crean 4 elementos de lista para la información de cada personaje
    for (let i = 0; i < 5; i++) {
      let cardInfoLi = document.createElement("li");
      cardInfo.appendChild(cardInfoLi);
    }
    //cardInfo equivale a la lista, childNodes[x] a cada elemento
    cardInfo.childNodes[0].textContent = `Nombre: ${character.name}`;
    cardInfo.childNodes[1].textContent = `Género: ${character.gender}`;

    //por si el personaje no tiene año de nacimiento
    if (character.yearOfBirth === "") {
      cardInfo.childNodes[2].textContent = `Año de nacimiento: Información no disponible`;
    } else {
      cardInfo.childNodes[2].textContent = `Año de nacimiento: ${character.yearOfBirth}`;
    }

    //por si el personaje no tiene patronus
    if (character.patronus === "") {
      cardInfo.childNodes[3].textContent = `Patronus: Información no disponible`;
    } else {
      cardInfo.childNodes[3].textContent = `Patronus: ${character.patronus}`;
    }

    //por si el personaje 1) no tiene varita, 2) solo tiene madera 3) tiene madera y núcleo
    if (
      Object.entries(character.wand)[0][1] === "" &&
      Object.entries(character.wand)[1][1] === ""
    ) {
      cardInfo.childNodes[4].textContent = `Varita: Información no disponible`;
    } else if (
      Object.entries(character.wand)[0][1] &&
      Object.entries(character.wand)[1][1] === ""
    ) {
      cardInfo.childNodes[4].textContent = `Varita: ${
        Object.entries(character.wand)[0][1]
      }`;
    } else {
      cardInfo.childNodes[4].textContent = `Varita: ${
        Object.entries(character.wand)[0][1]
      } con núcleo de ${Object.entries(character.wand)[1][1]}`;
    }

    cardFront.appendChild(cardImg);
    cardBack.appendChild(cardInfo);
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardContainer.appendChild(card);

    //RESULTADO: TARJETA DE CADA PERSONAJE (cardBox)
    fragment.appendChild(cardContainer); //7. se pega cada tarjeta al fragmento vacío
  });
  innerContentSection.appendChild(fragment); //8. el fragmento se pega a la pantalla (el DOM se actualiza una sola vez)
}

function MenuPrincipal() {
  document.getElementById("navbar").insertAdjacentHTML(
    "afterbegin",
    `

<input type="checkbox" class="checkbox__hack" id="checkbox__hack">
<label for="checkbox__hack" class="checkbox-hack__label"></label>
<nav class="nav--top">
<ul class="menu-lateral nav--top__list">
<ul>
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
      <input type="checkbox" id="check3"/>
      <label for="check3">VARITAS</label>

       <ul>
      <li id="Madera"><a href="">Madera</a></li>
      
      <li id="Nucleo"><a href="">Núcleo</a></li>
     
      </ul>
 </div>
<div class="item">
    <input type="checkbox" id="check4"/>
    <label for="check4">PATRONUS</label>
    
     </div> 
  
`
  );

  const Gryffindor = document.getElementById("Gryffindor");
  Gryffindor.addEventListener("click", (event) => {
    let gryffindorMembers = filterByHouse(charactersData, "Gryffindor");
    event.preventDefault();
    return showHouseMembers(gryffindorMembers);
  });

  const Slytherin = document.getElementById("Slytherin");
  Slytherin.addEventListener("click", (event) => {
    event.preventDefault();
    let slytherinMembers = filterByHouse(charactersData, "Slytherin");
    return showHouseMembers(slytherinMembers);
  });
  const Hufflepuff = document.getElementById("Hufflepuff");
  Hufflepuff.addEventListener("click", (event) => {
    event.preventDefault();
    let hufflepuffMembers = filterByHouse(charactersData, "Hufflepuff");
    return showHouseMembers(hufflepuffMembers);
  });

  const Ravenclaw = document.getElementById("Ravenclaw");
  Ravenclaw.addEventListener("click", (event) => {
    event.preventDefault();
    let ravenclawMembers = filterByHouse(charactersData, "Ravenclaw");
    return showHouseMembers(ravenclawMembers);
  });

  /* const casas = document.getElementById("casas");
      casas.addEventListener("click", () => {
        console.log(casas.classList);
        if (casas.classList = "no-clickeado") {
          casas.classList = "clickeado";
          Casas();

        } 
        
      }); */
  const casasCheckbox = document.querySelector("#check2");
  if (casasCheckbox.checked === false) {
    casasCheckbox.checked = true;
    console.log(casasCheckbox.checked);
  }

  if (casasCheckbox.checked === true) {
    casasCheckbox.addEventListener("click", () => Casas());
  }
}

function Casas() {
  clearContent(); //1. limpia pantalla anterior
  createBasicStructure(); //2. crea estructura básica que se repite en cada pantalla
  MenuPrincipal(); //3. crea estructura del menú (provisorio)

  const sectionTitle = document.querySelector(".section-title");
  sectionTitle.classList += " titulo-dorado";
  sectionTitle.textContent = "CASAS";

  document.querySelector(".inner-content").insertAdjacentHTML(
    "afterbegin",
    `
  <div class="grilla">
    <img src = "./Imagenes/House Gry.jpg" class="grid-item" id="EscudoGry">
    <img src = "./Imagenes/House Raven.jpg" class="grid-item" id="EscudoRaven">
    <img src = "./Imagenes/House Huff.jpg" class="grid-item" id="EscudoHuffle">
    <img src = "./Imagenes/House Sly.jpg" class="grid-item"id="EscudoSly">
  </div>
`
  );
  const EscudoGry = document.getElementById("EscudoGry");
  EscudoGry.addEventListener("click", (event) => {
    let gryffindorMembers = filterByHouse(charactersData, "Gryffindor");
    event.preventDefault();
    return showHouseMembers(gryffindorMembers);
  });

  const EscudoRaven = document.getElementById("EscudoRaven");
  EscudoRaven.addEventListener("click", (event) => {
    event.preventDefault();
    let ravenclawMembers = filterByHouse(charactersData, "Ravenclaw");
    return showHouseMembers(ravenclawMembers);
  });

  const EscudoHuffle = document.getElementById("EscudoHuffle");
  EscudoHuffle.addEventListener("click", (event) => {
    event.preventDefault();
    let hufflepuffwMembers = filterByHouse(charactersData, "Hufflepuff");
    return showHouseMembers(hufflepuffwMembers);
  });

  const EscudoSly = document.getElementById("EscudoSly");
  EscudoSly.addEventListener("click", (event) => {
    event.preventDefault();
    let slytherinMembers = filterByHouse(charactersData, "Slytherin");
    return showHouseMembers(slytherinMembers);
  });
}
