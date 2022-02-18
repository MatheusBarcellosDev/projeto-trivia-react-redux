import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaWhmcs, FaPlay } from 'react-icons/fa';
import { getGravatarThunk, addPlayer, fetchToken, getToken } from '../../store/actions';
import imgTrivia from './assets/trivia.png';
import './style/style.css';

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

  handleClick = async () => {
    const { email, name } = this.state;
    const { history, fetchGravatar, addPlayerName, getTokenn } = this.props;
    getTokenn(await fetchToken());
    fetchGravatar(email);
    this.savePlayer();
    addPlayerName(name, email);
    history.push('/game');
  }

  /* handleClick = () => {
    const { email, name } = this.state;
    const { fetchToken, history, fetchGravatar, addPlayerName } = this.props;
    fetchToken();
    fetchGravatar(email);
    addPlayerName(name, email);
    history.push('/game');
  } */

  redirectSettings = () => {
    this.setState({
      redirect: true,
    });
  }

  savePlayer() {
    const { email, name } = this.state;
    const obj = {
      player: {
        name,
        gravatarEmail: email,
        score: 0,
        assertions: 0,
      },
    };
    localStorage.setItem('player', JSON.stringify(obj));
  }

  render() {
    const { email, name, redirect } = this.state;
    return (
      <div className="container-fluid center">
        <form className="container__login">
          <div className="container__login_logo">
            <img src={ imgTrivia } alt="logo" className="img-fluid" />
          </div>
          <label htmlFor="name-input">
            <input
              data-testid="input-player-name"
              placeholder="Nome"
              className="form-control"
              id="name-input"
              type="text"
              onChange={ this.handleChange }
              value={ name }
              name="name"
              autoComplete="off"
            />
          </label>
          <label htmlFor="email-input">
            <input
              data-testid="input-gravatar-email"
              placeholder="Email"
              className="form-control"
              id="email-input"
              type="email"
              name="email"
              onChange={ this.handleChange }
              autoComplete="off"
              value={ email }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            className="btn btn-outline-primary"
            onClick={ this.handleClick }
            disabled={ !name || !email }
          >
            Play
            {' '}
            <FaPlay />
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            className="btn btn-outline-secondary"
            onClick={ this.redirectSettings }
          >
            Configurações
            {' '}
            <FaWhmcs />
          </button>
        </form>
        { redirect && <Redirect to="/settings" /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  fetchGravatar: PropTypes.func.isRequired,
  addPlayerName: PropTypes.func.isRequired,
  getTokenn: PropTypes.func.isRequired,
};

// const mapStateToProps = ({ token }) => ({
//   tokenData: token.token,
// });

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (e) => dispatch(fetchToken(e)),
  fetchGravatar: (email) => dispatch(getGravatarThunk(email)),
  addPlayerName: (name, email) => dispatch(addPlayer(name, email)),
  getTokenn: (token) => dispatch(getToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
