import styled from 'styled-components';
// styled-components is a CSS-in-JS library that enables you to write regular CSS and attach it to JavaScript components. 

export const Wrapper = styled.div`
  max-width: 1100px;
  background: #ebfeff;
  border-radius: 10px;
  border: 2px solid #0085a3;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  p {
    font-size: 1rem;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

//  it seems that the only reason to choose an interface over a type alias is declaration merging: 
//  Declaration merging
//  Unlike a type alias, an interface can be defined multiple times, and will be treated as a single interface (with members of all declarations being merged).
 // These two declarations become:
 // interface Point { x: number; y: number; }
//  interface Point { x: number; }
//  interface Point { y: number; }
//  const point: Point = { x: 1, y: 2 };
 

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
      correct
        ? 'linear-gradient(90deg, #56FFA4, #59BC86)'
        : !correct && userClicked
        ? 'linear-gradient(90deg, #FF5656, #C16868)'
        : 'linear-gradient(90deg, #56ccff, #6eafb4)'};
    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
// so if the answer is correct then the color of the button is 'linear-gradient(90deg, #56FFA4, #59BC86)'
// if the answer is incorrect then the color of the button is 'linear-gradient(90deg, #FF5656, #C16868)'
// the background of the button is 'linear-gradient(90deg, #56ccff, #6eafb4)'};