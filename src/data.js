//DATA MINPULATION (OBJECTS, ARRAYS, ETC.) - TESTS ARE RUN ON THIS FILE

//Filtrar por casa (membersByHouse: arreglo de personajes de una casa en particular)
export function filterByHouse(dataToFilter, condition) {
  let membersByHouse = dataToFilter.filter(
    character => character.house === condition
  );
  return membersByHouse;
}

//Filtrar según la madera de la varita (wand es el objeto)
export function filterByWand(dataToFilter) {
  const hasWand = dataToFilter.filter(character => character.wand);
  const wandAndInfo = hasWand.map(character => {
    const wood = Object.entries(character.wand)[0][1];
    const owner = character.name;
    const image = Object.entries(character.wand)[2][1];
    const description = Object.entries(character.wand)[1][1];
    const allWand = [owner, wood, description, image];
    return allWand;
  });

  const willHaveCard = wandAndInfo.filter(wand => {
    if (wand[1] != "") {
      return wand;
    }
  });

  return willHaveCard;

}

export function filterByCore(dataToFilter) {
  const hasCore = dataToFilter.filter(character => character.core);
  const coreAndInfo = hasCore.map((character) => {
    const core = Object.entries(character.core)[0][1];
    const owner = character.name;
    const image = Object.entries(character.core)[2][1];
    const description = Object.entries(character.core)[1][1];
    const allCore = [owner, core, description, image];
    return allCore;
  });

  const willHaveCard = coreAndInfo.filter(core => {
    if (core[1] != "") {
      return core;
    }
  });

  return willHaveCard;
}

//Por si el personaje 1) no tiene varita, 2) solo tiene madera 3) tiene madera y núcleo
export function whoHasWandInfo(character) {
  let wandWood = Object.entries(character.wand)[0][1];
  let wandCore = Object.entries(character.core)[0][1];
  let wandInfo = [wandWood, wandCore];
  
  if (wandInfo[0] === "" && wandInfo[1] === "") {
    return "Información no disponible";
  } else if (wandInfo[0] && wandInfo[1] === "") {
    return wandInfo[0];
  } else {
    return `${wandInfo[0]} con núcleo de ${wandInfo[1]}`;
  }

}


//Filtrar por el patronus. El resultado es un array con muchos array [nombre, patronus, descripción] - onlyPatronus(character); (después de un forEach)
export function showPatronusNameOnly(dataToFilter) {
  if (dataToFilter.patronus != "") {
    return Object.entries(dataToFilter.patronus)[0][1];
  } else {
    return "Información no disponible";
  }
  
}

//Filtrar por el patronus (pero sin forEach previo) - filterByPatronus(charactersData);
export function filterByPatronus(dataToFilter) {
  const hasPatronus = dataToFilter.filter((character) => character.patronus);
  const patronusAndInfo = hasPatronus.map((character) => {
    const patronus = Object.entries(character.patronus)[0][1];
    const owner = character.name;
    const image = Object.entries(character.patronus)[2][1];
    const description = Object.entries(character.patronus)[1][1];
    const allPatronus = [owner, patronus, description, image];
    return allPatronus;
  });

  return patronusAndInfo;
}

//Ordenar personajes por su nombre de manera ascendente y descendente
export function sortByName(sortingData, sortingOrder) {

  if (sortingOrder === "A-Z") {
    sortingData.sort((a, b) => {
      if (a.name > b.name) { 
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    sortingData.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      } else if (a.name < b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}

