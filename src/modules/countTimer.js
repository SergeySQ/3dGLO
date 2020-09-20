'use strict';

import {
    lab
} from "color-convert";

// Timer
const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours"),
        timerMinutes = document.querySelector("#timer-minutes"),
        timerSeconds = document.querySelector("#timer-seconds");

    const getTimeRemaining = () => {
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
    const addZero = (time) => {
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
    });
};

export default countTimer;