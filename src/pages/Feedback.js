import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <section data-testid="feedback-text">Feedback</section>
      </main>
    );
  }
}

export default Feedback;
