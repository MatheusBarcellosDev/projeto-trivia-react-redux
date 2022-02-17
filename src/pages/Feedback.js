import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
    };
  }

  componentDidMount() {
    this.getLocalStorageAssertions();
  }

  getLocalStorageAssertions() {
    const { assertions } = JSON.parse(localStorage.getItem('rankingData'));
    console.log(assertions);
    this.setState({
      assertions,
    });
  }

  renderMessage() {
    const { assertions } = this.state;
    const NUMBER = 3;
    if (assertions >= NUMBER) return 'Well Done!';
    if (assertions < NUMBER) return 'Could be better...';
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <main>
        <Header />
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
        <section>Feedback</section>
        <span data-testid="feedback-text">{this.renderMessage()}</span>
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
