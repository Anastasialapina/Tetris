function store() {
    localStorage["tetris.username"] = document.getElementById("input-field").value;
}
function read() {
    let username = localStorage["tetris.username"];
    if (username === undefined) {
        return "";
    }
    return username;
}
function setUsername() {
    let inputField = document.getElementById("input-field");
    console.log(read());
    inputField.value = read();
}

// function saveRecord(level){
//     if(localStorage["records"] === undefined || localStorage["records"] === null){
//         localStorage["records"] = JSON.stringify([]);
//     }
//
//     const nickname = read();
//
//     const records = JSON.parse(localStorage["records"]);
//
//     records.push({nickname: nickname, level: level});
//
//
//     localStorage["records"] = JSON.stringify(records);
//
// }
//
// function getRecords() {
//     if(localStorage["records"] === undefined || localStorage["records"] === null){
//         return [];
//     }
//
//     return JSON.parse(localStorage["records"]);
// }

function saveRecord(level){
    if(localStorage["records"] === undefined || localStorage["records"] === null){
        localStorage["records"] = JSON.stringify([]);
    }
    const nickname = read();
    const records = JSON.parse(localStorage["records"]);

    let checkIsRecord = true;
    for (let el of records) {
        if(el.nickname === nickname){
            checkIsRecord = false;
            if(el.level < level){
                el.level = level;
            }
        }
    }

    if(checkIsRecord) {
        records.push({nickname: nickname, level: level});
    }

    localStorage["records"] = JSON.stringify(records);
}

function getRecords(){
    if (localStorage["records"] === undefined || localStorage["records"] === null) {
        return [];
    }
    return JSON.parse(localStorage["records"]);
}
function DrawRecordTable(){
    let array = getRecords();
    console.log(array);
    const modalTable = document.getElementById("modal-table");
    modalTable.style.display = "block";
    const recordsTable = document.getElementById("records-table");
    recordsTable.innerHTML = "<tr style='background: antiquewhite'><td>Имя</td><td>Монеты</td></tr>";
    let resultsStr = "";
    for (let el of array) {
        resultsStr += `<tr><td>${el.nickname}</td><td>${el.level}</td></tr>`;
    }
    recordsTable.innerHTML += resultsStr;
}
function clearRecordTable(){
    localStorage.clear();
}

let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup = document.querySelector('.popup'); // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
        e.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
});

closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
});
