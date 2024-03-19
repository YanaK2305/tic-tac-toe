const cards = document.querySelectorAll(".card");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraft = document.getElementById("scoreDraft");
const scoreBottom = document.querySelector(".score__bottom");
const restartBtn = document.querySelector(".restart__btn");

let winX = 0;
// глобальная переменная побед первого игрока
let winO = 0;
// глобальная переменная побед второго игрока
let winDraft = 0;
// глобальная перемення - ничья
let player = "x";
//  глобальная переменная игроков
let end = false;
// глобальная переменная конца игры

const winPos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
// заводим переменную определяющую выигрышные комбинации
cards.forEach((item) => {
  item.onclick = () => handleClick(item);
});
// цикл,в котором мы делаем обработкау события клика по ячекам
restartBtn.onclick = restart;

function handleClick(item) {
  if (item.innerHTML == "" && !end) {
    // если содержимое события не содержит како-то значение (пустая ячейка) и не равно концу игры
    item.innerHTML = player;
    // в ячейку заносим текущего игрока
    checkWin(player);
    checkDraft();
    // выводим функцию проверки победы игрока
    if (player == "x") {
      // если игрок равен Х
      player = "O";
      //   следующее значение игрока О
    } else {
      player = "x";
    }
    // в противоположном случае значение Х
  }
}
// объявляем функцию в которой, мы понимаем можно ли кликать по ячейке, заносим в нее и переключаем игрока, проверяем победу

function checkWin(player) {
  winPos.forEach((item) => {
    let fild1 = document.getElementById(item[0]);
    let fild2 = document.getElementById(item[1]);
    let fild3 = document.getElementById(item[2]);
    // заводим переменные содержащие значения по id из массива трех элементов

    if (
      fild1.innerHTML == player &&
      fild2.innerHTML == player &&
      fild3.innerHTML == player
    ) {
      // если содержимое поля1 равно содержимому поля2 и равно содержимому полю3
      end = true;
      fild1.classList.add("win");
      fild2.classList.add("win");
      fild3.classList.add("win");
      //   то игра закончилась
      setTimeout(() => {
        alert(`Победил игрок: ${player}`);
        scoreBottom.classList.remove("hidden");
      }, 100);
      //   задержка нужна для того, чтобы открылись все три поля перед выводом сообщения "Победил игрок"
      if (player == "x") {
        winX++;
        scoreX.innerHTML = winX;
      }
      //  если игрок завен Х, то приплюсовываем победу и выводим  количество побед игрока Х
      else {
        winO++;
        scoreO.innerHTML = winO;
      }
      return;
      //   иначе выводим количество побед игрока О
    }
  });
}

// объявляем функцию победы игрока Х или игрока О
function restart() {
  scoreBottom.classList.add("hidden");
  cards.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("win");
  });
  end = false;
}
function checkDraft() {
  let check = true;
  cards.forEach((item) => {
    if (item.innerHTML == "") {
      check = false;
    }
  });
  if (check) {
    setTimeout(() => {
      alert("Ничья");
      scoreBottom.classList.remove("hidden");
    }, 100);
    winDraft++;
    scoreDraft.innerHTML = winDraft;
  }
}
