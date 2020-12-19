import { getInputDirection } from './input';

export const SNAKE_SPEED = 5; // * Speed in fps *

const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export const update = (): void => {
  // logic to move the snake
  addSegments();
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

export const snakeIsOnPosition = (position: { x: number; y: number }) => {
  return snakeBody.some((segment) => {
    return equalsPosition(segment, position);
  });
};

export const expandSnake = (growth: number) => {
  newSegments += growth;
};

const equalsPosition = (
  positionOne: { x: number; y: number },
  positionTwo: { x: number; y: number }
) => {
  return positionOne.x === positionTwo.x && positionOne.y === positionTwo.y;
};

const addSegments = () => {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
};
