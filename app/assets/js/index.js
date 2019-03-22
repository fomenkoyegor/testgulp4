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