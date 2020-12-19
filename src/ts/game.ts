import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  isIntersected,
} from './snake';
import { update as updateFood, draw as drawFood } from './food';
import { isOutsideGrid } from './grid';
import { strict } from 'assert';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard: HTMLDivElement = document.querySelector('#game-board');

const main = (currentTime: number) => {
  if (gameOver) {
    if (confirm('You lost. Press Ok to restart.')) {
      window.location.href = '/';
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
};

window.requestAnimationFrame(main);

const update = () => {
  updateSnake();
  updateFood();
  checkDeath();
};

const draw = () => {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
};

const checkDeath = () => {
  gameOver = isOutsideGrid(getSnakeHead()) || isIntersected();
};
