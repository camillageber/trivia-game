import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScore } from '../redux/actions/index';

class QuestionCard extends React.Component {
  state = {
    respondido: false,
    timer: 30,
    nextEnable: false,
  }

  componentDidMount = () => {
    const interval = setInterval(() => {
      const { timer } = this.state;

      if (timer === 1) {
        clearInterval(interval);
      }

      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, '1000');
  };

  handleClick = ({ target }, difficulty) => {
    const { dispatch } = this.props;

    const green = 'green-border';
    this.setState({ respondido: true }, () => {
      const { timer } = this.state;

      const razao = {
        hard: 3,
        medium: 2,
        easy: 1,
      };

      const dez = 10;

      if (target.className === green) {
        const score = dez + (timer * razao[difficulty]);
        dispatch(addScore(score));
      } else {
        console.log('errou');
      }
    });

    this.setState({
      nextEnable: true,
      timer: 30,
    });
  }

  geraQuestoesAleatorias = (allQuestions) => {
    // const { allQuestions } = this.props;

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
    const { allQuestions, nextQuestion } = this.props;
    const { respondido, timer, nextEnable } = this.state;

    return (
      <section>
        <span>{ timer }</span>
        <p data-testid="question-text">
          {allQuestions.question}
        </p>
        <div data-testid="answer-options">
          { this.geraQuestoesAleatorias(allQuestions).map((answer, i) => (
            <button
              disabled={ timer === 0 }
              className={ (respondido && answer === allQuestions.correct_answer)
                ? 'green-border'
                : (respondido && answer !== allQuestions.correct_answer) && 'red-border' }
              onClick={ (e) => this.handleClick(e, allQuestions.difficulty) }
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
        { nextEnable && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ nextQuestion }
          >
            Next
          </button>
        ) }
      </section>
    );
  }
}

QuestionCard.propTypes = {
  allQuestions: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default connect()(QuestionCard);
