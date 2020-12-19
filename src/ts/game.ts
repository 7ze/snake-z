import { SNAKE_SPEED, update as updateSnake, draw as drawSnake } from './snake';
import { update as updateFood, draw as drawFood } from './food';

let lastRenderTime = 0;
const gameBoard: HTMLDivElement = document.querySelector('#game-board');

const main = (currentTime: number) => {
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

const checkDeath = () => {};
