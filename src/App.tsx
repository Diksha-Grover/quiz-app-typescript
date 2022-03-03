import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
import QuestionCard from './components/QuestionCard';
import { QuestionsState, Difficulty } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    // so when we will click the button we will trigger the API fetch which means we are loading something that is why setLoading is set to true
    setGameOver(false);
    // since we have started a game that is why game is not over and setGameOver is set to false
    const newQuestions = await fetchQuizQuestions(
      //  because we are going to await and fetch quiz and it needs two argument total questions and difficulty levey
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    // since we have started from scratch the score is set to 0 
    setUserAnswers([]);
    // since we have started from scratch the user answers will an empty string
    setNumber(0);
    setLoading(false);
    // since questions are here and we are not loading anymore that is why setLoading to 0
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // so 'correct' variable will store true, false
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // is the answer is correct then update the score 
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          // it means show the button 'start' if the game is over or the user has given the answer to the last question
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          // we want to show the score only if game is not over
          // and text 'Loading Questions...' will only be shown if if load something
          // QuestionCard will only be shown if we are not loading anything or if the game is not over
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            // if we have some answers in useranswer state, we can grab the correct answer by specifying the number otherwise we just give it undefined
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          // to show the next question the condition is - game is not over, we are not loading anything and user has answered the current question and we are not on last question
          // how do we know that user has answeres the questions? by using userAnswers.length (means we have our answers in userAnswers )
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
    // since JSX can return only one element that is why <> </> is added
    // A fragment looks like an empty HTML tag: <></>.
  );
};

export default App;