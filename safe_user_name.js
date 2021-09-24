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

function saveRecord(level){
    if(localStorage["records"] === undefined || localStorage["records"] === null){
        localStorage["records"] = JSON.stringify([]);
    }

    const nickname = read();

    const records = JSON.parse(localStorage["records"]);

    records.push({nickname: nickname, level: level});


    localStorage["records"] = JSON.stringify(records);

}

function getRecords() {
    if(localStorage["records"] === undefined || localStorage["records"] === null){
        return [];
    }

    return JSON.parse(localStorage["records"]);
}