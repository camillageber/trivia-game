import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  state = {
    respondido: false,
    allAnswer: [],
  }

  componentDidMount = () => {
    const allAnswer = this.geraQuestoesAleatorias();

    this.setState({ allAnswer });
  }

  handleClick = () => {
    this.setState({ respondido: true });
  }

  geraQuestoesAleatorias = () => {
    const { allQuestions } = this.props;
    const allAnswer = [
      allQuestions.correct_answer,
      ...allQuestions.incorrect_answers,
    ];

    const teste = [...allAnswer];
    const questoesAleatorias = [];

    for (let index = 0; teste.length; index += 1) {
      const randomNumber = Number(Math.random() * teste.length);
      const removeIndice = teste.splice(randomNumber, 1);
      questoesAleatorias.push(removeIndice[0]);
    }

    return questoesAleatorias;
  }

  render() {
    const { allQuestions } = this.props;
    const { respondido, allAnswer } = this.state;

    return (
      <section>
        <p data-testid="question-text">
          {allQuestions.question}
        </p>
        <div data-testid="answer-options">
          { allAnswer.map((answer, i) => (
            <button
              className={ (respondido && answer === allQuestions.correct_answer)
                ? 'green-border'
                : (respondido && answer !== allQuestions.correct_answer) && 'red-border' }
              onClick={ this.handleClick }
              type="button"
              data-testid={ answer === allQuestions.correct_answer
                ? 'correct-answer' : `wrong-answer-${i}` }
              key={ answer }
            >
              { answer }
            </button>
          )) }
        </div>
        <p data-testid="question-category">{allQuestions.category}</p>
      </section>
    );
  }
}

QuestionCard.propTypes = {
  allQuestions: PropTypes.arrayOf.isRequired,
};

export default QuestionCard;
