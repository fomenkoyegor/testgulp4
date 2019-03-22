class Slider {
    constructor(slider) {
        this.slider = slider;
    }

    getDomElName() {
        console.log(this.slider);
    }
}



const slider = new Slider(document.getElementById("slider"));
slider.getDomElName();