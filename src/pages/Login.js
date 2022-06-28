import React from 'react';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
    }

    handleClick = () => {

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

export default Login;
