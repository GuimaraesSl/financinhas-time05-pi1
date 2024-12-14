import { FC } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './LoginScreen.style.css'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import InputField from '@renderer/components/InputField/InputField'

export const LoginScreen: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="containerLoginScreen">
      <header className="headerLoginScreen">
        <MdArrowBack
          onClick={() => navigate('/profile-select')}
          size={45}
          color="#000"
          className="arrowIcon"
        />
        <img src={logo} className="logoLoginScreen" alt="logo" />
      </header>
      <main className="mainLoginScreen">
        <form className="formLoginScreen">
          <h2>LOGIN</h2>
          <InputField id="email" name="email" label="Email" type="email" />
          <InputField id="senha" name="senha" label="Senha" type="password" />
          <button className="buttonLoginScreen">ENTRAR</button>
          <p onClick={() => navigate('/register')} className="registerLinkLoginScreen">
            Ainda não tenho uma conta
          </p>
        </form>
      </main>
    </div>
  )
}

export default LoginScreen
