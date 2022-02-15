import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { tokenThunk, getGravatarThunk, addPlayer } from '../store/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { email, name } = this.state;
    const { fetchToken, history, fetchGravatar, addPlayerName } = this.props;
    fetchToken();
    fetchGravatar(email);
    addPlayerName(name, email);
    history.push('/game');
  }

  redirectSettings = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { email, name, redirect } = this.state;
    return (
      <>
        <form>
          <label htmlFor="name-input">
            <h5>Nome:</h5>
            <input
              data-testid="input-player-name"
              placeholder="Nome"
              id="name-input"
              type="text"
              onChange={ this.handleChange }
              value={ name }
              name="name"
            />
          </label>
          <label htmlFor="email-input">
            <h5>Email:</h5>
            <input
              data-testid="input-gravatar-email"
              placeholder="Email"
              id="email-input"
              type="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ !name || !email }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectSettings }
          >
            Configurações
          </button>
        </form>
        { redirect && <Redirect to="/settings" /> }
      </>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  fetchGravatar: PropTypes.func.isRequired,
  addPlayerName: PropTypes.func.isRequired,
  // tokenData: PropTypes.string.isRequired,
};

// const mapStateToProps = ({ token }) => ({
//   tokenData: token.token,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (e) => dispatch(tokenThunk(e)),
  fetchGravatar: (email) => dispatch(getGravatarThunk(email)),
  addPlayerName: (name, email) => dispatch(addPlayer(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
