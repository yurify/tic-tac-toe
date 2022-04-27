import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  list: any[];
  xIsNext: boolean;
  winner: string;

  // We will set up the game field at least once at the beginning.
  ngOnInit() {
    this.startGame();
  }

  // Initial game settings.
  startGame() {
    this.list = [null, null, null, null, null, null, null, null, null];
    this.xIsNext = true;
    this.winner = null;
  }

  // If a user hasn't clicked on this cell before, we will change its value to X or O and check if there is a winner.
  makeMove(index: number) {
    if (!this.list[index] && !this.winner) {
      console.log(index);
      this.list[index] = this.xIsNext ? "X" : "O";
      this.xIsNext = !this.xIsNext;



      // Check if there is a winner
      const newWinner = this.calculateWinner(this.list);
      if (newWinner) {
        this.winner = newWinner;
        return;
      }

      // Check for a draw
      if (!this.list.includes(null) && !newWinner) {
        this.winner = "DRAW";
        return;
      }
    }
  }

  // check winner logic from React tutorial https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}
