console.log("Hola Mundo");

import {randomSuperhero} from 'superheroes'
import {randomSupervillain} from 'supervillains';

import sw from 'star-wars-quotes';
console.log("Star Wars Quote: ",sw());


const h=randomSuperhero();
const v=randomSupervillain();

console.log(h+" vs "+v);

import fileinput from 'fs';
fileinput.readFile( './data/input.txt',"utf-8",
    (err,data)=>{
        console.log(data);
    });

