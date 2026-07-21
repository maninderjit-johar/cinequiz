export const randomNumberGenerator = (from: number = 1, to: number): number => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};
