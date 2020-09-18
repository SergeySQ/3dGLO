const littleThings = () => {

    //По наведению мышкой меняется фотография
    const mouseOver = (e) => {
        const target = e.target;
        if (target.matches(".command__photo")) {
            target.dataset.image = target.src;
            target.src = target.dataset.img;
        }
    };
    const mouseOut = (e) => {
        const target = e.target;
        if (target.matches(".command__photo")) {
            target.src = target.dataset.image;
        }
    };
    document.getElementById("command").addEventListener("mouseover", mouseOver);
    document.getElementById("command").addEventListener("mouseout", mouseOut);
    //запрет ввода всего кроме цифр в калькуляторе
    const inputArray = [
        document.querySelector(".calc-square"),
        document.querySelector(".calc-count"),
        document.querySelector(".calc-day"),
    ];
    inputArray.forEach((item) => {
        item.addEventListener("input", () => {
            item.value = item.value.replace(/\D/, "");
        });
    });
};
export default littleThings;