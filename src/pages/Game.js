import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchAPI = async (token) => {
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  }

  fetchQuestions = async () => {
    const { savedToken } = this.props;
    const data = this.fetchAPI(savedToken);
    // const INVALID_TOKEN_NUMBER = 3;
    if (data.response_code === 0) {
      this.setState({ questions: data.results });
    } else {
      const result = await fetch('https://opentdb.com/api_token.php?command=request');
      const tokenData = await result.json();
      const newData = await this.fetchAPI(tokenData.token);
      this.setState({ questions: newData.results });
    }
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <main>
        <Header />
        <section>
          <p data-testid="question-category">{ questions[0] && questions[0].category }</p>
          <p data-testid="question-text">{ questions[0] && questions[0].question }</p>
          <div data-testid="answer-options">
            <button type="button" data-testid="correct-answer">
              { questions[0] && questions[0].correct_answer }
            </button>
            {
              questions[0]
                && questions[0].incorrect_answers.map((ans, index) => (
                  <button type="button" key="ans" data-testid={ `wrong-answer-${index}` }>
                    {ans}
                  </button>
                ))
            }
          </div>
        </section>
      </main>
    );
  }
}

Game.propTypes = {
  savedToken: PropTypes.string.isRequired,
};

const mapStateToProps = ({ token }) => ({
  savedToken: token.token,
});

export default connect(mapStateToProps)(Game);
