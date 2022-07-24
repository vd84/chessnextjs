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

const getMoves = (tile: Tile, board: Tile[], userColor: string) => {
  if (!tile.piece) return []

  switch (tile?.piece?.pieceType) {
    case 'pawn':
      return getPawnMoves(tile, board, userColor, tile?.piece.color)
    case 'rook':
      return getRookMoves(tile, board, tile?.piece.color)
    case 'bishop':
      return getBishopMoves(tile, board, tile?.piece.color)
    case 'king':
      return getKingMoves(tile, board, tile?.piece.color)
    case 'knight':
      return getKnightMoves(tile, board, tile?.piece.color)
    case 'queen':
      return [...getBishopMoves(tile, board, tile?.piece.color), ...getRookMoves(tile, board, userColor)]
    default:
      return []
    // code block
  }
}

const getPawnMoves = (tile: Tile, board: Tile[], userColor: string, pieceColor: string) => {
  const m = tile.piece?.color === 'white' ? 1 : -1

  if (!tile.piece) return []

  const moves: Move[] = []
  if (existsNoPieceOnTile(tile.piece?.row - 1 * m, tile.piece?.col, board)) {
    moves.push({ row: tile?.piece?.row - 1 * m, col: tile.piece?.col, pieceColor: pieceColor, attackMove: false })
  }
  if (tile.piece?.amountMoves === 0 && existsNoPieceOnTile(tile.piece?.row - 2 * m, tile.piece?.col, board)) {
    moves.push({ row: tile.piece?.row - 2 * m, col: tile.piece?.col, pieceColor: pieceColor, attackMove: false })
  }
  if (board[tile?.id + 1].piece?.pieceType === 'pawn' && board[tile?.id + 1].piece?.color !== userColor && board[tile?.id + 1].piece?.amountMoves === 1) {
    moves.push({ row: tile.piece?.row - 1 * m, col: tile.piece?.col + 1, pieceColor: pieceColor, attackMove: false, enPassantMove: true })
  }
  if (board[tile?.id - 1].piece?.pieceType === 'pawn' && board[tile?.id - 1].piece?.color !== userColor && board[tile?.id - 1].piece?.amountMoves === 1) {
    moves.push({ row: tile.piece?.row - 1 * m, col: tile.piece?.col - 1, pieceColor: pieceColor, attackMove: false, enPassantMove: true })
  }
  moves.push({ row: tile.piece?.row - 1 * m, col: tile.piece?.col - 1, pieceColor: pieceColor, attackMove: true })

  moves.push({ row: tile.piece?.row - 1 * m, col: tile.piece?.col + 1, pieceColor: pieceColor, attackMove: true })

  return moves
}

const getRookMoves = (tile: Tile, board: Tile[], pieceColor: string) => {
  if (!tile.piece) return []

  const moves = []
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row + i, tile.piece?.col, board)) {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row - i, tile.piece?.col, board)) {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row, tile.piece?.col - i, board)) {
      moves.push({ row: tile.piece?.row, col: tile.piece?.col - i, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row, col: tile.piece?.col - i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row, tile.piece?.col + i, board)) {
      moves.push({ row: tile.piece?.row, col: tile.piece?.col + i, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row, col: tile.piece?.col + i, pieceColor: pieceColor })
      break
    }
  }
  return moves
}

const getBishopMoves = (tile: Tile, board: Tile[], pieceColor: string) => {
  if (!tile.piece) return []

  const moves = []
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row + i, tile.piece?.col + i, board)) {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col + i, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col + i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row - i, tile.piece?.col - i, board)) {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col - i, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col - i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row + i, tile.piece?.col - i, board)) {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col - i, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col - i, pieceColor: pieceColor })
      break
    }
  }
  for (let i = 1; i < 8; i++) {
    if (existsNoPieceOnTile(tile.piece?.row - i, tile.piece?.col + i, board)) {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col + i, pieceColor: pieceColor })
    } else {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col + i, pieceColor: pieceColor })
      break
    }
  }
  return moves
}

const getKnightMoves = (tile: Tile, board: Tile[], pieceColor: string) => {
  if (!tile.piece) return []

  const moves = []
  moves.push({ row: tile.piece?.row + 2, col: tile.piece?.col + 1, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row + 2, col: tile.piece?.col - 1, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row - 2, col: tile.piece?.col + 1, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row - 2, col: tile.piece?.col - 1, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row - 1, col: tile.piece?.col - 2, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row - 1, col: tile.piece?.col + 2, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row + 1, col: tile.piece?.col + 2, pieceColor: pieceColor })
  moves.push({ row: tile.piece?.row + 1, col: tile.piece?.col - 2, pieceColor: pieceColor })

  return moves
}

const getKingMoves = (tile: Tile, board: any, pieceColor: string) => {
  if (!tile.piece) return []

  const moves = []
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.row + i < 8 && existsNoPieceOnTile(tile.piece?.row + i, tile.piece?.col + i, board) && !moveExistsInOppositeColor(tile.piece?.row + i, tile.piece?.col + i, pieceColor, board)) {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col + i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.row - i >= 0 && existsNoPieceOnTile(tile.piece?.row - i, tile.piece?.col - i, board) && !moveExistsInOppositeColor(tile.piece?.row - i, tile.piece?.col - i, pieceColor, board)) {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col - i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.row + i < 8 && existsNoPieceOnTile(tile.piece?.row + i, tile.piece?.col - i, board) && !moveExistsInOppositeColor(tile.piece?.row + i, tile.piece?.col - i, pieceColor, board)) {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col - i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.row - i >= 0 && existsNoPieceOnTile(tile.piece?.row - i, tile.piece?.col + i, board) && !moveExistsInOppositeColor(tile.piece?.row - i, tile.piece?.col + i, pieceColor, board)) {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col + i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.row + i < 8 && existsNoPieceOnTile(tile.piece?.row + i, tile.piece?.col, board) && !moveExistsInOppositeColor(tile.piece?.row + i, tile.piece?.col, pieceColor, board)) {
      moves.push({ row: tile.piece?.row + i, col: tile.piece?.col, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.row - i >= 0 && existsNoPieceOnTile(tile.piece?.row - i, tile.piece?.col, board) && !moveExistsInOppositeColor(tile.piece?.row - i, tile.piece?.col, pieceColor, board)) {
      moves.push({ row: tile.piece?.row - i, col: tile.piece?.col, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.col - i >= 0 && existsNoPieceOnTile(tile.piece?.row, tile.piece?.col - i, board) && !moveExistsInOppositeColor(tile.piece?.row, tile.piece?.col - i, pieceColor, board)) {
      moves.push({ row: tile.piece?.row, col: tile.piece?.col - i, pieceColor: pieceColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (tile.piece?.col + i < 8 && existsNoPieceOnTile(tile.piece?.row, tile.piece?.col + i, board) && !moveExistsInOppositeColor(tile.piece?.row, tile.piece?.col + i, pieceColor, board)) {
      moves.push({ row: tile.piece?.row, col: tile.piece?.col + i, pieceColor: pieceColor })
    } else break
  }
  if (kingCanCastle(tile.piece)) {
    if (!existsPieceInTheWayCol(board, tile.piece?.row, tile.piece?.col + 1, tile.piece?.col + 2)) { moves.push({ row: tile.piece?.row, col: tile.piece?.col + 2, pieceColor: pieceColor, attackMove: true, castleMove: true }) }
    if (!existsPieceInTheWayCol(board, tile.piece?.row, tile.piece?.col - 1, tile.piece?.col - 2))moves.push({ row: tile.piece?.row, col: tile.piece?.col - 2, pieceColor: pieceColor, attackMove: true, castleMove: true })
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

  const isChecked = allOpponentMoves.findIndex(x => x?.col === piece?.col && x.row === piece?.row) >= 0
  return isChecked
}

export default getMoves
