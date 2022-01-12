export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random());
  // here we have given the parameter array of any type 
  // inside  the function i am spreading this array then using sort function and arrow function and using math.random()
  // Math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1) 
  // It just have a small function that we have used to randomize the answers to question