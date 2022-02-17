import React from 'react';
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
    const { assertions } = JSON.parse(localStorage.getItem('ranking'));
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
    return (
      <main>
        <Header />
        <section>Feedback</section>
        <span data-testid="feedback-text">{this.renderMessage()}</span>

      </main>
    );
  }
}

export default Feedback;
