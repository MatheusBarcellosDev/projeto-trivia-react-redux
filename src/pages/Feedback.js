import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <main>
        <Header />
        <section data-testid="feedback-text">Feedback</section>
        <p>
          <span>Total Score: </span>
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
        <p>
          <span>Correct Answers: </span>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <Link data-testid="btn-play-again" to="/">Play Again</Link>
        <Link data-testid="btn-ranking" to="/ranking">Ranking</Link>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
