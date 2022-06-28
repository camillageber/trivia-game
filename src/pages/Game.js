import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/fetchAPI';

class Game extends React.Component {
    state = {
      questions: [],
      loading: true,
      indexQuestion: 0,
    }

    async componentDidMount() {
      const questions = await getQuestions(localStorage.getItem('token'));
      console.log(questions);
      if (questions) {
        this.setState({ questions, loading: false });
        // const randomArr = [questions.correct_answer, ...questions.incorrect_answers].sort;
      } else {
        const { history } = this.props;
        history.push('/');
        localStorage.remove('token');
      }
    }

    getGravatar = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`

    render() {
      const { playerName, score, email } = this.props;
      const { questions, loading, indexQuestion } = this.state;
      return (
        <div>
          <header>
            <img
              data-testid="header-profile-picture"
              src={ this.getGravatar(email) }
              alt="gravatar"
            />
            <h2 data-testid="header-player-name">{playerName}</h2>
            <h3 data-testid="header-score">{score}</h3>
          </header>
          {!loading ? (
            <section>
              <p data-testid="question-text">{questions[indexQuestion].question}</p>
              <div data-testid="answer-options">
                <p data-testid="correct-answer">{questions[0].correct_answer}</p>
                {questions[0].incorrect_answers.map((q, i) => (
                  <p
                    data-testid={ `wrong-answer-${i}` }
                    key={ q }
                  >
                    {q}
                  </p>))}
              </div>
              <p data-testid="question-category">{questions[0].category}</p>
            </section>
          ) : <h1>Loading...</h1> }

        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  playerName: state.player.name,
  score: state.player.score,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
