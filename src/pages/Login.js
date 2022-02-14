import React from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

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

  handleClick = ({ target }) => {
    // const { login: loginAction, history } = this.props;
    // const { email } = this.state;
    // loginAction({ email });
    // history.push('/carteira');
    console.log(target);
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

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   history: PropTypes.shape({ push: PropTypes.func }).isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   login: (e) => dispatch(login(e)) });

// export default connect(null, mapDispatchToProps)(Login);
export default Login;
