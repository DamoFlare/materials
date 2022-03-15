'use strict';

const scores = [28, 25, 21, 30, 18, 24, 22];

// console.log(scores) -- STAMPA L'ARRAY
// console.log(scores.join(",")); // -- STAMPA L'ARRAY COME STRINGA, CONCATENATA DA ","

//scores[0] = 29; // FUNZIONA PERCHE' STIAMO MODIFICANDO UNA CELLA DELL'ARRAY, NON TUTTO L'ARRAY
//scores.push(29) // FUNZIONA, AGGIUNGE IN CODA ALL'ARRAY UN 29
console.log(scores)

//scores = [...scores, 29] // ALTRO MODO PER AGGIUNGERE ELMENTI AD UN ARRAY
//  QUESTO DA ERRORE PERCHE' STA PROVANDO A FARE UN'ASSEGNAZIONE AD UNA VARIABILE DICHIARATA COME CONST


const new_scores = [...scores];
// find the minimum score
// lodash _ (libreria che già calcola il minimo)
// usiamo il minimo
let min_pos = 0;
for(let i = 0; i<new_scores.length; i++){
    if(new_scores[i]<new_scores[min_pos])
        min_pos=i;
}
new_scores.splice(min_pos, 1)

min_pos=0
for(let i = 0; i<new_scores.length; i++){
    if(new_scores[i]<new_scores[min_pos])
        min_pos=i;
}
new_scores.splice(min_pos, 1)
console.log(new_scores)

// compute average
let new_avg=0
for(let x of new_scores){
    new_avg += x;
}
new_avg /= new_scores.length;
console.log("MEDIA: " + new_avg) 