
export const secondsDifference = (firstDate, secondDate) => {
  return Math.abs((firstDate.getTime() - secondDate.getTime()) / 1000);
}