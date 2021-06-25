// import { FormEvent, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

// Firebase
// import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

// Imagens
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

// Componentes
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

// Hooks
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()

  const roomId = params.id

  const { title, questions } = useRoom(roomId)

  async function handleAndRoom() {
    // Implementar modal
    if(window.confirm('Tem certeza que dessa excluir essa sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      })

      history.push('/')
    }
  }

  async function handleCheckQuestionAsAnswred(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  async function handleDeleteQuestion(questionId: string) {
    // Implementar o modal
    if(window.confirm('Tem certeza que dessa excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
            <div>
              <RoomCode code={roomId} />
              <Button onClick={handleAndRoom} isOutlined>Encerrar sala</Button>
            </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 1 && <span>{questions.length} perguntas</span>} 
          { questions.length === 1 && <span>{questions.length} pergunta</span>} 
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                content={question.content}
                author={question.author}
                key={question.id}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button type="button" onClick={() => handleCheckQuestionAsAnswred(question.id)}>
                      {/* Implementar mudar cor da imagem */}
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}

                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}