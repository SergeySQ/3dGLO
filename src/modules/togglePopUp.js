'use strict';
//popup
const togglePopUp = () => {
	const popUp = document.querySelector(".popup"),
		popUpBtn = document.querySelectorAll(".popup-btn"),
		popUpContent = document.querySelector(".popup-content");
	let widthWindow = document.documentElement.clientWidth;
	//отслеживает размер нашего окна
	window.addEventListener("resize", () => {
		widthWindow = document.documentElement.clientWidth;

	});
	//Анимашка
	let count = 0,
		rideInterval;
	const showPopUp = () => {
		rideInterval = requestAnimationFrame(showPopUp);
		count += 10;
		if (count < (widthWindow - 1250) / 2) {
			popUpContent.style.top = count + "px";
			popUpContent.style.left = 800 + "px";
		} else {
			cancelAnimationFrame(rideInterval);
		}
	};
	//Запуск нашей анимации и показывает наше модальное окно
	popUpBtn.forEach((elem) => {
		elem.addEventListener("click", () => {
			if (widthWindow > 768) {
				rideInterval = requestAnimationFrame(showPopUp);
				count = 0;

			} else {
				popUpContent.style.top = (widthWindow - 250) / 2 + "px";

			}
			popUp.style.display = "block";
		});
	});

	//Закрытие модального окна
	popUp.addEventListener("click", (e) => {
		let target = e.target;

		if (target.classList.contains("popup-close")) {
			popUp.style.display = "none";
		} else {
			target = target.closest(".popup-content");
			if (!target) {
				popUp.style.display = "none";
			}
		}
	});


};
export default togglePopUp;