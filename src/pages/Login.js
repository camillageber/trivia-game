import React from 'react';
import PropTypes from 'prop-types';
import getToken from '../services/fetchAPI';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
    }

    handleClick = async () => {
      const { history } = this.props;
      const token = await getToken();
      localStorage.setItem('token', token);
      history.push('/game');
    }

    render() {
      const { name, email } = this.state;
      return (
        <form>
          <label htmlFor="name">
            Name:
            <input
              id="name"
              type="text"
              data-testid="input-player-name"
              onChange={ (e) => this.setState({ name: e.target.value }) }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(name && email) }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      );
    }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
