export const randomNumberGenerator = (from: number = 1, to: number): number => {
  let diff = to - from;
  let num = Math.random();

  let random = Math.floor(num * diff + from);
  return random;
};
