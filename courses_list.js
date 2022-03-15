'use strict'
const all_courses = "Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technlogies and services, Information system security, Software engineering, System and device programming"
const course_list = all_courses.split(",")
console.log(course_list)
for(let i=0; i<course_list.length; i++){
    course_list[i] = course_list[i].trim()
}
console.log(course_list)

const acronyms = [];
for(let course of course_list){
    let acronym = "";
    for(let i=0; i<course.length; i++){
        if(i==0 || course[i-1]===' '){
            acronym = acronym + course[i].toUpperCase()
        }
    }
    acronyms.push(acronym)
}
console.log(acronyms)