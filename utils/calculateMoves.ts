import { Piece } from '../components/main'

const getMoves = (piece: Piece, board: any) => {
  switch (piece.pieceType) {
    case 'pawn':
      return getPawnMoves(piece, board)
    default:
      return []
    // code block
  }
}

const getPawnMoves = (piece: Piece, board: any) => {
  const moves = [{ row: piece.row + -1, col: piece.col }]
  if (!piece.hasMoved) {
    moves.push({ row: piece.row - 2, col: piece.col })
  }
  return moves
}

export default getMoves
