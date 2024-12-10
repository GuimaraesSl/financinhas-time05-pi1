import { FC } from 'react';
import logo from '../../assets/Logo-Subtitle.svg';
import './LoginScreen.style.css';

export const LoginScreen: FC = () => {
    return (
        <div className="containerLoginScreen">
            <div className="logoContainerLoginScreen">
                <img src={logo} className="logoLoginScreen" alt="Logo" />
            </div>
            <form className="formLoginScreen">
                <h2>LOGIN</h2>
                <label className="labelLoginScreen" htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email" 
                    className="inputLoginScreen" 
                />
                <label className="labelLoginScreen" htmlFor="password">Senha</label>
                <input 
                    id="password"
                    type="password" 
                    className="inputLoginScreen" 
                />
                <button className="buttonLoginScreen">
                    ENTRAR
                </button>
                <p className="registerLinkLoginScreen">
                    Ainda não tenho uma conta
                </p>
            </form>
        </div>
    );
};

export default LoginScreen;
