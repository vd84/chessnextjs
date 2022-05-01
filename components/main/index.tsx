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

export type Piece = {
  pieceType: string,
  color: string,
  icon: any,
  col: number,
  row: number,
  id: number,
  moves: []
  hasMoved?: boolean
}

const MainComp = () => {
  const [board, setBoard] = useState<any[]>([])
  const [chosenPiece, setChosenPiece] = useState<Piece>()
  const [piecePositions, setPiecePositions] = useState<{ [key: number]: Piece[] }>(
    {
      0: [{ pieceType: 'rook', color: 'black', icon: rd, col: 0, row: 0, id: 0, moves: [] },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 1, row: 0, id: 1, moves: [] },
      { pieceType: 'knight', color: 'black', icon: nd, col: 2, row: 0, id: 2, moves: [] },
      { pieceType: 'queen', color: 'black', icon: qd, col: 3, row: 0, id: 3, moves: [] },
      { pieceType: 'king', color: 'black', icon: kd, col: 4, row: 0, id: 4, moves: [] },
      { pieceType: 'knight', color: 'black', icon: nd, col: 5, row: 0, id: 5, moves: [] },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 6, row: 0, id: 6, moves: [] },
      { pieceType: 'rook', color: 'black', icon: rd, col: 7, row: 0, id: 7, moves: [] }],
      1: [{ pieceType: 'pawn', color: 'black', icon: pd, col: 0, row: 1, id: 8, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 1, row: 1, id: 9, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 2, row: 1, id: 10, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 3, row: 1, id: 11, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 4, row: 1, id: 12, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 5, row: 1, id: 13, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 6, row: 1, id: 14, moves: [] },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 7, row: 1, id: 15, moves: [] }],

      6: [{ pieceType: 'pawn', color: 'white', icon: pl, col: 0, row: 6, id: 48, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 1, row: 6, id: 49, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 2, row: 6, id: 50, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 3, row: 6, id: 51, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 4, row: 6, id: 52, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 5, row: 6, id: 53, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 6, row: 6, id: 54, moves: [] },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 7, row: 6, id: 55, moves: [] }],
      7: [{ pieceType: 'rook', color: 'white', icon: rl, col: 0, row: 7, id: 56, moves: [] },
      { pieceType: 'bishop', color: 'white', icon: bl, col: 1, row: 7, id: 57, moves: [] },
      { pieceType: 'knight', color: 'white', icon: nl, col: 2, row: 7, id: 58, moves: [] },
      { pieceType: 'queen', color: 'white', icon: ql, col: 3, row: 7, id: 59, moves: [] },
      { pieceType: 'king', color: 'white', icon: kl, col: 4, row: 7, id: 60, moves: [] },
      { pieceType: 'knight', color: 'white', icon: nl, col: 5, row: 7, id: 61, moves: [] },
      { pieceType: 'bishop', color: 'white', icon: bl, col: 6, row: 7, id: 62, moves: [] },
      { pieceType: 'rook', color: 'white', icon: rl, col: 7, row: 7, id: 63, moves: [] }]
    }
  )

  useEffect(() => {
    const tempBoard: any[] = []
    let id = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tempBoard.push({
          col: i,
          row: j,
          color: (i % 2) === (j % 2) ? 'bg-gray-700' : 'bg-white',
          piece: piecePositions[i] ? piecePositions[i][j] : undefined,
          id: id
        })
        id++
      }
    }
    setBoard(tempBoard)
  }, [])

  useEffect(() => {
    for (let i = 0; i < board.length; i++) {
      if (board[i].piece) {
        const boardCopy = [...board]
        console.log(board[i].piece)
        boardCopy[i].piece.moves = getMoves(board[i].piece, board)
        setBoard(boardCopy)
      }
    }
  }, [chosenPiece])

  const movePiece = (piece: Piece, tileId: number, col: any, row: any) => {
    const boardCopy = [...board]
    boardCopy[piece.id].piece = undefined
    piece.id = tileId
    piece.col = col
    piece.row = row
    piece.hasMoved = true
    boardCopy[tileId].piece = chosenPiece
    setBoard(boardCopy)
    setChosenPiece(undefined)
  }

  const onClickTile = useCallback((tileId, row, col) => {
    let foundPiece = false
    for (let i = 0; i < 64; i++) {
      if (board[i].id === tileId) {
        console.log(chosenPiece)
        if (!board[i].piece) continue
        if (chosenPiece && chosenPiece.color !== board[i].piece?.color) {
          console.log('trying to take piece')
        }
        setChosenPiece(board[i].piece)
        foundPiece = true
      }
    }
    if (!foundPiece && chosenPiece) {
      if (!chosenPiece.moves.find(x => x.col === col && x.row === row)) return
      movePiece(chosenPiece, tileId, col, row)
    }
  }, [piecePositions, chosenPiece, board])

  useEffect(() => {
    console.log('Chosen ', chosenPiece)
    console.log('board', board)
    console.log('piecePositions', piecePositions)
  }, [board, piecePositions, chosenPiece])

  return (
    <div className='parent-container'>
      <div className='container'>
        <div className="board-wrapper place-items-center" >
          {
            board.map((tile, idx) => {
              return (
                <div key={idx} className={tile.color + ' tile w-full'} onClick={() => onClickTile(tile.id, tile.col, tile.row)} >
                  <div>
                    {tile.piece && tile.piece.icon
                      ? <Image src={tile.piece.icon.src} width="100%" height="100%" />
                      : <div className='bg-black' />}
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
