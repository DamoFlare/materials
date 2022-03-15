'use strict'
const all_words = ['spring', 'it', 'cat'];
for(let i=0; i<all_words.length; i++){
    //console.log(all_words[i]);
    let new_word = computeThing(all_words[i]);
    console.log(new_word)
}

function computeThing(word) {
    let length = word.length;
    let new_word = "";

    if(length < 2){
        new_word = ""
    }
    else if (length == 2) {
        new_word = word+word;
    }
    else if (length == 3){
        new_word = word[0]+word[1]+word[1]+word[2]
    }
    else {
        new_word = word[0]+word[1]+word[word.length-2]+word[word.length-1]
    }
    return new_word;
}