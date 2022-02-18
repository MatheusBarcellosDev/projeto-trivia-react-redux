import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './style/style.css';

class Header extends Component {
  render() {
    const { name, score, /* gravatar */ email } = this.props;
    const gravatar = md5(email).toString();
    return (
      <header className="container-fluid header">
        <div className="header__img">
          <img
            src={ `https://www.gravatar.com/avatar/${gravatar}` }
            className="header-img"
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <span data-testid="header-score" className="header__score">
          { `Pontuação: ${score}` }
        </span>
        <span data-testid="header-player-name" className="header__user">{ name }</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  /* gravatar: PropTypes.string.isRequired, */
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatar: state.player.gravatarEmail,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
