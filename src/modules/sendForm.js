//send-ajax-form
const sendForm = () => {
    const statusMessage = document.createElement("img");
    statusMessage.src = "./images/loader.gif";
    const successMessage = document.createElement("div"),
        errorMessage = "Что-то пошло не так...";
    successMessage.style.cssText = "font-size: 2rem; color: white;";
    successMessage.textContent = "Ваша заявка принята";
    let phoneValue;
    //для каждой формы
    document.querySelectorAll("form").forEach((form) => {
        let input = form.querySelectorAll("input");
        [...input].forEach((elem) => {
            elem.addEventListener("input", () => {
                if (elem.classList.contains("form-phone")) {
                    elem.style.cssText = `border:none`;
                    elem.value = elem.value.replace(/[^0-9+]/g, '');
                    phoneValue = elem.value;
                }
            });
        });
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if ((phoneValue.slice(0, 1) === '+' && phoneValue.length === 12) ||
                (phoneValue.slice(0, 1) === '8' && phoneValue.length === 11)) {

                form.appendChild(statusMessage);
                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error("status network not 200.");
                        }
                        form.removeChild(statusMessage);
                        form.appendChild(successMessage);
                    })
                    .catch((error) => {
                        [...input].forEach(item => {
                            item.style.cssText = `border: none`;
                        });
                        statusMessage.textContent = errorMessage;
                    });

                //через 3 секунды очищаем инпут
                setTimeout(() => {
                    form.querySelectorAll("input").forEach((item) => {
                        item.value = "";
                    });
                }, 3000);
                //через 7 секунд убирается запись об успешной отправке
                setTimeout(() => {
                    form.removeChild(successMessage);
                }, 7000);
            } else {
                [...input].forEach(item => {
                    if (item.classList.contains('form-phone')) {
                        item.style.cssText = `border: 2px solid red`;
                    }
                });
            }
        });
    });

    //функция запроса на сервер
    const postData = (body) =>
        fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    //запрет ввода в инпуте "номера" всего кроме цифр и знака +
    /* document
        .querySelectorAll('input[name="user_phone"]')
        .forEach((item) => {
            item.addEventListener("input", () => {
                item.value = item.value.replace(/[^\+\d]/g, "");
            });
        }); */
    //запрет ввода в инпуте "имя" и "сообщение" всего, кроме кириллицы и пробелов
    document.querySelectorAll('input[name="user_name"]').forEach((item) => {
        item.addEventListener("input", () => {
            item.value = item.value.replace(/[^а-я\s]/gi, "");
        });
    });
    document
        .querySelectorAll('input[name="user_message"]')
        .forEach((item) => {
            item.addEventListener("input", () => {
                item.value = item.value.replace(/[^а-я0-9.,!-?\s]/gi, "");
            });
        });
};
export default sendForm;