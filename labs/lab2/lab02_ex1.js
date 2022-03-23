'use strict'

const dayjs = require("dayjs");
const sqlite = require("sqlite3");
const db = new sqlite.Database("labs/lab2/films.db", (err) => {
    if (err){
        throw err;
    }
});

function Film(id, title, favorites, date, rating){
    this.id = id;
    this.title = title;
    this.favorites = favorites;
    this.date = date;
    this.rating = rating;
}

function FilmLibrary(){
    this.arrayFilms = [];
    this.getFilms = () => {
        const sql = "SELECT * FROM films"
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    rows.forEach((e) => {
                        let f = new Film(e.id, e.title, e.favorite, e.watchdate, e.rating);
                        this.arrayFilms.push(f)
                    })
                    resolve(this.arrayFilms);
                }
            })
        })
    }

    this.getFavorites = () => {
        let favoriteFilms = []
        const sql = "SELECT * FROM films"
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    rows.forEach((elem) => {
                        if(elem.favorite == 1){
                            let f = new Film(elem.id, elem.title, elem.favorite, elem.watchdate, elem.rating);
                            favoriteFilms.push(f);
                        } 
                    });
                    resolve(favoriteFilms);
                }
            })
        })
    }

    this.watchedToday = () => {
        let todayFilms = [];
        const sql = "SELECT * FROM films WHERE watchdate = ? "
        let now = dayjs().format('YYYY-MM-DD');
        return new Promise((resolve, reject) => {
            db.all(sql, [now], (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    rows.forEach((elem) => {
                        let f = new Film(elem.id, elem.title, elem.favorite, elem.watchdate, elem.rating);
                        todayFilms.push(f);
                    })
                    resolve(todayFilms);
                }
            })
        })
    }

    this.watchedBefore = (date) => {
        let beforeFilms = [];
        const sql = "SELECT * FROM films WHERE DATE(watchdate) < DATE(?) "
        return new Promise((resolve, reject) => {
            db.all(sql, [date], (err, rows) => {
                if(err){
                    reject(err);
                }
                else{
                    rows.forEach((elem) => {
                        let f = new Film(elem.id, elem.title, elem.favorite, elem.watchdate, elem.rating);
                        beforeFilms.push(f);
                    })
                    resolve(beforeFilms);
                }
            })
        })
    }

    this.getFilmByRating = (rating) => {
        let ratedFilms = [];
        const sql = "SELECT * FROM films WHERE rating >= ? ";
        return new Promise((resolve, reject) => {
            db.all(sql, [rating], (err, rows) => {
                if(err){
                    reject(err);
                }
                else {
                    rows.forEach((elem) => {
                        let f = new Film(elem.id, elem.title, elem.favorite, elem.watchdate, elem.rating);
                        ratedFilms.push(f);
                    });
                    resolve(ratedFilms);
                }
            })
        })
    }

    this.getFilmByTitle = (title) => {
        let selectedFilms = [];
        const sql = "SELECT * FROM films WHERE title = ? ";
        return new Promise((resolve, reject) => {
            db.all(sql, [title], (err, rows) => {
                if(err){
                    reject(err);
                }
                else {
                    rows.forEach((elem) => {
                        let f = new Film(elem.id, elem.title, elem.favorite, elem.watchdate, elem.rating);
                        selectedFilms.push(f);
                    });
                    resolve(selectedFilms);
                }
            })
        })
    }


} 

const allFilms = new FilmLibrary();


console.log("-----------------ALL FILMS-------------");
let films = allFilms.getFilms();
//films.then((values) => values.forEach((elem) => console.log(elem))).catch((err) => console.log(err));

console.log("-----------------FAVORITE FILMS-------------");
films = allFilms.getFavorites();
//films.then((values) => values.forEach((elem) => console.log(elem))).catch((err) => console.log(err));

console.log("-----------------WATCHED TODAY-------------");
films = allFilms.watchedToday();
//films.then((values) => values.forEach((elem) => console.log(elem))).catch((err) => console.log(err));

console.log("-----------------WATCHED BEFORE THE DATE-------------");
films = allFilms.watchedBefore("2022-03-17");
//films.then((values) => values.forEach((elem) => console.log(elem))).catch((err) => console.log(err));

console.log("-----------------SELECTED FOR RATING-------------");
films = allFilms.getFilmByRating("4");
//films.then((values) => values.forEach((elem) => console.log(elem))).catch((err) => console.log(err));

console.log("-----------------SELECTED FOR TITLE-------------");
films = allFilms.getFilmByTitle("Shrek");
films.then((values) => values.forEach((elem) => console.log(elem))).catch((err) => console.log(err));

/* allFilms.addNewFilm(new Film(1, "Pulp Fiction", true, "March 10, 2022", 5))
 */

debugger;