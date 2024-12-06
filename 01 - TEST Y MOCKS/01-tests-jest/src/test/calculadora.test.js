//describe
//it
//expect
//toBe
//toEqual
//toHaveProperty

import { calculadora } from "../calculadora.js";

describe('Conjunto de pruebas de suma', ()=>{
    it('deberia sumar correctamente dos numeros', ()=>{
        const num1 = 8;
        const num2 = 2;
        const resultadoEsperado = 10;

        const resultado = calculadora.suma(num1, num2);

        expect(resultado).toBe(resultadoEsperado);
        expect(resultado).not.toBe(0);
        expect(resultado).toBeDefined();
        expect(resultado).not.toBeUndefined();
        expect(resultado).not.toBeNull();
    })

    it('debe responder con un error si se intentan sumar valores que no son numeros', ()=>{
        const num1 = [true];
        const num2 = {nombre:"pepe"};

        expect(()=>calculadora.suma(num1, num2)).toThrow("Argumentos invalidos");
        expect(()=>calculadora.suma(num1, num2)).toThrow();
    })
})