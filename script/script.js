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
	slider();
	//запрет ввода всего кроме цифр в калькуляторе
	const inputArray = [document.querySelector('.calc-square'), document.querySelector('.calc-count'), document.querySelector('.calc-day')];
	inputArray.forEach((item) => {
		item.addEventListener('input', () => {
			item.value = item.value.replace(/\D/, '');
		});
	});
	//По наведению мышкой меняется фотография
	const mouseOver = e => {
		const target = e.target;

		if (target.matches('.command__photo')) {
			target.dataset.image = target.src;
			target.src = target.dataset.img;

		}
	};
	const mouseOut = e => {
		const target = e.target;

		if (target.matches('.command__photo')) {
			target.src = target.dataset.image;
		}
	};
	document.getElementById('command').addEventListener('mouseover', mouseOver);
	document.getElementById('command').addEventListener('mouseout', mouseOut);
	//Калькулятор
	const calc = (price = 100) => {
		const numAnimation = (totalValue, from, to, duration) => {
			let elem = totalValue,
				start = new Date().getTime();
			let timerId = setTimeout(function tick() {
				const now = (new Date().getTime()) - start;
				let progress = now / duration,
					result = Math.floor((to - from) * progress + from);
				elem.textContent = progress < 1 ? result : to;
				if (progress < 1) timerId = setTimeout(tick, 10);
			}, 10);
		};
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector(".calc-type"),
			calcSquare = document.querySelector('.calc-square'),
			calcCount = document.querySelector('.calc-count'),
			calcDay = document.querySelector('.calc-day'),
			totalValue = document.getElementById('total');
		const countSum = () => {
			let total = 0,
				countValue = 1,
				dayValue = 1;
			const typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = parseInt(calcSquare.value);
			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}
			if (calcDay.value && calcDay.value <= 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value <= 10) {
				dayValue *= 1.5;
			}
			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}


			numAnimation(totalValue, +totalValue.textContent, total, 500);
		};

		calcBlock.addEventListener("change", (e) => {
			const target = e.target;
			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};
	calc(100);
});
//15:12