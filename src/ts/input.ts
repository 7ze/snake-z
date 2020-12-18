let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { ...inputDirection };

const handler = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
    case 'W':
    case 'w':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
    case 'S':
    case 's':
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
    case 'A':
    case 'a':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
    case 'D':
    case 'd':
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
};

window.addEventListener('keydown', handler);

export const getInputDirection = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};
