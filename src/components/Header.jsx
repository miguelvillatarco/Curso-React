import React from 'react';
import { connect } from 'react-redux';//se encarga de proveer lo que seria todo nuestro estado a nuestro componente de esa forma estamos conectando
import { Link } from 'react-router-dom'; //para los enlaces para donde movernos
import classNames from 'classnames';
import gravatar from '../utils/gravatar';//funcion para pedir las imagenes
import { logoutRequest } from '../actions';//es nuestro actions que se encarga de cerrar sesion
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = props => { 
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  }
  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  return(
      <header className={headerClass}>
        <Link to="/">
          <img className="header__img" src={logo} alt="Platzi Video" />
        </Link>
        <div className="header__menu">
          <div className="header__menu--profile">
      
            {hasUser ?
                <img src={gravatar(user.email)} alt={user.email} /> :
                <img src={userIcon} alt="" />
            }

            <p>Perfil</p>
          </div>
          <ul>

            {hasUser ?
                <li><a href="/">{user.name}</a></li>
                : null
            }
            
            {hasUser ?
              <li><a href="#logout" onClick={handleLogout}>Cerrar Sesión</a></li> 
              :
              <li>
                <Link to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            } 
          </ul>
        </div>
      </header>
    );
  }
  //se encarga de mapear nuestras propiedades del estado
  const mapStateToProps = state => {
    return {
        user: state.user
    };
};
//se encarga de todas las acciones que tenemos disparar o vamos a enviar a nuestro documento
const mapDispatchToProps = {
  logoutRequest,
}
//se encarga de conectar los p`rops que estamos trayendo los dispash dentro de nuesstro componente
export default connect(mapStateToProps, mapDispatchToProps)(Header);