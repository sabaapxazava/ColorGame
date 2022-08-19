const startBtn = document.querySelector("#start");
const allBoxes = document.querySelectorAll(".box");
const winnerColorBtn = document.querySelector("#winnerColor");
const resultBtn = document.querySelector("#result");
const hardBtn = document.querySelector("#hard");
const easyBtn = document.querySelector("#easy");
const gameLogicBtns = document.querySelectorAll(".game-logic-btn")
const logicSelectorBtn = document.querySelector("#logicSelector");
var gameIndicator = "hard";
var luckyColor = undefined;
var colorsCollection = [];
var gameLogic = false;
var tryCount = 1;

function generateRand(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}

function generateColor() {
    return `rgb(${generateRand(0, 255)},${generateRand(0, 255)},${generateRand(0, 255)})`;
}

function getRandomColorsList(colorsCount) {
    var tmpColors = [];
    if (colorsCount == undefined) {
        colorsCount = 6;
    }
    while (tmpColors.length < colorsCount) {
        tmpColors.push(generateColor());
    }

    return tmpColors;
}


function setColorsToBoxes(boxes, colorsList) {
    boxes.forEach(item => {
        item.style.backgroundColor = colorsList.pop()
    })
}

function getLuckyColor(colorsList) {
    return colorsList[generateRand(0, colorsList.length - 1)];
}

function resetGame() {
    resultBtn.classList.remove("btn-danger");
    resultBtn.classList.remove("btn-success");
    resultBtn.classList.add("btn-warning");
    resultBtn.textContent = "............";
    tryCount = 1;
}

function startGame(boxes, boxCount) {
    colorsCollection = getRandomColorsList(boxCount);
    luckyColor = getLuckyColor(colorsCollection);
    setColorsToBoxes(boxes, colorsCollection);
    winnerColorBtn.textContent = luckyColor;
    gameLogic = true;
    resetGame();
}


startBtn.addEventListener("click", function () {
    if (gameIndicator == "hard")
        startHardGame()
    else
        startEasygame()
});

function startEasygame() {
    let boxes = [allBoxes[0], allBoxes[1], allBoxes[2]];
    startGame(boxes, 3);
    showAndHideBtns(3);
    logicSelectorBtnAnimation();
}

function startHardGame() {
    startGame(allBoxes, 6);
    showAndHideBtns(6);
    logicSelectorBtnAnimation();
}

gameLogicBtns.forEach(logicBtnitem => {
    logicBtnitem.addEventListener("click", function () {
        gameIndicator = this.id;
        switch (this.id) {
            case "easy":
                startEasygame();
                break;
            case "hard":
                startHardGame();
                break
            default:
        }
    })
})

function logicSelectorBtnAnimation() {
    logicSelectorBtn.classList.add(gameIndicator == "hard" ? "hard" : "easy");
    logicSelectorBtn.classList.remove(gameIndicator == "hard" ? "easy" : "hard");
}

function showAndHideBtns(count) {
    allBoxes.forEach((btn, index) => {
        if (index >= count) {
            btn.classList.add("hide");
            btn.classList.remove("show");
        } else {
            btn.classList.add("show");
            btn.classList.remove("hide");
        }
    })
}

function showSuccessAlert() {
    swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
    });
}


allBoxes.forEach(boxItem => {
    boxItem.addEventListener("click", function () {
        if (gameLogic) {
            if (luckyColor == this.style.backgroundColor.replaceAll(" ", "")) {
                resultBtn.textContent = "SUCCESS";
                resultBtn.classList.remove("btn-warning");
                resultBtn.classList.remove("btn-danger");
                resultBtn.classList.add("btn-success");
                gameLogic = false;
                if (tryCount == 1) {
                    showSuccessAlert();
                }
            } else {
                resultBtn.textContent = "FAILED";
                resultBtn.classList.remove("btn-warning");
                resultBtn.classList.add("btn-danger");
                if (tryCount > 0) {
                    tryCount--;
                    this.classList.remove("show");
                    this.classList.add("hide");
                }
            }
            if (tryCount == 0) {
                gameLogic = false;
            }
        }
    });
})