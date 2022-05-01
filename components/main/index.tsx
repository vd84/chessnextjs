import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import getMoves from '../../utils/calculateMoves'

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

type Piece = {
  pieceType: string,
  color: string,
  icon: any,
  col: number,
  row: number,
  id: number
}

const MainComp = () => {
  const [board, setBoard] = useState<any[]>([])
  const [chosenPiece, setChosenPiece] = useState<Piece>();
  const [piecePositions, setPiecePositions] = useState<{ [key: number]: Piece[] }>(
    {
      0: [{ pieceType: 'rook', color: 'black', icon: rd, col: 0, row: 0, id: 0 },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 1, row: 0, id: 1 },
      { pieceType: 'knight', color: 'black', icon: nd, col: 2, row: 0, id: 2 },
      { pieceType: 'queen', color: 'black', icon: qd, col: 3, row: 0, id: 3 },
      { pieceType: 'king', color: 'black', icon: kd, col: 4, row: 0, id: 4 },
      { pieceType: 'knight', color: 'black', icon: nd, col: 5, row: 0, id: 5 },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 6, row: 0, id: 6 },
      { pieceType: 'rook', color: 'black', icon: rd, col: 7, row: 0, id: 7 }],
      1: [{ pieceType: 'pawn', color: 'black', icon: pd, col: 0, row: 1, id: 8 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 1, row: 1, id: 9 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 2, row: 1, id: 10 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 3, row: 1, id: 11 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 4, row: 1, id: 12 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 5, row: 1, id: 13 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 6, row: 1, id: 14 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 7, row: 1, id: 15 }],

      6: [{ pieceType: 'pawn', color: 'white', icon: pl, col: 0, row: 6, id: 48 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 1, row: 6, id: 49 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 2, row: 6, id: 50 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 3, row: 6, id: 51 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 4, row: 6, id: 52 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 5, row: 6, id: 53 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 6, row: 6, id: 54 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 7, row: 6, id: 55 }],
      7: [{ pieceType: 'rook', color: 'white', icon: rl, col: 0, row: 7, id: 56 },
      { pieceType: 'bishop', color: 'white', icon: bl, col: 1, row: 7, id: 57 },
      { pieceType: 'knight', color: 'white', icon: nl, col: 2, row: 7, id: 58 },
      { pieceType: 'queen', color: 'white', icon: ql, col: 3, row: 7, id: 59 },
      { pieceType: 'king', color: 'white', icon: kl, col: 4, row: 7, id: 60 },
      { pieceType: 'knight', color: 'white', icon: nl, col: 5, row: 7, id: 61 },
      { pieceType: 'bishop', color: 'white', icon: bl, col: 6, row: 7, id: 62 },
      { pieceType: 'rook', color: 'white', icon: rl, col: 7, row: 7, id: 63 }]
    }
  )

  useEffect(() => {
    const tempBoard: any[] = []
    let id = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tempBoard.push({
          col: i,
          row: j,
          color: (i % 2) === (j % 2) ? 'bg-gray-700' : 'bg-white',
          piece: piecePositions[i] ? piecePositions[i][j] : undefined,
          id: id
        })
        id++;
      }
    }
    setBoard(tempBoard)
  }, [])

  const onClickTile = useCallback((tileId) => {
    let foundPiece = false;
    for (let i = 0; i < 64; i++) {
      if (board[i].id === tileId) {
        console.log(chosenPiece)
        if (!board[i].piece) continue
        if (chosenPiece && chosenPiece.color !== board[i].piece?.color) {
          console.log("trying to take piece")
        }
        setChosenPiece(board[i].piece)
        foundPiece = true;
      }

    }
    if (!foundPiece) {
      if (chosenPiece) {
        console.log("trying to move piece")
        console.log("ska flytta ", chosenPiece.id, " till ruta ", tileId);
        const boardCopy = [...board]
        boardCopy[chosenPiece.id].piece = undefined
        chosenPiece.id = tileId;
        boardCopy[tileId].piece = chosenPiece;
        setBoard(boardCopy);
      }
      setChosenPiece(undefined);
      console.log("klickade på en plats utan piece")
    }

  }, [piecePositions, chosenPiece, board])

  useEffect(() => {
    console.log("Chosen ", chosenPiece);
    console.log("board", board);
    console.log("piecePositions", piecePositions)
  }, [board, piecePositions, chosenPiece])

  return (
    <div className='parent-container'>
      <div className='container'>
        <div className="board-wrapper place-items-center" >
          {
            board.map((tile, idx) => {
              return (
                <div key={idx} className={tile.color + ' tile w-full'} onClick={() => onClickTile(tile.id)} >
                  <div>
                    {tile.piece && tile.piece.icon ?
                      <Image src={tile.piece.icon.src} width="100%" height="100%" /> :
                      <div className='bg-black' />}
                  </div>
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
                width:600px;
                height:600px;
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
                width:88.5px;
                height: 88.5px;
            }            
            `}
        </style>
      </div>
    </div>
  )
}

export default MainComp
