import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

// Componentes
import { Button } from '../components/Button'

// Imagens
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import goggleiconImg from '../assets/images/google-icon.svg'
import mailiconImg from '../assets/images/iconmonstr-email-14.svg'

import '../styles/auth.scss'

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle} = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoomGoogle() {
    if(!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      alert('Está sala não existe.')

      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao  vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="logotipo letmeask" />

          <button onClick={handleCreateRoomGoogle} className="create-room btn-google">
            <img src={goggleiconImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>

          <span className="ou">ou</span>

          <button className="create-room btn-email">
            <img src={mailiconImg} alt="icone de email" />
            Crie sua sala com Email
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}