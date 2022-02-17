import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import { fetchToken, getToken, updatedScore } from '../../store/actions';
import './style.css';
import { HALF_MINUTE, ONE_POINT, TWO_POINT, THREE_POINT, TEN_POINT } from '../../consts';
import setRanking from '../../services';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      curIndex: 0,
      isCorrect: false,
      counter: HALF_MINUTE,
      statusTimer: '',
    };
  }

  componentDidMount() {
    this.fetchQuestions();
    this.startTimer();
    this.setLocalStorage();
    this.clearScore();
  }

  setColorCorrect() {
    this.setState({ isCorrect: true });
  }

  setColor() {
    this.setColorCorrect();
  }

  setLocalStorage() {
    const { player } = JSON.parse(localStorage.getItem('player'));
    const { name, score, gravatarEmail } = player;
    console.log(name, score, gravatarEmail);
    const obj = { name, score, gravatarEmail, assertions: 0 };
    localStorage.setItem('rankingData', JSON.stringify(obj));
  }

  fetchQuestions = async () => {
    const { tokenData, getTokenn } = this.props;
    const ERROR_NUMBER = 3;

    const response = await this.fetchAPI(tokenData);
    if (response.response_code === ERROR_NUMBER) {
      const token = await fetchToken();
      getTokenn(token);
      this.fetchQuestions();
    } else {
      this.rearrange(response.results);
    }
  }

  rearrange = (results) => {
    const questions = results.map((quest) => {
      const { category,
        question,
        correct_answer: correctAns,
        difficulty,
        incorrect_answers: incorrectList } = quest;
      const answers = incorrectList.map((ans, index) => ({
        testId: `wrong-answer-${index}`,
        ans,
        isCorrect: false,
        number: Math.random(),
      }));
      return {
        category,
        question,
        difficulty,
        answerList: [{
          ans: correctAns,
          difficulty,
          testId: 'correct-answer',
          isCorrect: true,
          number: Math.random(),
        }, ...answers],
      };
    });
    this.setState({ questions });
  }

  fetchAPI = async (token) => {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  goNext = () => {
    const { curIndex } = this.state;
    const { history } = this.props;
    const lastIndex = 4;
    if (curIndex === lastIndex) {
      const { playerName, playerPicture, playerScore } = this.props;
      setRanking({ playerName, playerPicture, playerScore });
      history.push('/feedback');
    }
    this.setState({
      curIndex: curIndex + 1,
      counter: HALF_MINUTE,
      isCorrect: false,
    });
  }

  clearScore() {
    const { updatedScoreState } = this.props;
    updatedScoreState(0);
  }

  stopTimer() {
    this.setState({
      statusTimer: 'stop',
    });
  }

  startTimer() {
    this.setState({
      statusTimer: '',
    });
    this.handleCounter();
  }

  correctAnswer(difficulty) {
    const { counter } = this.state;
    const { updatedScoreState } = this.props;
    this.setColor();
    this.stopTimer();
    let points;
    if (difficulty === 'easy') points = ONE_POINT;
    if (difficulty === 'medium') points = TWO_POINT;
    if (difficulty === 'hard') points = THREE_POINT;

    const rankingData = JSON.parse(localStorage.getItem('rankingData'));
    console.log(rankingData);
    rankingData.score += points * counter + TEN_POINT;
    rankingData.assertions += 1;
    updatedScoreState(rankingData.score);
    localStorage.rankingData = JSON.stringify(rankingData);
  }

  handleCounter() {
    const ONE_SEC = 1000;
    const timer = setInterval(() => {
      const { counter, statusTimer } = this.state;
      if (statusTimer === '') this.setState({ counter: counter - 1 });
      if (counter === 1 || statusTimer === 'stop') {
        this.stopTimer();
      }
      if (statusTimer === 'stop') {
        clearInterval(timer);
      }
    }, ONE_SEC);
  }

  render() {
    const { questions, curIndex, isCorrect, counter } = this.state;
    return (
      <main>
        <Header />
        <p>{ counter }</p>
        <section>
          <p data-testid="question-category">
            { questions[0] && questions[curIndex].category }
          </p>
          <p data-testid="question-text">
            { questions[0] && questions[curIndex].question }
          </p>
          <div data-testid="answer-options">
            {
              questions[0]
                && questions[curIndex].answerList
                  .sort((a, b) => a.number - b.number)
                  .map((ans) => (
                    ans.isCorrect
                      ? (
                        <button
                          type="button"
                          key={ ans.testId }
                          data-testid="correct-answer"
                          className={ isCorrect ? 'correct' : '' }
                          onClick={ () => this.correctAnswer(ans.difficulty) }
                          disabled={ counter === 0 }
                        >
                          {ans.ans}
                        </button>
                      ) : (
                        <button
                          type="button"
                          key={ ans.testId }
                          data-testid={ `wrong-answer-${curIndex}` }
                          className={ isCorrect ? 'wrong' : '' }
                          onClick={ () => this.setColor() }
                          disabled={ counter === 0 }
                        >
                          {ans.ans}
                        </button>
                      )
                  ))
            }
          </div>
        </section>
        <button
          disabled={ !isCorrect }
          type="button"
          data-testid="btn-next"
          onClick={ this.goNext }
          className="toggle-btn"
        >
          Next
        </button>
      </main>
    );
  }
}

Game.propTypes = {
  tokenData: PropTypes.string.isRequired,
};

const mapStateToProps = ({ token, player }) => ({
  tokenData: token,
  playerScore: player.score,
  playerName: player.name,
  playerPicture: player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenn: (token) => dispatch(getToken(token)),
  updatedScoreState: (score) => dispatch(updatedScore(score)),
});

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  tokenData: PropTypes.string.isRequired,
  getTokenn: PropTypes.func.isRequired,
  updatedScoreState: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerPicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
