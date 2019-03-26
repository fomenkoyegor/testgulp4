"use strict";
// import from from 'core-js-pure/features/array/from';
// import flat from 'core-js-pure/features/array/flat';
// import Set from 'core-js-pure/features/set';
import  Promise from 'core-js-pure/features/promise';
import { Axios } from 'axios';
import random from './random';
import EventObserver from './event-observer';
import { async, resolve, reject } from 'q';
const observer = new EventObserver();
const axios = new Axios();
const log = (data) => console.log(data);
const links = document.querySelectorAll("header nav ul li a");

const main = document.querySelector("main");
const url = "../static/pages/";
const getPage = async (url,page) =>{
    const res = await axios.get(url + page + ".html");
    return res.data;
}                                     

const getContent = (page = 'main') => {
    links.forEach((link, index) => {
        observer.subscribe(data => {
            console.log("click on link " + data.link)
        })
        link.classList.remove("active");
        if (link.dataset.src == page) {
            link.classList.add("active");
        }
    })
    main.classList.remove("show");
    // fetch(url + page + ".html")
    //     .then(res => res.text())
    //     .then(res => {
    //         main.innerHTML = '';
    //         main.innerHTML = res;
    //         main.classList.add("show");
    //     })
    // axios.get(url + page + ".html")
    //     .then(res => {
    //         main.innerHTML = '';
    //         main.innerHTML = res.data;
    //         main.classList.add("show");
    //     });
    getPage(url,page).then(data=>{
        main.innerHTML = '';
        main.innerHTML = data;
        main.classList.add("show"); 
    })  
   

}


(new Promise((resolve,reject)=>setTimeout(resolve,500)))
    .then(res=>console.log("promise"))




getContent();

links.forEach((link, index) => link.addEventListener("click", e => {
    e.preventDefault();
    getContent(e.target.dataset.src);
    observer.broadcast({ link: e.target.dataset.src });
}))


const items = document.querySelectorAll(".item");
// const random = (min,max)=>Math.round(Math.random() * (max - min) + min);
const setActiveItem = () => {
    items.forEach((item, index) => {
        item.classList.remove('show');
        if (index == random(0, items.length - 1)) {
            item.classList.add('show');
        }
    })
}
setInterval(() => setActiveItem(), 1000);


//   class State {
//       constructor(props = {}){
//           this.props = props;
//       }
//     state(){
//         return this.props;
//     }  

//     setState(props={}){
//         Object.assign(this.props,...props)
//     }

//   }


//   const meneger = new State();
//   meneger.setState({name:"vasya"});
//   meneger.setState({adrres:{street:"LA"}});
//   console.log(meneger.state());


class A {
    getA() {
        console.log("B")
    }
}

const a = new A();
a.getA();
log(random(1, 2))
