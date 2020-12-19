import { randomGridPosition } from './grid';
import { expandSnake, snakeIsOnPosition as snakeIsOnFood } from './snake';

const getRandomFoodPosition = () => {
  let newFoodPosition: { x: number; y: number };
  while (!newFoodPosition || snakeIsOnFood(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
};

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export const update = () => {
  if (snakeIsOnFood(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
};

export const draw = (gameBoard: HTMLDivElement): void => {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = `${food.y}`;
  foodElement.style.gridColumnStart = `${food.x}`;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};
