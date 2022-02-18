import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import './style/style.css';

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
    const { score, assertions } = this.props;
    /* const { assertions } = this.state; */
    // se os acertos nao estiverem aparecendo na tela usar o assertions do state e nao das props
    return (
      <main className="container__feedback">
        <Header />
        <div className="feedback__text">
          <h1
            className="feedback__message"
            data-testid="feedback-text"
          >
            {this.renderMessage()}

          </h1>
        </div>

        <div className="content__feedback">
          <div className="container__default">
            <span className="text__default">Total Score </span>
            <span
              className="text__defaultResult"
              data-testid="feedback-total-score"
            >
              { score }

            </span>
          </div>
          <div className="container__default">

            <span className="text__default">Correct Answers: </span>
            <span
              className="text__defaultResult"
              data-testid="feedback-total-question"
            >
              { assertions }

            </span>

          </div>
          <div className="container__btn">
            <Link
              data-testid="btn-play-again"
              className="btn btn-dark widthh"
              to="/"
            >
              Play Again

            </Link>
            <Link
              data-testid="btn-ranking"
              className="btn btn-warning widthh"
              to="/ranking"
            >
              Ranking

            </Link>
          </div>
        </div>
      </main>

    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
