const board = document.getElementById("board");
const winnerMessage = document.getElementById("winnerMessage");
const button = document.getElementById("button");

class Game {
  constructor() {
    this.isCircleTurn = true; // indicate current player
    this.winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.count = 0; // indicate current count
    this.initializeGame();
  }
  initializeGame() {
    // When initializing game, board cells and winner message sould be cleared
    board.innerHTML = "";
    winnerMessage.innerHTML = "";
    board.style.pointerEvents = "auto";
    board.style.cursor = "pointer";
    // generate cellss
    let i = 0;
    while (i < 9) {
      const cell = document.createElement("div");
      cell.setAttribute("data-value", ""); // cell has initial value of ""
      cell.classList.add("cell", "flex-center");
      board.appendChild(cell);
      cell.addEventListener("click", this.playerPlay.bind(this));
      i++;
    }
  }
  playerPlay(e) {
    const cell = e.currentTarget;
    if (cell.dataset.value) return; // // cell already has value, player can't choose this cell
    cell.setAttribute("data-value", this.isCircleTurn ? "o" : "x");
    cell.textContent = this.isCircleTurn ? "o" : "x";
    const isWinning = this.isWinner.call(this);
    if (isWinning) {
      const winner = this.isCircleTurn ? "o" : "x";
      return this.endGame(`${winner} won`);
    }
    this.isCircleTurn = !this.isCircleTurn;
    this.count++;
    if (this.count === 9) {
      this.endGame("draw");
    }
  }
  isWinner() {
    const cells = document.getElementsByClassName("cell");
    // each cell should have 3 possible value "" ,"o","x"
    return this.winCombinations.some((combination) => {
      const [i, j, k] = combination;
      if (
        cells[i].dataset.value &&
        cells[i].dataset.value === cells[j].dataset.value &&
        cells[j].dataset.value === cells[k].dataset.value
      )
        return true;
    });
  }
  endGame(message) {
    board.style.pointerEvents = "none"; // disable player from playing
    winnerMessage.textContent = message;
  }
}
new Game(); // start a new game when document on load
button.addEventListener("click", () => new Game()); // start a new game when button on click
