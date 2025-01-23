let myFirstVar: string;

myFirstVar = "Hello World";

let mySecondVar: string | undefined = "hola";

console.log(mySecondVar);

const saludo = (name: string): string => {
  return `Hola ${name}`;
};

saludo("Leonardo");

interface Usuario {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
}

const user: Usuario = {
  firstname: "Leonardo",
  lastname: "Sánchez",
  age: 26,
  email: "leonardo@mail.com",
};
