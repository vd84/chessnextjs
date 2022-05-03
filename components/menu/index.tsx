import React, { useCallback, useState } from 'react'

const Menu = () => {
    const [loadingGame, setLoadingGame] = useState(false)
    const onHandlePlayClick = useCallback(() => {
        setLoadingGame(true)
        setTimeout(() => {
            window.location.href = '/main'
        }, 3000)
    }, [])
    return (
        <div className='container'>
            {loadingGame
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
