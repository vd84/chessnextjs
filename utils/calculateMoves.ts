import { Piece, Tile } from '../components/main'

const allPossibleMoves: { col: number, row: number, pieceColor: string, attackMove: boolean, castleMove?: boolean }[] = []

const existsNoPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return getPieceOnTile(row, col, board) === undefined
}

const getPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return board.find(x => x.row === row && x.col === col)?.piece
}

const attackMoveExistsInOppositeColor = (row: number, col: number, userColor: string) => {
  return allPossibleMoves.findIndex(x => x.col === col && x.row === row && x.pieceColor !== userColor && x.attackMove) >= 0
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
      allPossibleMoves.push(...pawnMoves)
      return pawnMoves
    case 'rook':
      const rookMoves = getRookMoves(piece, board, piece.color)
      allPossibleMoves.push(...rookMoves)
      return rookMoves
    case 'bishop':
      const bishopMoves = getBishopMoves(piece, board, piece.color)
      allPossibleMoves.push(...bishopMoves)
      return bishopMoves
    case 'king':
      const kingMoves = getKingMoves(piece, board, piece.color)
      allPossibleMoves.push(...kingMoves)
      return kingMoves
    case 'knight':
      const knightMoves = getKnightMoves(piece, board, piece.color)
      allPossibleMoves.push(...knightMoves)
      return knightMoves
    case 'queen':
      const queenMoves = [...getBishopMoves(piece, board, piece.color), ...getRookMoves(piece, board, userColor)]
      allPossibleMoves.push(...queenMoves)
      return queenMoves
    default:
      return []
    // code block
  }
}

const getPawnMoves = (piece: Piece, board: Tile[], userColor: string, pieceColor: string) => {
  const m = piece.color === 'white' ? 1 : -1

  const moves: { col: number, row: number, pieceColor: string, attackMove: boolean }[] = []
  if (existsNoPieceOnTile(piece.row - 1 * m, piece.col, board)) {
    moves.push({ row: piece.row - 1 * m, col: piece.col, pieceColor: pieceColor, attackMove: false })
  }
  if (piece.amountMoves === 0 && existsNoPieceOnTile(piece.row - 2 * m, piece.col, board)) {
    moves.push({ row: piece.row - 2 * m, col: piece.col, pieceColor: pieceColor, attackMove: false })
  }
  if (board[piece.id + 1].piece?.pieceType === 'pawn' && board[piece.id + 1].piece?.color !== userColor && board[piece.id + 1].piece?.amountMoves === 1) {
    moves.push({ row: piece.row - 1 * m, col: piece.col + 1, pieceColor: pieceColor, attackMove: false })
  }
  if (board[piece.id - 1].piece?.pieceType === 'pawn' && board[piece.id - 1].piece?.color !== userColor && board[piece.id + 1].piece?.amountMoves === 1) {
    moves.push({ row: piece.row - 1 * m, col: piece.col - 1, pieceColor: pieceColor, attackMove: false })
  }
  moves.push({ row: piece.row - 1 * m, col: piece.col - 1, pieceColor: pieceColor, attackMove: true })

  moves.push({ row: piece.row - 1 * m, col: piece.col + 1, pieceColor: pieceColor, attackMove: true })

  return moves
}

const getRookMoves = (piece: Piece, board: Tile[], pieceColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board)) {
      moves.push({ row: piece.row + i, col: piece.col, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board)) {
      moves.push({ row: piece.row - i, col: piece.col, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board)) {
      moves.push({ row: piece.row, col: piece.col - i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board)) {
      moves.push({ row: piece.row, col: piece.col + i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  return moves
}

const getBishopMoves = (piece: Piece, board: Tile[], pieceColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board)) {
      moves.push({ row: piece.row + i, col: piece.col + i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board)) {
      moves.push({ row: piece.row - i, col: piece.col - i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board)) {
      moves.push({ row: piece.row + i, col: piece.col - i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board)) {
      moves.push({ row: piece.row - i, col: piece.col + i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  return moves
}

const getKnightMoves = (piece: Piece, board: Tile[], pieceColor: string) => {
  const moves = []
  moves.push({ row: piece.row + 2, col: piece.col + 1, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row + 2, col: piece.col - 1, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row - 2, col: piece.col + 1, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row - 2, col: piece.col - 1, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row - 1, col: piece.col - 2, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row - 1, col: piece.col + 2, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row + 1, col: piece.col + 2, pieceColor: pieceColor, attackMove: true })
  moves.push({ row: piece.row + 1, col: piece.col - 2, pieceColor: pieceColor, attackMove: true })

  return moves
}

const getKingMoves = (piece: Piece, board: any, pieceColor: string) => {
  const moves = []
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board) && !attackMoveExistsInOppositeColor(piece.row + i, piece.col + i, pieceColor)) {
      moves.push({ row: piece.row + i, col: piece.col + i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board) && !attackMoveExistsInOppositeColor(piece.row - i, piece.col - i, pieceColor)) {
      moves.push({ row: piece.row - i, col: piece.col - i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board) && !attackMoveExistsInOppositeColor(piece.row + i, piece.col - i, pieceColor)) {
      moves.push({ row: piece.row + i, col: piece.col - i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board) && !attackMoveExistsInOppositeColor(piece.row - i, piece.col + i, pieceColor)) {
      moves.push({ row: piece.row - i, col: piece.col + i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board) && !attackMoveExistsInOppositeColor(piece.row + i, piece.col, pieceColor)) {
      moves.push({ row: piece.row + i, col: piece.col, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board) && !attackMoveExistsInOppositeColor(piece.row - i, piece.col, pieceColor)) {
      moves.push({ row: piece.row - i, col: piece.col, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board) && !attackMoveExistsInOppositeColor(piece.row, piece.col - i, pieceColor)) {
      moves.push({ row: piece.row, col: piece.col - i, pieceColor: pieceColor, attackMove: true })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board) && !attackMoveExistsInOppositeColor(piece.row, piece.col + i, pieceColor)) {
      moves.push({ row: piece.row, col: piece.col + i, pieceColor: pieceColor, attackMove: true })
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

const kingIsChecked = (piece: Piece) => {
  return piece.pieceType === 'king' && piece.moves.length <= 0
}

export default getMoves
