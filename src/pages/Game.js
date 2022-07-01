import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/fetchAPI';
import QuestionCard from '../components/QuestionCard';

class Game extends React.Component {
    state = {
      questions: [],
      loading: true,
      index: 0,
      clicks: 0,
    }

    async componentDidMount() {
      const { history } = this.props;
      const questions = await getQuestions(localStorage.getItem('token'));
      if (questions) {
        this.setState({ questions, loading: false });
      } else {
        history.push('/');
        localStorage.removeItem('token');
      }
    }

    addClicks = () => {
      const { history, playerName, score, email } = this.props;
      const { clicks } = this.state;
      const quatro = 4;

      this.setState((prevState) => ({ clicks: prevState.clicks + 1 }));

      if (clicks === quatro) {
        history.push('/feedback');
        const playerObj = {
          name: playerName,
          score,
          picture: this.getGravatar(email),
        };
        let rankingArr = JSON.parse(localStorage.getItem('ranking'));
        if (rankingArr) {
          rankingArr = [...rankingArr, playerObj];
        } else {
          rankingArr = [playerObj];
        }
        localStorage.setItem('ranking', JSON.stringify(rankingArr));
      }
    };

    getGravatar = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`

    nextQuestion = () => {
      const quatro = 4;

      this.setState((prevState) => ({
        index: prevState.index === quatro
          ? 0
          : prevState.index + 1,
      }));

      this.addClicks();
    }

    render() {
      const { playerName, score, email } = this.props;
      const { questions, loading, index } = this.state;

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
            <QuestionCard
              allQuestions={ questions[index] }
              nextQuestion={ this.nextQuestion }
            />
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