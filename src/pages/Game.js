import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Game extends React.Component {
    state = {}

    getGravatar = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`

    render() {
      const { playerName, score, email } = this.props;
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
};

export default connect(mapStateToProps)(Game);
