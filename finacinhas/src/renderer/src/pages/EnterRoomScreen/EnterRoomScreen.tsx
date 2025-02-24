import React, { useState } from 'react'
import logo from '../../assets/Logo-Subtitle.svg'
import './EnterRoomScreen.style.css'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { getSessionByRoomCode } from '@renderer/firebase/session/session'

const EnterRoomScreen: React.FC = () => {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState('')

  const handlePlayerRoom = async (): Promise<void> => {
    try {
      if (!roomCode.trim()) {
        throw new Error('Por favor, insira um código de sala')
      }

      await getSessionByRoomCode(roomCode)

      navigate(`/select-team/${roomCode}`)
    } catch (error) {
      console.error('Erro ao verificar sala:', error)
      alert(error instanceof Error ? error.message : 'Erro desconhecido')
    }
  }
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
        {/* Input agora controlado pelo estado */}
        <input
          placeholder="Digite seu código"
          type="text"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="inputEnterRoomScreen"
        />
        <button className="EnterRoomButton" onClick={handlePlayerRoom}>
          CONTINUAR
        </button>
      </main>
    </div>
  )
}

export default EnterRoomScreen
