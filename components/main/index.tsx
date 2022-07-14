import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import getMoves, { getAllOpponentsPossibleMoves } from '../../utils/calculateMoves'
import { sendMove, moves } from '../../utils/connect'
import { whiteForwards, blackForwards, blackPawns, whitePawns } from '../../utils/pieces'
import { Piece, Tile } from '../types'

const MainComp = () => {
  const [board, setBoard] = useState<Tile[]>([])
  const [chosenPiece, setChosenPiece] = useState<Piece>()
  const [userColor, setUserColor] = useState('white')
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

  const removePiece = useCallback((pieceId: number) => {
    const boardCopy = [...board]
    boardCopy[pieceId].piece = undefined
    setBoard(boardCopy)
  }, [board])

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
        if (chosenMove.enPassantMove) {
          const pawnToRemoveId = userColor === 'white' ? tileId + 8 : tileId - 8
          removePiece(pawnToRemoveId)
        }
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
  }, [chosenPiece, board])

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
