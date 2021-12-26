import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import bd from '../../public/pieces/bd.svg'
import bl from '../../public/pieces/bl.svg'
import kd from '../../public/pieces/kd.svg'
import kl from '../../public/pieces/kl.svg'
import nd from '../../public/pieces/nd.svg'
import nl from '../../public/pieces/nl.svg'
import pd from '../../public/pieces/pd.svg'
import pl from '../../public/pieces/pl.svg'
import qd from '../../public/pieces/qd.svg'
import ql from '../../public/pieces/ql.svg'
import rd from '../../public/pieces/rd.svg'
import rl from '../../public/pieces/rl.svg'

const MainComp = () => {
  const [board, setBoard] = useState<any[]>([])

  const pieceStartPositions: { [key: number]: any; } = {
    0: rd,
    1: nd,
    2: bd,
    3: qd,
    4: kd,
    5: bd,
    6: nd,
    7: rd,
    8: pd,
    9: pd,
    10: pd,
    11: pd,
    12: pd,
    13: pd,
    14: pd,
    15: pd
  }

  useEffect(() => {
    const tempBoard: any[] = []
    for (let i = 0; i < 64; i++) {
      tempBoard.push({
        col: i % 8 + 1,
        row: Math.floor(i / 8) + 1,
        color: ((i % 8 + 1) % 2) === ((Math.floor(i / 8) + 1) % 2) ? 'bg-gray-700' : 'bg-white',
        piece: pieceStartPositions[i]
      })
    }
    setBoard(tempBoard)
  }, [])

  useEffect(() => {
    console.log(board)
  }, [board])

  return (
    <div className='parent-container'>
        <div className='container'>
        <div className="board-wrapper place-items-center" >
        {
            board.map((tile, idx) => {
              return (
              <div key={idx} className={tile.color + ' tile w-full bg-black' } >
                  {
                      tile.piece ? <Image src={tile.piece.src} width="100%" height="100%" /> : <div className='bg-black' />
                  }
              </div>

              )
            })
        }
        </div>

        <style jsx>
            {`
            .parent-container{
                display:flex;
                justify-content:center;
            }
            .board-wrapper {
                display: grid;
                grid-template-columns: repeat(8,1fr);
                grid-template-rows: repeat(8, 1fr);
                justify-content: center;
                margin: 30px 30px
            }
            .tile{
                aspect-ratio: 1;
            }            
            `}
        </style>
        </div>
    </div>
  )
}

export default MainComp
