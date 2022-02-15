import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchToken, getToken } from '../store/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      curIndex: 0,
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchAPI = async (token) => {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  }

  rearrange = (results) => {
    const questions = results.map((quest) => {
      const { category,
        question,
        correct_answer: correctAns,
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
        answerList: [{
          ans: correctAns,
          testId: 'correct-answer',
          isCorrect: true,
          number: Math.random(),
        }, ...answers],
      };
    });
    this.setState({ questions });
  }

  fetchQuestions = async () => {
    const { tokenData, getTokenn } = this.props;
    const ERROR_NUMBER = 3;

    const response = await this.fetchAPI(tokenData);
    console.log(response);
    if (response.response_code === ERROR_NUMBER) {
      console.log('oi');
      console.log(tokenData);
      const token = await fetchToken();
      console.log(token);
      getTokenn(token);
      this.fetchQuestions();
    } else {
      this.rearrange(response.results);
    }
  }

  /* fetchQuestions = async (newToken) => {
    let data;
    if (!newToken) {
      const { tokenData } = this.props;
      data = await this.fetchAPI(tokenData);

    } else {
      data = await this.fetchAPI(newToken);
    }
    const ERROR_NUMBER = 3;
    if (data.response_code !== ERROR_NUMBER) {
      this.rearrange(data.results);
      // this.setState({ questions: data.results });
    } else {
      const theUrl = 'https://opentdb.com/api_token.php?command=request';
      const res = await (await fetch(theUrl)).json();
      await this.fetchQuestions(res.token);
      // this.setState({ questions: newData.results });
    }
  } */

  render() {
    const { questions, curIndex } = this.state;
    return (
      <main>
        <Header />
        <section>
          <p data-testid="question-category">
            { questions[0] && questions[curIndex].category }
          </p>
          <p data-testid="question-text">
            { questions[0] && questions[curIndex].question }
          </p>
          <div data-testid="answer-options">
            {/* <button type="button" data-testid="correct-answer">
              { questions[0] && questions[curIndex].correct_answer }
            </button> */}
            {
              questions[0]
                && questions[curIndex].answerList
                  .sort((a, b) => a.number - b.number)
                  .map((ans) => (
                    <button type="button" key={ ans.testId } data-testid={ ans.testId }>
                      {ans.ans}
                    </button>
                  ))
            }
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ token }) => ({
  tokenData: token.token,
});

const mapDispatchToProps = (dispatch) => ({
  getTokenn: (token) => dispatch(getToken(token)),
});

Game.propTypes = {
  tokenData: PropTypes.string.isRequired,
  getTokenn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
