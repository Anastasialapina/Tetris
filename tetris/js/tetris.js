var canvas, figure;
var ctx, ctx_figure;
var xm  = 10;
var ym = 15;
var N = 30;

var Time = 1000;
let timerId;

var matrix = new Array(xm);
for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(ym);
}
var active_figure = [];
var rgb_active_figure = [];
var next_figure = [];
var rgb_next_figure = [];

var matrix_figure = new Array(10);
for (let i = 0; i < matrix_figure.length; i++) {
    matrix_figure[i] = new Array(4);
}
var r, g, b;
var flag = true;
var level = 0;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return  Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function game(){
    DrawRecordTable();
    flag = true;
    level = 0;
    init();
    canvas = document.getElementById('canvas_game');
    ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    moving_figure();
    startGame();
}

function init() {
    const playerName = document.getElementById("player-name");
    playerName.innerText = read();
    let levelPlayer = document.getElementById("level");
    levelPlayer.innerText = level;
}

function drawNet(ctx1, xmax, ymax){

    for (let x = 0; x < xmax*N; x += N) {
        ctx1.moveTo(x, 0);
        ctx1.lineTo(x, ymax*N);
    }

    for (let y = 0; y < ymax*N; y += N) {
        ctx1.moveTo(0, y);
        ctx1.lineTo(xmax*N, y);
    }

    ctx1.strokeStyle = "#800080";
    ctx1.stroke();
}

function drawNextFigure(){
    for (let i = 0; i<xm; i++){
        for (let j = 0; j<4; j++){
            matrix_figure[i][j] = 0;
        }
    }
    figure = document.getElementById('canvas_figure');
    ctx_figure = figure.getContext('2d');
    ctx_figure.clearRect(0, 0, figure.width, figure.height);
    for (let i = 0; i < xm; i++) {
        for (let j = 0; j < 4; j++) {
            if ((i === next_figure[0] && j === next_figure[1]) || (i === next_figure[2] && j === next_figure[3])
                || (i === next_figure[4] && j === next_figure[5]) || (i === next_figure[6] && j === next_figure[7])){
                matrix_figure[i][j] = next_figure[8];
                square1(matrix_figure[i][j], i * N, j * N);
            }
        }
    }
    drawNet(ctx_figure, xm, 4);
}

function square1(col, x, y) {
    ctx_figure.fillStyle = `rgba(${rgb_next_figure[0]}, ${rgb_next_figure[1]}, ${rgb_next_figure[2]}, 1)`;
    ctx_figure.fillRect(x, y, N, N);
}

function new_figure(){
    switch (getRandomIntInclusive(1, 7)) {
        case 1:
            figure1(getRandomIntInclusive(1, 10));
            break;
        case 2:
            figure2(getRandomIntInclusive(1, 10));
            break;
        case 3:
            figure3(getRandomIntInclusive(1, 10));
            break;
        case 4:
            figure4(getRandomIntInclusive(1, 10));
            break;
        case 5:
            figure5(getRandomIntInclusive(1, 10));
            break;
        case 6:
            figure6(getRandomIntInclusive(1, 10));
            break;
        default:
            figure7(getRandomIntInclusive(1, 10));
            break;
    }
}

function checkStr(){
    for(let n = 0; n<ym; n++) {
        if (canCleanStr(n)) {
            if (Time>300){
                Time = Time - 100;
            }
            else{
                if(Time>200){
                    Time = Time - 10;
                }
            }
            cleanStr(n);
            for (let i = 0; i < xm; i++) {
                for (let j = 0; j < ym; j++) {
                    square(matrix[i][j], i * N, j * N);
                }
            }
            level++;
            console.log("level = ", level);
            init();
        }
    }
}

function canCleanStr(n){
    let count = 0;
    for (let i = 0; i<xm; i++){
        if(matrix[i][n] != 0)
            count++;
    }
    if(count===xm)
        return true;
    else
        return false;
}

function  cleanStr(n){
    for(let j = 0; j < n; j++){
        for(let i = 0; i < xm; i++){
            matrix[i][n - j] = matrix[i][n - 1 - j]
        }
    }

    for(let i = 0; i < xm - 1; i++){
        matrix[i][0] = 0;
    }
}

function startGame(){
    clearTimeout(timerId);
    for (let i = 0; i<xm; i++){
        for (let j = 0; j<ym; j++){
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i<xm; i++){
        for (let j = 0; j<4; j++){
            matrix_figure[i][j] = 0;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Time = 1000;
    new_figure();
    active_figure = next_figure.slice();
    rgb_active_figure = rgb_next_figure.slice();
    changeMatrix();
    next_figure.splice(0, next_figure.length);
    rgb_next_figure.splice(0, rgb_next_figure.length);
    new_figure();
    console.log(active_figure);
    console.log(next_figure);
    drawNextFigure();
    for (let i = 0; i < xm; i++) {
        for (let j = 0; j < ym; j++) {
            square(matrix[i][j], i * N, j * N);
        }
    }
    drawNet(ctx, xm, ym);
    // moving_figure();
    console.log(matrix);
    console.log("rgb = ", rgb_active_figure);
    flag = true;
    timerId = setTimeout(function tick() {
        liveFigure();
        timerId = setTimeout(tick, Time);
    }, 1000);
}

function liveFigure(){
    if(flag) {
        if (canGoDown()) {
            go();
        } else {
            checkStr();
            console.log("Time = ", Time);
            if (active_figure[1] === 0 || active_figure[3] === 0 || active_figure[5] === 0 || active_figure[7] === 0) {
                flag = false;
                console.log("Вы проиграли!");
                alert("Вы проиграли!");
                saveRecord(level);
                DrawRecordTable();
                clearTimeout(timerId);
                Time = 1000;
                // let array = getRecords();
                // console.log(array);
                // const modalTable = document.getElementById("modal-table");
                // modalTable.style.display = "block";
                // const recordsTable = document.getElementById("records-table");
                // recordsTable.innerHTML = "<tr><td>Nickname</td><td>Level</td></tr>";
                // let resultsStr = "";
                // for (let el of array) {
                //     resultsStr += `<tr><td>${el.nickname}</td><td>${el.level}</td></tr>`;
                // }
                // recordsTable.innerHTML += resultsStr;
            }
            else {
                active_figure = next_figure.slice();
                rgb_active_figure = rgb_next_figure.slice();
                changeMatrix();
                next_figure.splice(0, next_figure.length);
                rgb_next_figure.splice(0, rgb_next_figure.length);
                new_figure();
                drawNextFigure();
                for (let i = 0; i < xm; i++) {
                    for (let j = 0; j < ym; j++) {
                        square(matrix[i][j], i * N, j * N);
                    }
                }
                drawNet(ctx, xm, ym);
            }
        }
    }
}

function canGoDown() {
    if ((active_figure[1] >= ym - 1) || (active_figure[3] >= ym - 1) || (active_figure[5] >= ym - 1) || (active_figure[7] >= ym - 1))
        return false;  //дошли до конца
    if (((matrix[active_figure[0]][active_figure[1] + 1] === 0) || ((active_figure[0] === active_figure[2]) && ((active_figure[1] + 1) === active_figure[3])) ||
            ((active_figure[0] === active_figure[4]) && ((active_figure[1] + 1) === active_figure[5])) || ((active_figure[0] === active_figure[6]) && ((active_figure[1] + 1) === active_figure[7])))


        && ((matrix[active_figure[2]][active_figure[3] + 1] === 0) || ((active_figure[2] === active_figure[0]) && ((active_figure[3] + 1) === active_figure[1])) ||
            ((active_figure[2] === active_figure[4]) && ((active_figure[3] + 1) === active_figure[5])) || ((active_figure[2] === active_figure[6]) && ((active_figure[3] + 1) === active_figure[7])))

        && ((matrix[active_figure[4]][active_figure[5] + 1] === 0) || (active_figure[4] === active_figure[0] && active_figure[5] + 1 === active_figure[1]) ||
        (active_figure[4] === active_figure[2] && active_figure[5] + 1 === active_figure[3]) || (active_figure[4] === active_figure[6] && active_figure[5] + 1 === active_figure[7]))

        && ((matrix[active_figure[6]][active_figure[7] + 1] === 0) || ((active_figure[6] === active_figure[0]) && ((active_figure[7] + 1) === active_figure[1])) ||
        ((active_figure[6] === active_figure[2]) && ((active_figure[7] + 1) === active_figure[3])) || ((active_figure[6] === active_figure[4]) && ((active_figure[7] + 1) === active_figure[5]))))

        return true;
    else
        return false;
}

function square(col, x, y){
    ctx.clearRect((active_figure[x])*N, (active_figure[y])*N, N, N);
    color(col);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    ctx.fillRect(x, y, N, N);
}

function go(){
    for(let i = 0; i<4; i++){
        matrix[active_figure[i*2]][active_figure[i*2+1]] = 0;
        active_figure[i*2+1]++;
    }
    for (let i = 0; i<4; i++) {
        matrix[active_figure[i*2]][active_figure[i*2+1]] = rgb_active_figure[3];
    }
    for(let i = 0; i<xm; i++){
        for (let j = 0; j<ym; j++){
            square(matrix[i][j], i*N, j*N);
        }
    }
    drawNet(ctx, xm, ym);
}

function CanGoRight(){
    if(((matrix[active_figure[0] + 1][active_figure[1]] === 0) || (((active_figure[0]+1) === active_figure[2]) && (active_figure[1] === active_figure[3]))
            ||(((active_figure[0]+1) === active_figure[4]) && (active_figure[1] === active_figure[5]))
            ||(((active_figure[0]+1) === active_figure[6]) && (active_figure[1] === active_figure[7])))

        && ((matrix[active_figure[2] + 1][active_figure[3]] === 0) || (((active_figure[2]+1) === active_figure[0]) && (active_figure[3] === active_figure[1]))
            ||(((active_figure[2]+1) === active_figure[4]) && (active_figure[3] === active_figure[5]))
            ||(((active_figure[2]+1) === active_figure[6]) && (active_figure[3] === active_figure[7])))

        && ((matrix[active_figure[4] + 1][active_figure[5]] === 0) || (((active_figure[4]+1) === active_figure[2]) && (active_figure[5] === active_figure[3]))
            ||(((active_figure[4]+1) === active_figure[0]) && (active_figure[5] === active_figure[1]))
            ||(((active_figure[4]+1) === active_figure[6]) && (active_figure[5] === active_figure[7])))

        && ((matrix[active_figure[6] + 1][active_figure[7]] === 0) || (((active_figure[6]+1) === active_figure[2]) && (active_figure[7] === active_figure[3]))
            ||(((active_figure[6]+1) === active_figure[4]) && (active_figure[7] === active_figure[5]))
            ||(((active_figure[6]+1) === active_figure[0]) && (active_figure[1] === active_figure[7]))))
        return true;
    else
        return false;
}

function CanGoLeft(){
    if(((matrix[active_figure[0] - 1][active_figure[1]] === 0) || (((active_figure[0]-1) === active_figure[2]) && (active_figure[1] === active_figure[3]))
            ||(((active_figure[0]-1) === active_figure[4]) && (active_figure[1] === active_figure[5]))
            ||(((active_figure[0]-1) === active_figure[6]) && (active_figure[1] === active_figure[7])))

        && ((matrix[active_figure[2] - 1][active_figure[3]] === 0) || (((active_figure[2]-1) === active_figure[0]) && (active_figure[3] === active_figure[1]))
            ||(((active_figure[2]-1) === active_figure[4]) && (active_figure[3] === active_figure[5]))
            ||(((active_figure[2]-1) === active_figure[6]) && (active_figure[3] === active_figure[7])))

        && ((matrix[active_figure[4] - 1][active_figure[5]] === 0) || (((active_figure[4]-1) === active_figure[2]) && (active_figure[5] === active_figure[3]))
            ||(((active_figure[4]-1) === active_figure[0]) && (active_figure[5] === active_figure[1]))
            ||(((active_figure[4]-1) === active_figure[6]) && (active_figure[5] === active_figure[7])))

        && ((matrix[active_figure[6] - 1][active_figure[7]] === 0) || (((active_figure[6]-1) === active_figure[2]) && (active_figure[7] === active_figure[3]))
            ||(((active_figure[6]-1) === active_figure[4]) && (active_figure[7] === active_figure[5]))
            ||(((active_figure[6]-1) === active_figure[0]) && (active_figure[1] === active_figure[7]))))
        return true;
    else
        return false;
}

function moving_figure(){
    document.addEventListener( 'keydown', (event) => {
        const keyName = event.key;
        console.log( ' Событие keydown: ' + keyName) ;
        if(keyName === "ArrowRight"  && (active_figure[0]<xm-1 && active_figure[2]<xm-1 && active_figure[4]<xm-1 && active_figure[6]<xm-1)
        &&(active_figure[1]<ym-1 && active_figure[3]<ym-1 && active_figure[5]<ym-1 && active_figure[7]<ym-1) && CanGoRight){

            for (let i = 0; i<4; i++) {
                active_figure[i*2]++;
            }

             for(let i = 0; i<4; i++){
                 matrix[active_figure[i*2] - 1][active_figure[i*2+1]] = 0;
            }
            for(let i = 0; i<4; i++){
                matrix[active_figure[i*2]][active_figure[i*2+1]] = rgb_active_figure[3];
            }
            console.log(active_figure);
            for(let i = 0; i<xm; i++){
                for (let j = 0; j<ym; j++){
                    square(matrix[i][j], i*N, j*N);
                }
            }
        }

        if(keyName === "ArrowLeft" && (active_figure[0]!=0 && active_figure[2]!=0 && active_figure[4]!=0 && active_figure[6]!=0)
        && (active_figure[1]!=ym-1 && active_figure[3]!=ym-1 && active_figure[5]!=ym-1 && active_figure[7]!=ym-1) && CanGoLeft()){

            for(let i = 0; i<4; i++){
                active_figure[i*2]--;
            }

            for(let i = 0; i<4; i++){
                 matrix[active_figure[i*2] + 1][active_figure[i*2+1]] = 0;
            }

            for(let i = 0; i<4; i++){
                matrix[active_figure[i*2]][active_figure[i*2+1]] = rgb_active_figure[3];
            }

            console.log(active_figure);
            for(let i = 0; i<xm; i++){
                for (let j = 0; j<ym; j++){
                    square(matrix[i][j], i*N, j*N);
                }
            }
        }

        if(keyName === "ArrowUp" && active_figure[8]>1){
            if((active_figure[1]<ym-2 && active_figure[3]<ym-2 && active_figure[5]<ym-2 && active_figure[7]<ym-2)
            && (active_figure[1]>0 && active_figure[3]>0 && active_figure[5]>0 && active_figure[7]>0)){
                switch (active_figure[8]){
                    case 2:
                        turnF2();
                        break;
                    case 3:
                        turnF3();
                        break;
                    case 4:
                        turnF4();
                        break;
                    case 5:
                        turnF5();
                        break;
                    case 6:
                        turnF6();
                        break;
                    case 7:
                        turnF7();
                        break;
                }
                console.log(matrix);
                for (let i = 0; i < xm; i++) {
                    for (let j = 0; j < ym; j++) {
                        square(matrix[i][j], i * N, j * N);
                    }
                }
            }
        }

        if(keyName === "ArrowDown" && canGoDown()){

            while ((active_figure[1]!=ym-1 || active_figure[3]!=ym-1 || active_figure[5]!=ym-1|| active_figure[6]!=ym-1) && canGoDown()){
                go();
            }
        }
        drawNet(ctx, xm, ym);
    }) ;
}
