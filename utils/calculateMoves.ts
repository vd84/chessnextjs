import { Move, Piece, Tile } from '../components/types'

const existsNoPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return getPieceOnTile(row, col, board) === undefined
}

const getPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return board.find(x => x.row === row && x.col === col)?.piece
}

const moveExistsInOppositeColor = (row: number, col: number, userColor: string, board: Tile[]) => {
  const allOpponentMoves = board.map((tile: Tile) => {
    if (tile.piece?.color !== userColor) {
      return tile.piece
    }
  })
  return allOpponentMoves.findIndex(x => x?.col === col && x.row === row && x?.color !== userColor) >= 0
}

const existsPieceInTheWayCol = (board: Tile[], row: number, currentCol: number, destCol: number) => {
  while (currentCol !== destCol) {
    if (getPieceOnTile(row, currentCol, board)) {
      return true
    }
    if (currentCol < destCol) {
      currentCol++
    } else {
      currentCol--
    }
  }
  return false
}

const getMoves = (piece: Piece, board: Tile[], userColor: string) => {
  switch (piece.pieceType) {
    case 'pawn':
      const pawnMoves = getPawnMoves(piece, board, userColor, piece.color)
      return pawnMoves
    case 'rook':
      const rookMoves = getRookMoves(piece, board, piece.color)
      return rookMoves
    case 'bishop':
      const bishopMoves = getBishopMoves(piece, board, piece.color)
      return bishopMoves
    case 'king':
      const kingMoves = getKingMoves(piece, board, piece.color)
      return kingMoves
    case 'knight':
      const knightMoves = getKnightMoves(piece, board, piece.color)
      return knightMoves
    case 'queen':
      const queenMoves = [...getBishopMoves(piece, board, piece.color), ...getRookMoves(piece, board, userColor)]
      return queenMoves
    default:
      return []
    // code block
  }
}

const getPawnMoves = (piece: Piece, board: Tile[], userColor: string, pieceColor: string) => {
  const m = piece.color === 'white' ? 1 : -1

  const moves: Move[] = []
  if (existsNoPieceOnTile(piece.row - 1 * m, piece.col, board)) {
    moves.push({ row: piece.row - 1 * m, col: piece.col, pieceColor: pieceColor, attackMove: false })
  }
  if (piece.amountMoves === 0 && existsNoPieceOnTile(piece.row - 2 * m, piece.col, board)) {
    moves.push({ row: piece.row - 2 * m, col: piece.col, pieceColor: pieceColor, attackMove: false })
  }
  if (board[piece.id + 1].piece?.pieceType === 'pawn' && board[piece.id + 1].piece?.color !== userColor && board[piece.id + 1].piece?.amountMoves === 1) {
    moves.push({ row: piece.row - 1 * m, col: piece.col + 1, pieceColor: pieceColor, attackMove: false, enPassantMove: true })
  }
  if (board[piece.id - 1].piece?.pieceType === 'pawn' && board[piece.id - 1].piece?.color !== userColor && board[piece.id - 1].piece?.amountMoves === 1) {
    moves.push({ row: piece.row - 1 * m, col: piece.col - 1, pieceColor: pieceColor, attackMove: false, enPassantMove: true })
  }
  moves.push({ row: piece.row - 1 * m, col: piece.col - 1, pieceColor: pieceColor, attackMove: true })

  moves.push({ row: piece.row - 1 * m, col: piece.col + 1, pieceColor: pieceColor, attackMove: true })

  return moves
}

const getRookMoves = (piece: Piece, board: Tile[], pieceColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row + i, piece.col, board)) {
      moves.push({ row: piece.row + i, col: piece.col, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row + i, col: piece.col, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row - i, piece.col, board)) {
      moves.push({ row: piece.row - i, col: piece.col, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row - i, col: piece.col, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row, piece.col - i, board)) {
      moves.push({ row: piece.row, col: piece.col - i, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row, col: piece.col - i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row, piece.col + i, board)) {
      moves.push({ row: piece.row, col: piece.col + i, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row, col: piece.col + i, pieceColor: pieceColor })
      break
    }
  }
  return moves
}

const getBishopMoves = (piece: Piece, board: Tile[], pieceColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row + i, piece.col + i, board)) {
      moves.push({ row: piece.row + i, col: piece.col + i, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row + i, col: piece.col + i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row - i, piece.col - i, board)) {
      moves.push({ row: piece.row - i, col: piece.col - i, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row - i, col: piece.col - i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row + i, piece.col - i, board)) {
      moves.push({ row: piece.row + i, col: piece.col - i, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row + i, col: piece.col - i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(piece.row - i, piece.col + i, board)) {
      moves.push({ row: piece.row - i, col: piece.col + i, pieceColor: pieceColor })
    } else {
      moves.push({ row: piece.row - i, col: piece.col + i, pieceColor: pieceColor })
      break
    }
  }
  return moves
}

const getKnightMoves = (piece: Piece, board: Tile[], pieceColor: string) => {
  const moves = []
  moves.push({ row: piece.row + 2, col: piece.col + 1, pieceColor: pieceColor })
  moves.push({ row: piece.row + 2, col: piece.col - 1, pieceColor: pieceColor })
  moves.push({ row: piece.row - 2, col: piece.col + 1, pieceColor: pieceColor })
  moves.push({ row: piece.row - 2, col: piece.col - 1, pieceColor: pieceColor })
  moves.push({ row: piece.row - 1, col: piece.col - 2, pieceColor: pieceColor })
  moves.push({ row: piece.row - 1, col: piece.col + 2, pieceColor: pieceColor })
  moves.push({ row: piece.row + 1, col: piece.col + 2, pieceColor: pieceColor })
  moves.push({ row: piece.row + 1, col: piece.col - 2, pieceColor: pieceColor })

  return moves
}

const getKingMoves = (piece: Piece, board: any, pieceColor: string) => {
  const moves = []
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board) && !moveExistsInOppositeColor(piece.row + i, piece.col + i, pieceColor, board)) {
      moves.push({ row: piece.row + i, col: piece.col + i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board) && !moveExistsInOppositeColor(piece.row - i, piece.col - i, pieceColor, board)) {
      moves.push({ row: piece.row - i, col: piece.col - i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board) && !moveExistsInOppositeColor(piece.row + i, piece.col - i, pieceColor, board)) {
      moves.push({ row: piece.row + i, col: piece.col - i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board) && !moveExistsInOppositeColor(piece.row - i, piece.col + i, pieceColor, board)) {
      moves.push({ row: piece.row - i, col: piece.col + i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board) && !moveExistsInOppositeColor(piece.row + i, piece.col, pieceColor, board)) {
      moves.push({ row: piece.row + i, col: piece.col, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board) && !moveExistsInOppositeColor(piece.row - i, piece.col, pieceColor, board)) {
      moves.push({ row: piece.row - i, col: piece.col, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board) && !moveExistsInOppositeColor(piece.row, piece.col - i, pieceColor, board)) {
      moves.push({ row: piece.row, col: piece.col - i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board) && !moveExistsInOppositeColor(piece.row, piece.col + i, pieceColor, board)) {
      moves.push({ row: piece.row, col: piece.col + i, pieceColor: pieceColor })
    } else break
  }
  if (kingCanCastle(piece)) {
    if (!existsPieceInTheWayCol(board, piece.row, piece.col + 1, piece.col + 2)) { moves.push({ row: piece.row, col: piece.col + 2, pieceColor: pieceColor, attackMove: true, castleMove: true }) }
    if (!existsPieceInTheWayCol(board, piece.row, piece.col - 1, piece.col - 2))moves.push({ row: piece.row, col: piece.col - 2, pieceColor: pieceColor, attackMove: true, castleMove: true })
  }
  return moves
}

const kingCanCastle = (king: Piece) => {
  return king.amountMoves <= 0
}

export const kingIsChecked = (piece: Piece, board: Tile[], userColor: string) => {
  const allOpponentTiles = board.filter((tile: Tile) => {
    return tile.piece && tile.piece?.color !== userColor
  })
  const allOpponentMoves = []

  for (let i = 0; i < allOpponentTiles.length; i++) {
    if (allOpponentTiles[i].piece?.moves) { allOpponentMoves.push(...allOpponentTiles[i].piece?.moves!) }
  }

  const isChecked = allOpponentMoves.findIndex(x => x?.col === piece.col && x.row === piece.row) >= 0
  console.log(isChecked)
  return isChecked
}

export default getMoves
