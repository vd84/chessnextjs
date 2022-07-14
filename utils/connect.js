import axios from 'axios'
export const moves = []
let socket = null

if (typeof window !== 'undefined') {
  socket = new WebSocket('ws://localhost:8080')
  socket.onmessage = function (event) {
    localStorage.setItem('moves', localStorage.getItem('moves') + event.data)
    moves.push(event.data)
  }
}

export const getSessionId = async () => {
  if (typeof window !== 'undefined') {
    const session = await axios.get('http://localhost:3001/getsession')
    return session.data.sessionId
  }
}

export const initWs = async () => {
  if (typeof window !== 'undefined' && socket !== null) {
    await socket.send('init ' + localStorage.getItem('sessionId'))
  }
}

export const sendMove = async (move) => {
  if (typeof window !== 'undefined' && socket !== null) {
    const msg = 'move ' + localStorage.getItem('sessionId') + ' ' + move
    await socket.send('move ' + localStorage.getItem('sessionId') + ' ' + move)
  }
}
