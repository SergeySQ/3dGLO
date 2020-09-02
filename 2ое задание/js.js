"use strict";

let date = new Date(),
	weekDay = new Array(
		"Воскресенье",
		"Понедельник",
		"Вторник",
		"Среда",
		"Четверг",
		"Пятница",
		"Суббота"
	);

if (date.getHours() >= 0 && date.getHours() <= 6) {
	out.innerHTML = "Сейчас ночь";
} else if (date.getHours() >= 6 && date.getHours() <= 12) {
	out.innerHTML = "Сейчас Утро";
} else if (date.getHours() >= 12 && date.getHours() <= 18) {
	out.innerHTML = "Сейчас день";
} else if (date.getHours() >= 18 && date.getHours() <= 24) {
	out.innerHTML = "Сейчас вечер";
}
const countFullYear = (deadline) => {
	let newYear = new Date(deadline).getTime(),
		NowУaer = new Date().getTime(),
		timeRemaining = Math.floor((newYear - NowУaer) / 1000 / 60 / 60 / 24);
	return timeRemaining;
	console.log(timeRemaining);
};
const countTime = setInterval(() => {
	const dateNow = new Date(),
		hours = dateNow.getHours(),
		minutes = dateNow.getMinutes(),
		seconds = dateNow.getSeconds();
	out2.innerHTML = dateNow.toLocaleTimeString('en');
}, 1000);




out1.innerHTML = "Сегодня: " + weekDay[date.getDay()];

out3.innerHTML =
	"До нового года осталось " + countFullYear("1 January 2021") + " дней";