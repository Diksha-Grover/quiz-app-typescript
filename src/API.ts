import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
// we will have correct answers in separate entity and incorrect answers in separate array

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
// Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

export type QuestionsState = Question & { answers: string[] };
// first i grab the Question I created above then I have created a property called answers and answers is going to be array of strings

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
// since we want to specify how many questions we want to grab that is why 'amount: number' is given
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  // first we wait the fetch itself and then we are going to wait when we convert it to json
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    // spreading the question then we have shufflearray from utils.ts
  }))
};

// API file is where we have created logic for fetching data from API