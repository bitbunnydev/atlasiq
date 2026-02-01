export const generateAccessCode = () => {
  // Generates a random 6-character string
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};
