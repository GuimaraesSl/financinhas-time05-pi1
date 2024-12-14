import React from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './EnterRoomScreen.css'

const EnterRoomScreen: React.FC = () => {
  return (
    <div className="containerEnterRoomScreen">
      <header className="headerEnterRoomScreen">
        <img src={logo} className="logoEnterRoomScreen" alt="logo" />
      </header>
      <main className="mainEnterRoomScreen">
        <h2>Digite o código para entrar na sala</h2>
        <input type="text" className="inputEnterRoomScreen" />
        <button className="EnterRoomButton">CONTINUAR</button>
      </main>
    </div>
  )
}

export default EnterRoomScreen
