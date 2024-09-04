export const getDecenes = (id: number): string => {
  const number = id || 0;
  return number.toString().padStart(4, '0');
};
