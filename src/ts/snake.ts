import { getInputDirection } from './input';

export const SNAKE_SPEED = 5; // * Speed in fps *

const snakeBody = [{ x: 11, y: 11 }];

export const update = (): void => {
  // logic to move the snake
  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
};

export const draw = (gameBoard: HTMLDivElement): void => {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = `${segment.y}`;
    snakeElement.style.gridColumnStart = `${segment.x}`;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
};
