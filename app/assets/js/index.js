const log = (data) => console.log(data);
const links = document.querySelectorAll("header nav ul li a");
const main = document.querySelector("main");
const url = "../static/pages/";

const getContent = (page = 'main') => {
    links.forEach((link, index) => {
        link.classList.remove("active");
        if (link.dataset.src == page) {
            link.classList.add("active");
        }
    })
    main.classList.remove("show");
    fetch(url + page + ".html")
        .then(res => res.text())
        .then(res => {
            main.innerHTML = '';
            main.innerHTML = res;
            main.classList.add("show");
        })
}

getContent();

links.forEach((link, index) => link.addEventListener("click", e => {
    e.preventDefault();
    getContent(e.target.dataset.src)
}))


const items = document.querySelectorAll(".item");
const random = (min,max)=>Math.round(Math.random() * (max - min) + min);
const setActiveItem = ()=>{
    items.forEach((item,index)=>{
     item.classList.remove('show');
     if(index==random(0,items.length-1)){
       item.classList.add('show');    
     }
    })
  }
  setInterval(()=>setActiveItem(),1000);