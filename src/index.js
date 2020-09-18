"use strict";

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
import 'date-polyfill';
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import littleThings from "./modules/littleThings";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";
// Timer
countTimer("21 september 2020");

//Меню
toggleMenu();

//popup
togglePopUp();

//Табы
tabs();
//Слайдер
slider();
//Мелкие детали

littleThings();
//Калькулятор
calc(100);

//send-ajax-form

sendForm();