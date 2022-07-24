import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import getMoves, { kingIsChecked } from '../../utils/calculateMoves'
import { whiteForwards, blackForwards, blackPawns, whitePawns } from '../../utils/pieces'
import { Piece, Tile } from '../types'

const MainComp = () => {
  const [board, setBoard] = useState<Tile[]>([])
  const [chosenTile, setChosenTile] = useState<Tile>()
  const [userColor] = useState('white')
  const [isUserChecked, setIsUserChecked] = useState(false)
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
    checkIsKingChecked()
  }, [board])

  useEffect(() => {
    calculateMoves()
  }, [chosenTile])

  const checkIsKingChecked = useCallback(() => {
    const kingId = userColor === 'white' ? 60 : 4
    const king = board[kingId]?.piece
    if (king && kingIsChecked(king, board, userColor)) {
      setIsUserChecked(true)
    } else {
      setIsUserChecked(false)
    }
  }, [isUserChecked, board])

  const setPieceOnTile = useCallback(async (piece: Piece | undefined, tileId: number, col: any, row: any) => {
    if (!piece) return
    const boardCopy = [...board]
    const pieceCopy = { ...piece }
    pieceCopy.col = col
    pieceCopy.row = row
    pieceCopy.amountMoves++
    boardCopy[tileId].piece = pieceCopy
    setBoard(boardCopy)
  }, [chosenTile, board])

  const unSetPieceOnTile = useCallback(async (tileId: number) => {
    const boardCopy = [...board]
    boardCopy[tileId].piece = undefined
    setBoard(boardCopy)
  }, [board])

  const castleRook = useCallback(async (
    direction: 'left' | 'right',
    board: Tile[],
    userColor: string, movePiece: (piece: Piece, pieceIdDestination: number, col: number, row: number) => void) => {
    let tileId = direction === 'left' ? 56 : 63
    let destinationTileId = direction === 'left' ? 59 : 61
    if (userColor === 'black') {
      tileId -= 56
      destinationTileId -= 56
    }
    const rook = board[tileId]
    const row = userColor === 'white' ? 7 : 0
    if (rook.piece) {
      const col = direction === 'left' ? 3 : 5
      await movePiece(rook.piece, destinationTileId, col, row)
    }
  }, [board])

  const onClickTile = useCallback(async (tileId, row, col) => {
    console.log(board[tileId])
    checkIsKingChecked()
    const tileClicked = board[tileId]
    const chosenMove = chosenTile?.piece?.moves.find(x => x.col === col && x.row === row)
    if (tileClicked.id === tileId) {
      // if (!chosenPiece && board[i].piece?.color !== userColor) return
      if (chosenTile?.piece && chosenTile?.piece.color !== tileClicked.piece?.color && !chosenMove?.castleMove) {
        if (!chosenMove) return
        if ((chosenMove.attackMove && chosenTile.piece.pieceType === 'pawn') && !tileClicked.piece) return
        if (chosenMove.enPassantMove) {
          await unSetPieceOnTile(tileId + (userColor === 'white' ? 8 : -8))
        }
        if (tileClicked?.piece?.id === 60 || tileClicked?.piece?.id === 4) return
        await setPieceOnTile(chosenTile.piece, tileId, col, row)
        await unSetPieceOnTile(chosenTile.id)
        return
      }
    }

    if (!tileClicked.piece && chosenTile) {
      if (chosenMove?.castleMove && chosenMove?.col < chosenTile.col) {
        await castleRook('left', board, userColor, setPieceOnTile)
        await setPieceOnTile(chosenTile?.piece, tileId, col, row)
        await unSetPieceOnTile(chosenTile?.piece?.id)
        await unSetPieceOnTile(userColor === 'white' ? 56 : 0)
      }
      if (chosenMove?.castleMove && chosenMove?.col > chosenTile.col) {
        await castleRook('right', board, userColor, setPieceOnTile)
        await setPieceOnTile(chosenTile.piece, tileId, col, row)
        await unSetPieceOnTile(chosenTile?.piece?.id)
        await unSetPieceOnTile(userColor === 'white' ? 63 : 7)
      }
      if (!chosenMove) return
      await setPieceOnTile(chosenTile.piece, tileId, col, row)
    }
    setChosenTile(tileClicked)
  }, [chosenTile, board])

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
        {isUserChecked && 'OJOJ CHECKAD'}

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
