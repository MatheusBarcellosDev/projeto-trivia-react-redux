import React from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';
// import Header from '../components/Header';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
      number: 1,
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  updatedNumber() {
    const { number } = this.state;
    this.setState({
      number: number + 1,
    });
  }

  handleRanking() {
    const rankingData = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingData);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <main className="ranking__container">
        {/* <Header /> */}
        <h1 data-testid="ranking-title" className="ranking__title">Ranking</h1>
        <section className="ranking__content">
          {
            ranking.sort((a, b) => b.score - a.score).map((person, index) => {
              const { score, picture, name } = person;
              return (
                <div className="ranking__card container" key={ `Jogador - ${index}` }>
                  <p className="ranking__position width">{index + 1}</p>
                  <div className="width">
                    <img className="ranking__img" src={ picture } alt={ name } />
                  </div>
                  <p
                    className="ranking__name width"
                    data-testid={ `player-name-${index}` }
                  >
                    {name}

                  </p>
                  <p
                    className="ranking__score width"
                    data-testid={ `player-score-${index}` }
                  >
                    {score}

                  </p>
                </div>
              );
            })
          }
        </section>
        <Link
          data-testid="btn-go-home"
          className="btn btn-warning btn-dafault"
          to="/"
        >
          Go Home

        </Link>
      </main>
    );
  }
}

export default Ranking;
