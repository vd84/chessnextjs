import React, { useState } from 'react'

const MenuUI = ({ onClickPlay }) => {
  return (
        <>
            <div className='menu-div'>
                <h1>Menu</h1>
                <form action="" id="loginForm" className="login-form">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" required />
                    <label htmlFor="password">Password</label>
                    <button type="submit" onClick={onClickPlay}>Play</button>
                </form>
            </div>
            <style jsx>
                {`
                    .menu-div {
                        text-align: center;
                    }
                    
                    h1{
                      font-size: 54px;
                    }

                    .login-form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    label {
                        background-color: #44FFD1;    
                        border-radius: 3em;  
                        padding: 3em; 
                    }
                    
                    input {
                        border: solid 3px black;    
                        border-radius: 3em;            
                    }
  
                `}
            </style>
        </>

  )
}

export default MenuUI
