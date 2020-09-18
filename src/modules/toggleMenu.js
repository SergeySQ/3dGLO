//Меню
const toggleMenu = () => {
    const body = document.body,
        menu = document.querySelector("menu");
    const handlerMenu = (e) => {
        menu.classList.toggle("active-menu");
    };
    body.addEventListener("click", (e) => {
        let target = e.target;
        if (target.closest(".menu")) {
            handlerMenu();
        } else if (target.classList.contains("close-btn")) {
            handlerMenu();
        } else if (
            !target.classList.contains("active-menu") &&
            menu.classList.contains("active-menu") &&
            !target.matches("li")
        ) {
            handlerMenu();
        }
    });
};
export default toggleMenu;