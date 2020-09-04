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
		const btnMenu = document.querySelector(".menu"),
			menu = document.querySelector("menu"),
			closeBtn = document.querySelector(".close-btn"),
			menuItems = menu.querySelectorAll("ul>li");
		const handlerMenu = () => {
			menu.classList.toggle("active-menu");
		};

		btnMenu.addEventListener("click", handlerMenu);
		//Закрытие меню на крестик
		closeBtn.addEventListener("click", handlerMenu);

		menuItems.forEach((elem) =>
			elem.addEventListener("click", handlerMenu)
		);
	};
	toggleMenu();

	//popup
	const togglePopUp = () => {
		const popUp = document.querySelector(".popup"),
			popUpBtn = document.querySelectorAll(".popup-btn"),
			popUpClose = document.querySelector(".popup-close"),
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
					cancelAnimationFrame(rideInterval);
					console.log("p");
				}
				popUp.style.display = "block";
			});
		});
		//Закрытие модального окна
		popUpClose.addEventListener("click", () => {
			popUp.style.display = "none";
			count = 0;
			cancelAnimationFrame(showPopUp);
		});

		//плавная прокрутка страницы при клике на элементы меню
		const smoothLinks = document.querySelectorAll('a[href^="#"]');
		for (let smoothLink of smoothLinks) {
			smoothLink.addEventListener("click", (e) => {
				e.preventDefault();
				const id = smoothLink.getAttribute("href");

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
});
//15:12
