import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../styles/feedback.css';

class Feedback extends React.Component {
  getGravatar = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`

  render() {
    const { email, playerName, score, assertions } = this.props;
    const tres = 3;

    return (
      <div className="feedback-container">
        <header>
          <img
            data-testid="header-profile-picture"
            src={ this.getGravatar(email) }
            alt="gravatar"
          />
          <h2 className="player-name" data-testid="header-player-name">{ playerName }</h2>
          <h3 className="score" data-testid="header-score">{ score }</h3>
        </header>
        <div className="message">
          <p data-testid="feedback-text">
            { assertions >= tres ? 'Well Done!' : 'Could be better...'}
          </p>
        </div>
        <section className="player-result" id="playerResult">
          <div>
            <h2>Results</h2>
            <p data-testid="feedback-total-score">{`Score: ${score}`}</p>
            <p data-testid="feedback-total-question">{`Assertions: ${assertions}`}</p>
          </div>
        </section>
        <div className="feed-buttons">
          <button
            className="feed-btn"
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            className="feed-btn"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  playerName: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
