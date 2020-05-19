import { filterByHouse, filterByPatronus, filterByWand, filterByCore, sortByName } from "../src/data.js";

  describe("Filter by house function", () => {
    test("Should return 'function'", () => {
      expect(typeof filterByHouse).toBe("function");
    });
  });


describe("Filter by house function", () => {
  test("Shoulder return Ravenclaw members, Cho Chang and Luna Lovegood", () => {
    const dataToFilter = [
      {
        name: "Cho Chang",
        house: "Ravenclaw"
      },
      {
        name: "Harry Potter",
        house: "Gryffindor"
      },
      {
        name: "Hermione Granger",
        house: "Gryffindor"
      },
      {
        name: "Draco Malfoy",
        house: "Slytherin"
      },
      {
        name: "Luna Lovegood",
        house: "Ravenclaw"
      },
      {
        name: "Cedric Diggory",
        house: "Hufflepuff"
      }
    ];

    const ravenclaw = [
      {name: "Cho Chang", house: "Ravenclaw"},
      {name: "Luna Lovegood", house: "Ravenclaw"}
    ]
    expect(filterByHouse(dataToFilter, "Ravenclaw")).toEqual(ravenclaw);
  });

  test("Shoulder return Gryffindor members, Harry Potter and Hermione Granger", () => {
    const dataToFilter = [{
        name: "Cho Chang",
        house: "Ravenclaw"
      },
      {
        name: "Harry Potter",
        house: "Gryffindor"
      },
      {
        name: "Hermione Granger",
        house: "Gryffindor"
      },
      {
        name: "Draco Malfoy",
        house: "Slytherin"
      },
      {
        name: "Luna Lovegood",
        house: "Ravenclaw"
      },
      {
        name: "Cedric Diggory",
        house: "Hufflepuff"
      }
    ];

    const gryffindor = [
      {name: "Harry Potter", house: "Gryffindor"},
      {name: "Hermione Granger",house: "Gryffindor"},
    ]
    expect(filterByHouse(dataToFilter, "Gryffindor")).toEqual(gryffindor);
  });
});


describe("Filter by patronus function", () => {
  test("Should return patronus name, owner, description and image by data given", () => {
    const dataToFilter = [
      {
        name: "Harry Potter",

        patronus: {
          name: "Ciervo",
          descripcion:
            "El Patronus de Harry tiene la forma de Animagus al igual que el Patronus de su padre. Aprendió a conjurarlo a una edad excepcionalmente temprana.",
          image: "./Imagenes/ciervo.jpg",
        },
      },
    ];

    const output = [
      [
        "Harry Potter",
        "Ciervo",
        "El Patronus de Harry tiene la forma de Animagus al igual que el Patronus de su padre. Aprendió a conjurarlo a una edad excepcionalmente temprana.",
        "./Imagenes/ciervo.jpg",
      ],
    ];

    expect(filterByPatronus(dataToFilter)).toEqual(output);
  });
});

describe('Filter by wand (wood) function', () => {
  test('Should return wand owner, wood, description and image by data given', () => {
    const dataToFilter = [{
      name: "Harry Potter",
      wand: {
        wood: "Acebo",
        descripcion: "Las varitas de acebo trabajan muy feliz para aquellos que pueden necesitar ayuda para superar una tendencia a la ira y la impetuosidad.",
        image: "./Imagenes/varita.jpg",
      }
    }];

    const output = [
      ["Harry Potter", "Acebo", "Las varitas de acebo trabajan muy feliz para aquellos que pueden necesitar ayuda para superar una tendencia a la ira y la impetuosidad.", "./Imagenes/varita.jpg"]
    ];
    expect(filterByWand(dataToFilter)).toEqual(output);

  });
});

describe('Filter by core function', () => {
  test('Should return wand owner, core, description and image by data given', () => {
    const dataToFilter = [{
      name: "Harry Potter",
      core: {
        name: "Pluma de fénix",
        descripcion: "La pluma de fénix es el tipo de núcleo para varitas más raro. Las plumas de fénix pueden producir una amplia gama de efectos mágicos, aunque pueden tomarse más tiempo que las varitas de unicornio o de dragón para mostrarlo.",
        image: "./Imagenes/Fenix2.jpg",
      }
    }];

    const output = [
      ["Harry Potter", "Pluma de fénix", "La pluma de fénix es el tipo de núcleo para varitas más raro. Las plumas de fénix pueden producir una amplia gama de efectos mágicos, aunque pueden tomarse más tiempo que las varitas de unicornio o de dragón para mostrarlo.", "./Imagenes/Fenix2.jpg"]
    ];
    expect(filterByCore(dataToFilter)).toEqual(output);

  });
});



describe("Sort by name function", () => {
  test("Should return sorted array by name", () => {
    let sortingData = [
      {name: "Harry Potter"}, 
      {name: "Arthur Weasley"},
      {name: "Severus Snape"},
      {name: "Ginny Weasley"}
    ];

    
    expect(sortByName(sortingData, "A-Z")).toEqual([
        {name: "Arthur Weasley"},
        {name: "Ginny Weasley"},
        {name: "Harry Potter"},
        {name: "Severus Snape"}
    ]);

     expect(sortByName(sortingData, "Z-A")).toEqual([
        {name: "Arthur Weasley"},
        {name: "Ginny Weasley"},
        {name: "Harry Potter"},
        {name: "Severus Snape"}
    ]);

  });
});