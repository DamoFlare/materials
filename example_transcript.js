'use strict'

const sqlite = require('sqlite3');
const db = new sqlite.Database('./transcript.sqlite', (err) => {
    if (err) {
        throw err;
    }
});;  //path al file, callback

const sql = "SELECT * FROM exam"
let names = [];
function courseNames(result){
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err){
                reject(err);
            }
            else {
                names = rows.map((exam)=> exam.name);
                resolve(names);
            }
        });
    });
}

const names_promise = courseNames();
names_promise.then((values) => {console.log(values)}).catch((err) => {console.log(err)});

courseNames( (mynames) => {
    console.log(mynames);
})