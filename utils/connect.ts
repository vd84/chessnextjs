import axios from 'axios'
export const moves = []
let socket = null

if (typeof window !== 'undefined') {
    socket = new WebSocket('ws://localhost:8080')
    socket.onmessage = function (event) {
        alert(`[message] Data received from server: ${event.data}`)
        localStorage.setItem('moves', localStorage.getItem('moves') + event.data)
        moves.push(event.data)
        console.log(event.data)
    }
}

export const getSessionId = async () => {
    if (typeof window !== 'undefined') {
        const session = await axios.get('http://localhost:3001/getsession')
        console.log(session.data)
        return session.data.sessionId
    }
}

export const initWs = async () => {
    if (typeof window !== 'undefined' && socket !== null) {
        const res = await socket.send('init ' + localStorage.getItem('sessionId'))
        console.log(res)
    }
}

export const sendMove = async (move: string) => {
    if (typeof window !== 'undefined' && socket !== null) {
        const msg = 'move ' + localStorage.getItem('sessionId') + ' ' + move
        console.log(msg)
        const res = await socket.send('move ' + localStorage.getItem('sessionId') + ' ' + move)
        console.log(res)
    }
}
