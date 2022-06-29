import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  geraQuestoesAleatorias() {
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

    const allAnswer = this.geraQuestoesAleatorias();

    return (
      <section>
        <p data-testid="question-text">
          {allQuestions.question}
        </p>
        <div data-testid="answer-options">
          { allAnswer.map((answer, i) => (
            answer !== allQuestions.correct_answer ? (
              <li data-testid={ `wrong-answer-${i}` } key={ answer }>
                { answer }
              </li>
            ) : (
              <li data-testid="correct-answer" key={ answer }>
                { answer }
              </li>
            )
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
