'use strict';

var gNums = [];
var gColLen = parseInt(Math.sqrt(gNums.length));
var gTmpNum = 0;
var gCount = 0;
var gTimeStart ;
var gTimePrev  = 0;
var gSetInterval;

play();

function play() {
    gNums = checkLevel();
    showTable(gNums);
}

function checkLevel() {
    var elRadioButtons = document.querySelectorAll('input');
    for (var i = 0; i < elRadioButtons.length; i++) {
        var currInput = elRadioButtons[i];
        if (currInput.checked) {
            gColLen = parseInt(Math.sqrt(+currInput.value))
            return createBoard(+currInput.value);
        }
    }
}

function StartGame(){
    var elModal =  document.querySelector('.modal')
    elModal.classList.add('collapse');
}

function showTable(nums) {
    gNums = shuffle(gNums);
    
    var elTable = document.querySelector('table');
    var strHTML = '';

    for (var i = 0; i < gColLen; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gColLen; j++) {
            var cell = gNums.splice(0, 1);;
            strHTML += '<td> ' + '<button class="button" ' + 'onclick = cellClicked(this)' + '>' + cell + ' </button>' + '\t' + ' </td>'
        }
        strHTML += '<tr>';
    }
    elTable.innerHTML = strHTML;
}

function writeNextNum(num) {
    var elNextNum = document.querySelector('.nextNumber');
    if (!num || num === gColLen**2) {
        elNextNum.innerHTML = ' ';
    } else {
        elNextNum.innerHTML = num + 1;
    }
}

function cellClicked(clickedNum) {
    var currNum = +clickedNum.innerHTML;

    if (currNum === gTmpNum + 1) {
        if (currNum === 1) {
            gTimeStart = Date.now();
            gSetInterval = setInterval(showTime, 50)
        }
        markedNum(clickedNum);
        gCount++;
        gTmpNum = +clickedNum.innerHTML;
        writeNextNum(gTmpNum);
    }
    if (gCount === gColLen ** 2) {
        gCount = 0;
        gTmpNum = 0;
        clearInterval(gSetInterval);
    }
}

function markedNum(el) {
    el.style.background = '#3c3838';
    el.style.color = 'black';
    el.classList.add('mark');
}

function resetGame() {
    clearInterval(gSetInterval);
    var elButtons = document.querySelectorAll('.mark')
    showPrevtime();
    console.log(elButtons);

    for (var i = 0; i < elButtons.length; i++) {
        var currButton = elButtons[i];
        currButton.style.color = 'white';
        currButton.classList.remove('mark');
        currButton.style.background = 'linear-gradient(rgb(218, 112, 27), rgba(255, 230, 0, 0.945))';
    }

    gTimeStart = 0;
    var elSpanTime = document.querySelector('.time');
    elSpanTime.innerHTML = gTimeStart;
    writeNextNum();
    play();
}

function showTime() {
    // gTimeStart++;

    var elSpanTime = document.querySelector('.time');
    var currTime = (Date.now()  - gTimeStart )/1000;
    gTimePrev = currTime.toFixed(2);
    elSpanTime.innerHTML = currTime.toFixed(2) ;
    
}
function showPrevtime(){
    if(gTimeStart){
        var elPrevTime = document.querySelector('.Prevtime')
        elPrevTime.innerHTML = gTimePrev;
    }
}

function createBoard(num) {
    var nums = [];
    for (var i = 1; i <= num; i++) {
        nums.push(i);
    }
    return nums;
}

function shuffle(items) {
    var j, x, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = items[i];
        items[i] = items[j];
        items[j] = x;
    }
    return items;
}
