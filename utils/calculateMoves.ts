import { Piece, Tile } from '../components/main'

const existsNoPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return getPieceOnTile(row, col, board) === undefined
}

const getPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return board.find(x => x.row === row && x.col === col)?.piece
}
const getMoves = (piece: Piece, board: any, userColor: string) => {
  switch (piece.pieceType) {
    case 'pawn':
      return getPawnMoves(piece, board, userColor)
    case 'rook':
      return getRookMoves(piece, board, userColor)
    case 'bishop':
      return getBishopMoves(piece, board, userColor)
    case 'king':
      return getKingMoves(piece, board, userColor)
    case 'knight':
      return getKnightMoves(piece, board, userColor)
    case 'queen':
      return [...getBishopMoves(piece, board, userColor), ...getRookMoves(piece, board, userColor)]
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
  if (getPieceOnTile(piece.row - 1, piece.col - 1, board)?.color !== userColor) {
    moves.push({ row: piece.row - 1, col: piece.col - 1 })
  }
  return moves
}

const getRookMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board)) {
      moves.push({ row: piece.row + i, col: piece.col })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board)) {
      moves.push({ row: piece.row - i, col: piece.col })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board)) {
      moves.push({ row: piece.row, col: piece.col - i })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board)) {
      moves.push({ row: piece.row, col: piece.col + i })
    } else break
  }
  return moves
}

const getBishopMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board)) {
      moves.push({ row: piece.row + i, col: piece.col + i })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board)) {
      moves.push({ row: piece.row - i, col: piece.col - i })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board)) {
      moves.push({ row: piece.row + i, col: piece.col - i })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board)) {
      moves.push({ row: piece.row - i, col: piece.col + i })
    } else break
  }
  return moves
}

const getKnightMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const moves = []
  moves.push({ row: piece.row + 2, col: piece.col + 1 })
  moves.push({ row: piece.row + 2, col: piece.col - 1 })
  moves.push({ row: piece.row - 2, col: piece.col + 1 })
  moves.push({ row: piece.row - 2, col: piece.col - 1 })
  moves.push({ row: piece.row - 1, col: piece.col - 2 })
  moves.push({ row: piece.row - 1, col: piece.col + 2 })
  moves.push({ row: piece.row + 1, col: piece.col + 2 })
  moves.push({ row: piece.row + 1, col: piece.col - 2 })

  return moves
}

const getKingMoves = (piece: Piece, board: any, userColor: string) => {
  const moves = []
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board)) {
      moves.push({ row: piece.row + i, col: piece.col + i })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board)) {
      moves.push({ row: piece.row - i, col: piece.col - i })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board)) {
      moves.push({ row: piece.row + i, col: piece.col - i })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board)) {
      moves.push({ row: piece.row - i, col: piece.col + i })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board)) {
      moves.push({ row: piece.row + i, col: piece.col })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board)) {
      moves.push({ row: piece.row - i, col: piece.col })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board)) {
      moves.push({ row: piece.row, col: piece.col - i })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board)) {
      moves.push({ row: piece.row, col: piece.col + i })
    } else break
  }
  return moves
}
export default getMoves
