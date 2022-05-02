import { Piece } from '../components/main'

const getMoves = (piece: Piece, board: any, userColor: string) => {
  switch (piece.pieceType) {
    case 'pawn':
      return getPawnMoves(piece, board, userColor)
    case 'rook':
      return getRookMoves(piece, board, userColor)
    default:
      return []
    // code block
  }
}

const getPawnMoves = (piece: Piece, board: any, userColor: string) => {
  const moves = [{ row: piece.row - 1, col: piece.col }]
  if (piece.amountMoves === 0) {
    moves.push({ row: piece.row - 2, col: piece.col })
  }
  if (board[piece.id + 1].piece?.pieceType === 'pawn' && board[piece.id + 1].piece?.amountMoves === 1) {
    moves.push({ row: piece.row - 1, col: piece.col + 1 })
  }
  if (board[piece.id - 1].piece?.pieceType === 'pawn' && board[piece.id + 1].piece?.amountMoves === 1) {
    moves.push({ row: piece.row - 1, col: piece.col - 1 })
  }
  return moves
}

const getRookMoves = (piece: Piece, board: any, userColor: string) => {
  const moves = []
  for (let i = 0; i < 8; i++) {
    moves.push({ row: piece.row + i, col: piece.col })
    moves.push({ row: piece.row - i, col: piece.col })
    moves.push({ row: piece.row, col: piece.col + i })
    moves.push({ row: piece.row, col: piece.col - i })
  }

  return moves
}

export default getMoves
