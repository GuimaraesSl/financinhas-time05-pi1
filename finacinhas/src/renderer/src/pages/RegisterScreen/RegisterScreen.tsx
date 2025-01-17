import React from 'react'
import { createUser } from '@renderer/firebase/auth/auth'
import { useNavigate } from 'react-router-dom'
import './RegisterScreen.style.css'
import InputField from '../../components/InputField/InputField'
import logo from '../../assets/Logo-Subtitle.svg'
import { MdArrowBack } from 'react-icons/md'

const Cadastro: React.FC = () => {
  const navigate = useNavigate()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const isEmailValid = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  }

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    if (!isEmailValid(email)) {
      alert('E-mail inválido. Tente novamente.')
      console.log('Invalid email:', name, email, password)
      return
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Tente novamente.')
      return
    }

    try {
      await createUser(email, password, name)
      console.log('User registered successfully', name, email, password)
      alert('Cadastro realizado com sucesso!')

      navigate('/login')
    } catch (error) {
      console.error('Error during registration:', error)
      alert(`Erro ao realizar o cadastro. Verifique os dados e tente novamente. ${error}`)
    }
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
          <InputField
            id="nome"
            name="nome"
            label="Nome"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              console.log('Nome atualizado:', e.target.value) // Log para verificar se está atualizando
            }}
          />

          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              console.log('Email atualizado:', e.target.value) // Log para verificar se está atualizando
            }}
          />
          <InputField
            id="senha"
            name="senha"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              console.log('Senha atualizada:', e.target.value) // Log para verificar se está atualizando
            }}
          />

          <InputField
            id="confirme-senha"
            name="confirme-senha"
            label="Confirme a senha"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              console.log('Confirme senha atualizada:', e.target.value) // Log para verificar se está atualizando
            }}
          />

          <button type="submit" className="buttonRegisterScreen">
            CADASTRAR
          </button>
        </form>
        <a className="linkRegisterScreen" onClick={handleLoginRedirect}>
          Já tenho uma conta.
        </a>
      </main>
    </div>
  )
}

export default Cadastro
