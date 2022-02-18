import React from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking() {
    const rankingData = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingData);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <main>
        {/* <Header /> */}
        <section data-testid="ranking-title">Ranking</section>
        <section>
          {
            ranking.sort((a, b) => b.score - a.score).map((person, index) => {
              const { score, picture, name } = person;
              return (
                <div key={ `Jogador - ${index}` }>
                  <img src={ picture } alt={ name } />
                  <p data-testid={ `player-name-${index}` }>{name}</p>
                  <p data-testid={ `player-score-${index}` }>{score}</p>
                </div>
              );
            })
          }
        </section>
        <Link data-testid="btn-go-home" to="/">Go Home</Link>
      </main>
    );
  }
}

export default Ranking;
