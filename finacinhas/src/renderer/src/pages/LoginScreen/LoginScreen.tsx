import { FC } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './LoginScreen.style.css'

export const LoginScreen: FC = () => {
  return (
    <div className="containerLoginScreen">
      <header className="headerLoginScreen">
        <img src={logo} className="logoLoginScreen" alt="logo" />
      </header>
      <main className="mainLoginScreen">
        <form className="formLoginScreen">
          <h2>LOGIN</h2>
          <label className="labelLoginScreen" htmlFor="email">
            Email
          </label>
          <input id="email" type="email" className="inputLoginScreen" />
          <label className="labelLoginScreen" htmlFor="password">
            Senha
          </label>
          <input id="password" type="password" className="inputLoginScreen" />
          <button className="buttonLoginScreen">ENTRAR</button>
          <p className="registerLinkLoginScreen">Ainda não tenho uma conta</p>
        </form>
      </main>
    </div>
  )
}

export default LoginScreen
