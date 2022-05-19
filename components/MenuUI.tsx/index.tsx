import React, { useState } from 'react'

const MenuUI = ({ onClickPlay }) => {
    console.log(onClickPlay)
    return (
        <>
            <div className='menu-div'>
                <h1>Menu</h1>
                <form action="" id="loginForm" className="login-form">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                    <button type="submit" onClick={onClickPlay}>Play</button>
                </form>
            </div>
            <style jsx>
                {`
                    .menu-div {
                        text-align: center;
                    }

                    .login-form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                
                `}
            </style>
        </>

    )
}

export default MenuUI
