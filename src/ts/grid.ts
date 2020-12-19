const GRID_SIZE = 21;

const getRandom = (limit: number) => {
  return (Math.floor(Math.random() * 1000) % limit) + 1;
};

export const randomGridPosition = () => {
  return { x: getRandom(GRID_SIZE), y: getRandom(GRID_SIZE) };
};

export function isOutsideGrid(position: { x: number; y: number }): boolean {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}
