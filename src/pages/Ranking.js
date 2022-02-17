import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <section data-testid="ranking-title">Ranking</section>
        <Link data-testid="btn-go-home" to="/">Go Home</Link>
      </main>
    );
  }
}

export default Ranking;
