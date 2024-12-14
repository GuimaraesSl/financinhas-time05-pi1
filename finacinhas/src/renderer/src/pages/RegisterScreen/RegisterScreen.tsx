import React from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterScreen.style.css'
import InputField from '../../components/InputField/InputField'
import logo from '../../assets/Logo-Subtitle.svg'
import { MdArrowBack } from 'react-icons/md'

const Cadastro: React.FC = () => {
  const navigate = useNavigate()

  const handleRegister = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    navigate('/number-teams')
  }

  const handleLoginRedirect = (): void => {
    navigate('/login')
  }

  return (
    <div className="containerRegisterScreen">
      <header className="headerRegisterScreen">
        <MdArrowBack
          onClick={() => navigate('/login')}
          size={45}
          color="#000"
          className="arrowIcon"
        />
        <img src={logo} className="logoRegisterScreen" alt="logo" />
      </header>
      <main className="mainRegisterScreen">
        <h1 className="titleRegisterScreen">CADASTRO</h1>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleRegister}
          className="formRegisterScreen"
        >
          <InputField id="nome" name="nome" label="Nome" type="text" />
          <InputField id="email" name="email" label="Email" type="email" />
          <InputField id="senha" name="senha" label="Senha" type="password" />
          <InputField
            id="confirme-senha"
            name="confirme-senha"
            label="Confirme a senha"
            type="password"
          />
          <button type="submit" className="buttonRegisterScreen">
            CADASTRAR
          </button>
        </form>
        <a className="linkRegisterScreen" onClick={handleLoginRedirect}>
          Já tenho uma conta
        </a>
      </main>
    </div>
  )
}

export default Cadastro
