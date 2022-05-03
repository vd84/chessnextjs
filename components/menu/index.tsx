import React, { useCallback, useState } from 'react'
import { getSessionId, initWs } from '../../utils/connect'
import MainComp from '../main'

const Menu = () => {
    const [loadingGame, setLoadingGame] = useState(false)
    const [playing, setPlaying] = useState(false)
    const onHandlePlayClick = useCallback(async () => {
        console.log('whaat')
        setLoadingGame(true)
        const sessionId = await getSessionId()
        localStorage.setItem('sessionId', sessionId)
        initWs()
        setTimeout(() => {
            setPlaying(true)
        }, 3000)
    }, [])
    return (
        <div className='container'>
            {playing
                ? <MainComp />
                : loadingGame
                    ? <div className="loader">Loading<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div>
                    : <div>
                        <button onClick={onHandlePlayClick}>Spela!</button>
                    </div>
            }
            <style jsx>
                {`
                .container{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 50px;
                }
                @keyframes blink {50% { color: transparent }}
                .loader__dot { animation: 1s blink infinite }
                .loader__dot:nth-child(2) { animation-delay: 250ms }
                .loader__dot:nth-child(3) { animation-delay: 500ms }
                `}
            </style>
        </div >
    )
}

export default Menu
