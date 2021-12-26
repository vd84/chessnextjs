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

  const pieceStartPositions: { [key: number]: {pieceType: string, icon: any}; } = {
    0: { pieceType: 'rook', icon: rd },
    1: { pieceType: 'bishop', icon: bd },
    2: { pieceType: 'knight', icon: nd },
    3: { pieceType: 'queen', icon: qd },
    4: { pieceType: 'king', icon: kd },
    5: { pieceType: 'knight', icon: nd },
    6: { pieceType: 'bishop', icon: bd },
    7: { pieceType: 'rook', icon: rd },
    8: { pieceType: 'pawn', icon: pd },
    9: { pieceType: 'pawn', icon: pd },
    10: { pieceType: 'pawn', icon: pd },
    11: { pieceType: 'pawn', icon: pd },
    12: { pieceType: 'pawn', icon: pd },
    13: { pieceType: 'pawn', icon: pd },
    14: { pieceType: 'pawn', icon: pd },
    15: { pieceType: 'pawn', icon: pd },

    48: { pieceType: 'pawn', icon: pl },
    49: { pieceType: 'pawn', icon: pl },
    50: { pieceType: 'pawn', icon: pl },
    51: { pieceType: 'pawn', icon: pl },
    52: { pieceType: 'pawn', icon: pl },
    53: { pieceType: 'pawn', icon: pl },
    54: { pieceType: 'pawn', icon: pl },
    55: { pieceType: 'pawn', icon: pl },
    56: { pieceType: 'rook', icon: rl },
    57: { pieceType: 'bishop', icon: bl },
    58: { pieceType: 'knight', icon: nl },
    59: { pieceType: 'queen', icon: ql },
    60: { pieceType: 'king', icon: kl },
    61: { pieceType: 'knight', icon: nl },
    62: { pieceType: 'bishop', icon: bl },
    63: { pieceType: 'rook', icon: rl }
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

  const getPossibleMoves = (piece, pos) => {

  }

  return (
    <div className='parent-container'>
        <div className='container'>
        <div className="board-wrapper place-items-center" >
        {
            board.map((tile, idx) => {
              return (
              <div key={idx} className={tile.color + ' tile w-full bg-black' } >
                  {
                    tile.piece ? <Image src={tile.piece.icon.src} width="100%" height="100%" /> : <div className='bg-black' />
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
