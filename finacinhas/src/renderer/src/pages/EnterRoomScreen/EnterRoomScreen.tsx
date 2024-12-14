import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './EnterRoomScreen.style.css'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const EnterRoomScreen: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="containerEnterRoomScreen">
      <header className="headerEnterRoomScreen">
        <MdArrowBack
          onClick={() => navigate('/profile-select')}
          size={45}
          color="#000"
          className="arrowIcon"
        />
        <img src={logo} className="logoEnterRoomScreen" alt="logo" />
      </header>
      <main className="mainEnterRoomScreen">
        <h2>Digite o código para entrar na sala</h2>
        <input placeholder="Digite seu código" type="text" className="inputEnterRoomScreen" />
        <button className="EnterRoomButton" onClick={() => navigate('/select-team')}>
          CONTINUAR
        </button>
      </main>
    </div>
  )
}

export default EnterRoomScreen
