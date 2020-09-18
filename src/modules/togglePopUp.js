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
		count += 100;
		if (count < (widthWindow - 290) / 2) {
			popUpContent.style.left = count + "px";
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
				console.log("a");
			} else {
				popUpContent.style.left = (widthWindow - 250) / 2 + "px";
				console.log("p");
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

	//плавная прокрутка страницы при клике на элементы меню
	const menu = document.querySelector("menu"),
		smoothLinks = menu.querySelectorAll('li a[href^="#"]');
	for (let btnLinkMenu of smoothLinks) {
		btnLinkMenu.addEventListener("click", (e) => {
			e.preventDefault();
			const id = btnLinkMenu.getAttribute("href");

			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	}
	//Перемещение на следущий слайд по нажатию кнопку
	const btnLink = document.querySelector("a");
	const scrolDown = () => {
		let windowCoords = document.documentElement.clientHeight;
		(function scroll() {
			if (window.pageYOffset < windowCoords) {
				window.scrollBy(0, 10);
				setTimeout(scroll, 0);
			}
			if (window.pageYOffset > windowCoords) {
				window.scrollTo(0, windowCoords);
			}
		})();
	};
	btnLink.addEventListener("click", scrolDown);
};
export default togglePopUp;
