import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render() {
    const { allQuestions } = this.props;

    const allAnswer = [
      allQuestions.correct_answer,
      ...allQuestions.incorrect_answers,
    ];

    console.log(this.shuffleArray(allAnswer));

    return (
      <section>
        <p data-testid="question-text">
          {allQuestions.question}
        </p>
        <div data-testid="answer-options">
          <p data-testid="correct-answer">{allQuestions.correct_answer}</p>
          {allQuestions.incorrect_answers.map((q, i) => (
            <p data-testid={ `wrong-answer-${i}` } key={ q }>
              {q}
            </p>
          ))}
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
