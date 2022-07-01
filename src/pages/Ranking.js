import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
state = {
  ranking: [],
}

componentDidMount() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  this.setState({ ranking: ranking.sort((a, b) => b.score - a.score) });
}

render() {
  const { ranking } = this.state;
  return (
    <div>
      <h1 data-testid="ranking-title">Ranking Title</h1>
      <section id="ranking">
        {ranking.map((r, i) => (
          <div key={ r.name }>
            <img src={ r.picture } alt="gravatar" />
            <p data-testid={ `player-name-${i}` }>{r.name}</p>
            <p data-testid={ `player-score-${i}` }>{r.score}</p>
          </div>
        ))}
      </section>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => {
          const { history } = this.props;
          history.push('/');
        } }
      >
        Ranking
      </button>
    </div>
  );
}
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
