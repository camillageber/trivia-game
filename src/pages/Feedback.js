import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  getGravatar = (email) => `https://www.gravatar.com/avatar/${md5(email).toString()}`

  render() {
    const { email, playerName, score } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatar(email) }
          alt="gravatar"
        />
        <h2 data-testid="header-player-name">{ playerName }</h2>
        <h2 data-testid="header-score">{ score }</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  playerName: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
