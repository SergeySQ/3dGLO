//Слайдер
const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
        btn = document.querySelectorAll(".portfolio-btn"),
        portfolioDots = document.querySelector(".portfolio-dots"),
        slider = document.querySelector(".portfolio-content");
    //Создание новых лишек
    for (let i = 0; i < slide.length; i++) {
        let newElem = document.createElement("li");
        newElem.classList.add("dot");
        portfolioDots.append(newElem);
    }
    const dot = document.querySelectorAll(".dot");
    dot[0].classList.add("dot-active");

    let currentSlide = 0,
        interval;
    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prevSlide(slide, currentSlide, "portfolio-item-active");
        prevSlide(dot, currentSlide, "dot-active");
        currentSlide++;
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        nextSlide(slide, currentSlide, "portfolio-item-active");
        nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 1800) => {
        interval = setInterval(autoPlaySlide, time);
    };
    const stoptSlide = () => {
        clearInterval(interval);
    };
    slider.addEventListener("click", (e) => {
        e.preventDefault();
        let target = e.target;

        if (!target.matches(".portfolio-btn,.dot")) {
            return;
        }
        prevSlide(slide, currentSlide, "portfolio-item-active");
        prevSlide(dot, currentSlide, "dot-active");

        if (target.matches("#arrow-right")) {
            currentSlide++;
        } else if (target.matches("#arrow-left")) {
            currentSlide--;
        } else if (target.matches(".dot")) {
            dot.forEach((elem, index) => {
                if (elem === target) {
                    currentSlide = index;
                }
            });
        }
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, "portfolio-item-active");
        nextSlide(dot, currentSlide, "dot-active");
    });
    slider.addEventListener("mouseover", (e) => {
        if (
            e.target.matches(".portfolio-btn") ||
            e.target.matches(".dot")
        ) {
            stoptSlide();
        }
    });
    slider.addEventListener("mouseout", (e) => {
        if (
            e.target.matches(".portfolio-btn") ||
            e.target.matches(".dot")
        ) {
            startSlide();
        }
    });
    startSlide(1800);
};
export default slider;