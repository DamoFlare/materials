'use strict'
const sqlite = require('sqlite3');

function Exam(code, name, cfu, date, score){
    this.code=code;
    this.name=name;
    this.cfu=cfu;
    this.date=date;
    this.score=score;
}

function ExamList(){
    const db = new sqlite.Database('./transcript.sqlite', (err) => {
        if (err){
            throw err;
        }
    });
    this.add = (exam) => {
        return new Promise((resolve, reject) => {
            const sql =  'INSERT INTO exam (code, name, cfu, date, score) VALUES (?,?,?,?,?)';
            db.run(sql, [exam.code, exam.name, ], (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
        })
    };

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM exam';
            db.all(sql, (err, rows) => {
                if(err){
                    reject(err);
                }
                else {
                    resolve(rows.map((elem) =>{
                        new Exam(elem.code, elem.name, elem.cfu, elem.date, elem.score);
                    }));
                }
            })
        })
    }
}


// MAIN CODE


async function main(){
    const exams = new ExamList();

    exams.add(new Exam('66zzz', 'title', 6, '2021-09-01', 24))
        .then((result) => {
            console.log("Successfully inserted");
        })
        .catch((err) => {
            console.log("Error in insert", err);
        });
    exams.getAll().then((list) => {console.log(list)});  
    const myExams = await exams.getAll();  
}


