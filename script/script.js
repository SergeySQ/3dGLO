/* eslint-disable strict */
window.addEventListener("DOMContentLoaded", () => {
	"use strict";
	// Timer
	const countTimer = (deadline) => {
		const timerHours = document.querySelector("#timer-hours"),
			timerMinutes = document.querySelector("#timer-minutes"),
			timerSeconds = document.querySelector("#timer-seconds");

		function getTimeRemaining() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);
			return {
				timeRemaining,
				hours,
				minutes,
				seconds,
			};
		}
		//Добавление нуля перед значениями которые состоят  из одной цифры (из 4:6:50 сделает 04:06:50)
		const addZero = function (time) {
			if (time >= 0 && time < 10) {
				return "0" + time;
			} else {
				return time;
			}
		};
		//Обновление таймера
		const updateClockId = setInterval(() => {
			const timer = getTimeRemaining();

			timerHours.textContent = addZero(timer.hours);
			timerMinutes.textContent = addZero(timer.minutes);
			timerSeconds.textContent = addZero(timer.seconds);

			//Очистка таймера
			if (timer.timeRemaining <= 0) {
				clearInterval(updateClockId);
				timerHours.textContent = "00";
				timerMinutes.textContent = "00";
				timerSeconds.textContent = "00";
			}
		}, 1000);
	};

	countTimer("4 september 2020");

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
	toggleMenu();

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
	togglePopUp();

	//Табы
	const tabs = () => {
		const tabHeader = document.querySelector(".service-header"),
			tab = tabHeader.querySelectorAll(".service-header-tab"),
			tabContent = document.querySelectorAll(".service-tab");
		const toggleTabContent = (index) => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add("active");
					tabContent[i].classList.remove("d-none");
				} else {
					tab[i].classList.remove("active");
					tabContent[i].classList.add("d-none");
				}
			}
		};
		tabHeader.addEventListener("click", (event) => {
			let target = event.target;
			target = target.closest(".service-header-tab");
			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();
});
//15:12
