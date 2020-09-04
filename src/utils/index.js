export const timeToDayCount = (time) => {
  if (time < 0) {
    return 0;
  }

  const millisInDay = 24 * 60 * 60 * 1000;

  return Math.floor(time / millisInDay);
};
