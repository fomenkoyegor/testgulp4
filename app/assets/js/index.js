const random = (min=0,max=1)=> Math.round(Math.random() * (max - min) + min);
console.log(random(5,6));
console.log(random(5,150));
console.log(random(0,255));
console.log(random(359));
console.log(random(151,1651165));

console.log($("body")) 

$("h1").css({
    color:"purple"
})