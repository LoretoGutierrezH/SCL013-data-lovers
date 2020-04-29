//MENÚ PROVISORIO
//1. Casas, 2. Gryffindor, 3. Hufflepuff, 4. Slytherin
//5. Ravenclaw 6. Varitas 7. Material, 8.  Núcleo, 9. Patronus
function createMenu() {
  const menuBox = document.createElement('nav');

  //se crea cada uno de las opciones del menú
  for (let i = 0; i < 9; i++) {
    const menuItem = document.createElement('button');
    menuBox.appendChild(menuItem);
  }

  menuBox.childNodes[0].textContent = "Casas";

  menuBox.childNodes[1].textContent = "Gryffindor";
  menuBox.childNodes[1].addEventListener("click", () => {
    return showHouseMembers(gryffindorMembers);
  });

  menuBox.childNodes[2].textContent = "Hufflepuff";
  menuBox.childNodes[2].addEventListener("click", () => {
    return showHouseMembers(hufflepuffMembers);
  });

  menuBox.childNodes[3].textContent = "Slytherin";
  menuBox.childNodes[3].addEventListener("click", () => {
    return showHouseMembers(slytherinMembers);
  });

  menuBox.childNodes[4].textContent = "Ravenclaw";
  menuBox.childNodes[4].addEventListener("click", () => {
    return showHouseMembers(ravenclawMembers);
  });

  menuBox.childNodes[5].textContent = "Material";
  menuBox.childNodes[6].textContent = "Núcleo";
  menuBox.childNodes[7].textContent = "Patronus";
  //RESULTADO: Menú creado y linkeado a cada pantalla
  return document.body.appendChild(menuBox);
}


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
  document.body.insertAdjacentHTML('afterbegin', `
    <section class="dynamic-content">
      <header>
        <h1 class="section-title"></h1>
        <div class="small-logo-box">
          <!-- <img src="./Imagenes/wizards-unite-logo.png" alt="logo-small">-->
        </div>
      </header>
        <section class="inner-content">

        </section>
      
    </section>
  
  `);
}


///////////////////////////////////////////////////////////////////////////////////////
/* PANTALLAS */
///////////////////////////////////////////////////////////////////////////////////////

//1. FUNCIÓN PARA MOSTRAR LA PANTALLA DE CADA CASA
function showHouseMembers(houseMembers) {
  clearContent(); //1. limpia pantalla anterior
  createBasicStructure(); //2. crea estructura básica que se repite en cada pantalla
  createMenu(); //3. crea estructura del menú (provisorio)


  const innerContentSection = document.querySelector('.inner-content');
  const sectionTitle = document.querySelector('.section-title');

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
  const fragment = new DocumentFragment;
  houseMembers.forEach(character => {
    const cardBox = document.createElement('div');
    cardBox.classList = "card-box";
    const cardBoxImg = document.createElement('img');
    cardBoxImg.src = `${character.image}`;
    const cardInfo = document.createElement('ul');
    cardInfo.classList = "card-info";

    //6. se crean 4 elementos de lista para la información de cada personaje
    for (let i = 0; i < 5; i++) {
      let cardInfoLi = document.createElement('li');
      cardInfo.appendChild(cardInfoLi);
    }
    //cardInfo equivale a la lista, childNodes[x] a cada elemento
    cardInfo.childNodes[0].textContent = `Nombre: ${character.name}`;
    cardInfo.childNodes[1].textContent = `Género: ${character.gender}`;
    cardInfo.childNodes[2].textContent = `Fecha de nacimiento: ${character.yearOfBirth}`;
    cardInfo.childNodes[3].textContent = `Patronus: ${character.patronus}`;

    cardBox.appendChild(cardBoxImg);
    cardBox.appendChild(cardInfo);
    //RESULTADO: TARJETA DE CADA PERSONAJE (cardBox)
    fragment.appendChild(cardBox); //7. se pega cada tarjeta al fragmento vacío

  });
  innerContentSection.appendChild(fragment); //8. el fragmento se pega a la pantalla (el DOM se actualiza una sola vez)  
}