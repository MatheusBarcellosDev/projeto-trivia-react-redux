import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const INVALID_TOKEN_NUMBER = 3;
    if (data.response_code === INVALID_TOKEN_NUMBER) {
      const result = await fetch('https://opentdb.com/api_token.php?command=request');
      const tokenData = await result.json();
      const newData = await this.fetchAPI(tokenData.token);
      this.setState({ questions: newData.results });
    } else {
      this.setState({ questions: data.results });
    }
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <main>
        <header>Jogo</header>
        <section>A</section>
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
