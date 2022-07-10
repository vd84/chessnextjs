import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import getMoves, { getAllOpponentsPossibleMoves } from '../../utils/calculateMoves'
import { sendMove, moves } from '../../utils/connect'

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

export type Move = {
    col: number,
    row: number,
    pieceColor: string,
    attackMove: boolean,
    castleMove?: boolean
}

export type Piece = {
  pieceType: string,
  color: string,
  icon: any,
  col: number,
  row: number,
  id: number,
  moves: Move[]
  amountMoves: number
}

export type Tile = {
  col: number,
  color: string,
  id: number,
  piece?: Piece,
  row: number
}

const blackForwards =
  [{ pieceType: 'rook', color: 'black', icon: rd, col: 0, row: 0, id: 0, moves: [], amountMoves: 0 },
    { pieceType: 'knight', color: 'black', icon: nd, col: 1, row: 0, id: 1, moves: [], amountMoves: 0 },
    { pieceType: 'bishop', color: 'black', icon: bd, col: 2, row: 0, id: 2, moves: [], amountMoves: 0 },
    { pieceType: 'queen', color: 'black', icon: qd, col: 3, row: 0, id: 3, moves: [], amountMoves: 0 },
    { pieceType: 'king', color: 'black', icon: kd, col: 4, row: 0, id: 4, moves: [], amountMoves: 0 },
    { pieceType: 'bishop', color: 'black', icon: bd, col: 5, row: 0, id: 5, moves: [], amountMoves: 0 },
    { pieceType: 'knight', color: 'black', icon: nd, col: 6, row: 0, id: 6, moves: [], amountMoves: 0 },
    { pieceType: 'rook', color: 'black', icon: rd, col: 7, row: 0, id: 7, moves: [], amountMoves: 0 }]

const blackPawns =
  [{ pieceType: 'pawn', color: 'black', icon: pd, col: 0, row: 1, id: 8, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 1, row: 1, id: 9, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 2, row: 1, id: 10, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 3, row: 1, id: 11, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 4, row: 1, id: 12, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 5, row: 1, id: 13, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 6, row: 1, id: 14, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'black', icon: pd, col: 7, row: 1, id: 15, moves: [], amountMoves: 0 }]

const whitePawns =
  [{ pieceType: 'pawn', color: 'white', icon: pl, col: 0, row: 6, id: 48, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 1, row: 6, id: 49, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 2, row: 6, id: 50, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 3, row: 6, id: 51, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 4, row: 6, id: 52, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 5, row: 6, id: 53, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 6, row: 6, id: 54, moves: [], amountMoves: 0 },
    { pieceType: 'pawn', color: 'white', icon: pl, col: 7, row: 6, id: 55, moves: [], amountMoves: 0 }]

const whiteForwards =
  [{ pieceType: 'rook', color: 'white', icon: rl, col: 0, row: 7, id: 56, moves: [], amountMoves: 0 },
    { pieceType: 'knight', color: 'white', icon: nl, col: 1, row: 7, id: 57, moves: [], amountMoves: 0 },
    { pieceType: 'bishop', color: 'white', icon: bl, col: 2, row: 7, id: 58, moves: [], amountMoves: 0 },
    { pieceType: 'queen', color: 'white', icon: ql, col: 3, row: 7, id: 59, moves: [], amountMoves: 0 },
    { pieceType: 'king', color: 'white', icon: kl, col: 4, row: 7, id: 60, moves: [], amountMoves: 0 },
    { pieceType: 'bishop', color: 'white', icon: bl, col: 5, row: 7, id: 61, moves: [], amountMoves: 0 },
    { pieceType: 'knight', color: 'white', icon: nl, col: 6, row: 7, id: 62, moves: [], amountMoves: 0 },
    { pieceType: 'rook', color: 'white', icon: rl, col: 7, row: 7, id: 63, moves: [], amountMoves: 0 }]

const MainComp = () => {
  const [board, setBoard] = useState<Tile[]>([])
  const [chosenPiece, setChosenPiece] = useState<Piece>()
  const [userColor, setUserColor] = useState('black')
  const [coolMoves, setCoolMoves] = useState()
  const [piecePositions, setPiecePositions] = useState<{ [key: number]: Piece[] }>(
    {
      7: whiteForwards,
      6: whitePawns,
      1: blackPawns,
      0: blackForwards
    }
  )

  useEffect(() => {
    const tempBoard: any[] = []
    let id = 0
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tempBoard.push({
          col: j,
          row: i,
          color: (i % 2) === (j % 2) ? 'bg-white' : 'bg-gray-700',
          piece: piecePositions[i] ? piecePositions[i][j] : undefined,
          id: id
        })
        id++
      }
    }
    setBoard(tempBoard)
  }, [])

  const calculateMoves = useCallback(() => {
    for (let i = 0; i < board.length; i++) {
      if (board[i].piece) {
        const boardCopy = [...board]
        boardCopy[i].piece?.moves = getMoves(board[i].piece, board, userColor)
        setBoard(boardCopy)
      }
    }
  }, [board])

  useEffect(() => {
    calculateMoves()
    console.log(board)
  }, [chosenPiece])

  const castleRook = useCallback(async (direction: 'left' | 'right') => {
    let pieceId = direction === 'left' ? 56 : 63
    let pieceIdDestination = direction === 'left' ? 59 : 61
    if (userColor === 'black') {
      pieceId -= 56
      pieceIdDestination -= 56
    }
    console.log(pieceId)
    const rook = board[pieceId]
    console.log(rook)
    const row = userColor === 'white' ? 7 : 0
    if (rook.piece) {
      const col = direction === 'left' ? 3 : 5
      await movePiece(rook.piece, pieceIdDestination, col, row)
    }
  }, [board, userColor])

  const movePiece = useCallback(async (piece: Piece, tileId: number, col: any, row: any) => {
    // await sendMove(piece.id + ',' + tileId)
    const boardCopy = [...board]
    const pieceCopy = { ...piece }
    console.log(pieceCopy)
    boardCopy[piece.id].piece = undefined
    pieceCopy.id = tileId
    pieceCopy.col = col
    pieceCopy.row = row
    pieceCopy.amountMoves++
    boardCopy[tileId].piece = pieceCopy
    setBoard(boardCopy)
    setChosenPiece(undefined)
    piece.amountMoves++
    console.log(pieceCopy)
  }, [board])

  const onClickTile = useCallback(async (tileId, row, col) => {
    console.log('Clicking on tile')
    calculateMoves()
    let foundPiece = false
    const tileClicked = board[tileId]
    console.log(tileClicked)
    if (tileClicked.id === tileId) {
      // if (!chosenPiece && board[i].piece?.color !== userColor) return
      if (chosenPiece && chosenPiece.color !== tileClicked.piece?.color) {
        const chosenMove = chosenPiece.moves.find(x => x.col === col && x.row === row)
        if (!chosenMove) return
        if (chosenMove.attackMove && !tileClicked.piece) return
        await movePiece(chosenPiece, tileId, col, row)
        return
      }

      setChosenPiece(tileClicked.piece)
      foundPiece = true
    }

    if (!foundPiece && chosenPiece) {
      const chosenMove = chosenPiece.moves.find(x => x.col === col && x.row === row)
      if (chosenMove?.castleMove && chosenMove?.col < chosenPiece.col) {
        await castleRook('left')
        console.log(chosenPiece)
        await movePiece(chosenPiece, tileId, col, row)
      }
      if (chosenMove?.castleMove && chosenMove?.col > chosenPiece.col) {
        await castleRook('right')
        console.log(chosenPiece)

        await movePiece(chosenPiece, tileId, col, row)
      }
      if (!chosenMove) return
      await movePiece(chosenPiece, tileId, col, row)
    }
  }, [piecePositions, chosenPiece, board])

  return (
    <div className='parent-container'>
      {
        coolMoves && coolMoves.map((m, idx) => <p key={idx}>{m}</p>)
      }
      <div className={'container ' + (userColor === 'black' ? 'rotate-180' : '')}>
        <div className="board-wrapper place-items-center" >
          {
            board.map((tile, idx) => {
              return (
                <div key={idx} className={tile.color + ' tile w-full ' + (userColor === 'black' ? 'rotate-180' : '')} onClick={() => onClickTile(tile.id, tile.row, tile.col)} >
                  <div className=''>
                    {tile.piece && tile.piece.icon
                      ? <Image src={tile.piece.icon.src} width="100%" height="100%" className={tile.id === chosenPiece?.id ? 'bg-red-500' : ''} />
                      : <div />}
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
            img{
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
