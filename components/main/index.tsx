import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import getMoves, { kingIsChecked } from '../../utils/calculateMoves'
import { whiteForwards, blackForwards, blackPawns, whitePawns } from '../../utils/pieces'
import { Piece, Tile } from '../types'
import { castleRook } from '../../utils/castleRook'

const MainComp = () => {
  const [board, setBoard] = useState<Tile[]>([])
  const [chosenTile, setChosenTile] = useState<Tile>()
  const [userColor] = useState('black')
  const [userChecked, setIsUserChecked] = useState(false)
  const [piecePositions] = useState<{ [key: number]: Piece[] }>(
    {
      7: whiteForwards,
      6: whitePawns,
      1: blackPawns,
      0: blackForwards
    }
  )

  const initBoard = useCallback(() => {
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
  }, [setBoard])

  useEffect(() => {
    initBoard()
  }, [initBoard])

  const calculateMoves = useCallback(() => {
    for (let i = 0; i < board.length; i++) {
      if (board[i].piece) {
        const boardCopy = [...board]
        boardCopy[i].piece?.moves = getMoves(board[i], board, userColor)
        setBoard(boardCopy)
      }
    }
  }, [board])

  useEffect(() => {
    calculateMoves()
  }, [chosenTile])

  const checkIsKingChecked = useCallback(() => {
    const king = board.find(x => x.piece?.pieceType === 'king' && x.piece.color === userColor)?.piece
    if (king && kingIsChecked(king, board, userColor)) {
      setIsUserChecked(true)
    } else {
      setIsUserChecked(false)
    }
  }, [userChecked])

  const setPieceOnTile = useCallback(async (piece: Piece | undefined, tileId: number, col: any, row: any) => {
    console.log(tileId)
    if (!piece) return
    const boardCopy = [...board]
    const pieceCopy = { ...piece }
    pieceCopy.col = col
    pieceCopy.row = row
    pieceCopy.amountMoves++
    boardCopy[tileId].piece = pieceCopy
    console.log(boardCopy[chosenTile.id].piece)
    setBoard(boardCopy)
  }, [chosenTile, board])

  const unSetPieceOnTile = useCallback(async (tileId: number) => {
    console.log(tileId)
    const boardCopy = [...board]
    boardCopy[tileId].piece = undefined
    setBoard(boardCopy)
  }, [board])

  const onClickTile = useCallback(async (tileId, row, col) => {
    console.log(board[tileId])
    const tileClicked = board[tileId]
    const chosenMove = chosenTile?.piece?.moves.find(x => x.col === col && x.row === row)
    if (tileClicked.id === tileId) {
      // if (!chosenPiece && board[i].piece?.color !== userColor) return
      if (chosenTile?.piece && chosenTile?.piece.color !== tileClicked.piece?.color && !chosenMove?.castleMove) {
        if (!chosenMove) return
        if ((chosenMove.attackMove && chosenTile.piece.pieceType === 'pawn') && !tileClicked.piece) return
        if (chosenMove.enPassantMove) {
          await setPieceOnTile(chosenTile.piece, tileId, col, row)
          await unSetPieceOnTile(tileId + (userColor === 'white' ? 8 : -8))
        }
        await setPieceOnTile(chosenTile.piece, tileId, col, row)
        await unSetPieceOnTile(chosenTile.id)
        return
      }
    }

    if (!tileClicked.piece && chosenTile) {
      if (chosenMove?.castleMove && chosenMove?.col < chosenTile.col) {
        await castleRook('left', board, userColor, setPieceOnTile)
        await setPieceOnTile(chosenTile?.piece, tileId, col, row)
        await unSetPieceOnTile(chosenTile.id)
        await unSetPieceOnTile(userColor === 'white' ? 56 : 0)
      }
      if (chosenMove?.castleMove && chosenMove?.col > chosenTile.col) {
        await castleRook('right', board, userColor, setPieceOnTile)
        await setPieceOnTile(chosenTile.piece, tileId, col, row)
        await unSetPieceOnTile(chosenTile.id)
        await unSetPieceOnTile(userColor === 'white' ? 63 : 7)
      }
      if (!chosenMove) return
      await setPieceOnTile(chosenTile.piece, tileId, col, row)
    }
    setChosenTile(tileClicked)
    calculateMoves()
  }, [chosenTile?.piece, board])

  return (
    <div className='parent-container'>
      <div className={'container ' + (userColor === 'black' ? 'rotate-180' : '')}>
        <div className="board-wrapper place-items-center" >
          {
            board.map((tile, idx) => {
              return (
                <div key={idx} className={tile.color + ' tile w-full ' + (userColor === 'black' ? 'rotate-180' : '')} onClick={() => onClickTile(tile.id, tile.row, tile.col)} >
                  <div className=''>
                    {tile.piece && tile.piece.icon
                      ? <Image src={tile.piece.icon.src} width="100%" height="100%" className={tile.id === chosenTile?.id ? 'bg-red-500' : ''} />
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
