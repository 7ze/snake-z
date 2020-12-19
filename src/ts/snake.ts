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

export const snakeIsOnPosition = (
  position: { x: number; y: number },
  { ignoreHead = false } = {}
) => {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && !index) return false;
    return equalsPosition(segment, position);
  });
};

export const isIntersected = () => {
  return snakeIsOnPosition(getSnakeHead(), { ignoreHead: true });
};

export const expandSnake = (growth: number) => {
  newSegments += growth;
};

export const getSnakeHead = () => {
  return snakeBody[0];
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
