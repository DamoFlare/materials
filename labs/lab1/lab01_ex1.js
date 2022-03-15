'use strict'

const dayjs = require("dayjs");

function Film(id, title, favorites, date, rating){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    this.arrayFilms = []
    this.addNewFilm = (film) => {
        this.arrayFilms.push(film);
    }
    this.sortByDate = () => {
        return this.arrayFilms.sort((e1, e2) => {
            if(e1.date == ""){
                return 1;
            }
            else if(e2.date == ""){
                return -1;
            }
            return dayjs(e1.date).diff(dayjs(e2.date));
        })
    }
    this.deleteFilm = (id) => {
        for(let i = 0; i < this.arrayFilms.length; i++){
            if(this.arrayFilms[i].id == id){
                // Soft delete
                this.arrayFilms[i].id = -1;
            }
        }
    }
    this.resetWatchedFilms = () => {
        this.arrayFilms.forEach( e => e.date = "");
    }
    this.getRated = () => {
        let ratedFilms = this.arrayFilms.filter(e => e.rating)
        // Sorting ratedFilms by desc score
        let descRatedFilms = ratedFilms.sort((e1, e2) => e1.rating > e2.rating)
        descRatedFilms.forEach((e1) => console.log(e1));
    }

} 

const allFilms = new FilmLibrary();
allFilms.addNewFilm(new Film(1, "Pulp Fiction", true, "March 10, 2022", 5))
allFilms.addNewFilm(new Film(2, "21 Grams", true, "March 17, 2022", 4))
allFilms.addNewFilm(new Film(3, "Stars Wars", false, "", undefined))
allFilms.addNewFilm(new Film(4, "Matrix", false, "", undefined))
allFilms.addNewFilm(new Film(5, "Shrek", false, "March 21, 2022", 3))
//console.log(allFilms.arrayFilms[0])
allFilms.sortByDate();
// Deleting Star Wars
    //allFilms.deleteFilm(3)
// Reset Watched Films
    //allFilms.resetWatchedFilms();
// getRated
allFilms.getRated();




debugger;


