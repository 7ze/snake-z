const GRID_SIZE = 21;

const getRandom = (limit: number) => {
  return (Math.floor(Math.random() * 1000) % limit) + 1;
};

export const randomGridPosition = () => {
  return { x: getRandom(GRID_SIZE), y: getRandom(GRID_SIZE) };
};

console.log(getRandom(21));
console.log(randomGridPosition());
