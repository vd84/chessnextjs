import { Piece, Tile } from '../components/main'

const allPossibleMoves: { col: number, row: number, userColor: string }[] = []

const existsNoPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return getPieceOnTile(row, col, board) === undefined
}

const getPieceOnTile = (row: number, col: number, board: Tile[]) => {
  return board.find(x => x.row === row && x.col === col)?.piece
}

const moveExistsInOppositeColor = (row: number, col: number, userColor: string) => {
  return allPossibleMoves.findIndex(x => x.col === col && x.row === row && x.userColor !== userColor) >= 0
}

const getMoves = (piece: Piece, board: any, userColor: string) => {
  switch (piece.pieceType) {
    case 'pawn':
      const pawnMoves = getPawnMoves(piece, board, userColor)
      allPossibleMoves.push(...pawnMoves)
      return pawnMoves;
    case 'rook':
      const rookMoves = getRookMoves(piece, board, userColor)
      allPossibleMoves.push(...rookMoves)
      return rookMoves
    case 'bishop':
      const bishopMoves = getBishopMoves(piece, board, userColor)
      allPossibleMoves.push(...bishopMoves)
      return bishopMoves;
    case 'king':
      const kingMoves = getKingMoves(piece, board, userColor)
      allPossibleMoves.push(...kingMoves)
      return kingMoves;
    case 'knight':
      const knightMoves = getKnightMoves(piece, board, userColor)
      allPossibleMoves.push(...knightMoves)
      return knightMoves;
    case 'queen':
      const queenMoves = [...getBishopMoves(piece, board, userColor), ...getRookMoves(piece, board, userColor)]
      allPossibleMoves.push(...queenMoves)
      return queenMoves;
    default:
      return []
    // code block
  }
}

const getPawnMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const m = userColor === 'white' ? 1 : -1
  const moves = []
  if (existsNoPieceOnTile(piece.row - 1 * m, piece.col, board)) {
    moves.push({ row: piece.row - 1 * m, col: piece.col, userColor: userColor })
  }
  if (piece.amountMoves === 0 && existsNoPieceOnTile(piece.row - 2, piece.col, board)) {
    moves.push({ row: piece.row - 2 * m, col: piece.col, userColor: userColor })
  }
  if (board[piece.id + 1 * m].piece?.pieceType === 'pawn' && board[piece.id + 1 * m].piece?.color !== userColor && board[piece.id + 1 * m].piece?.amountMoves === 1 * m) {
    moves.push({ row: piece.row - 1 * m, col: piece.col + 1 * m, userColor: userColor })
  }
  if (board[piece.id - 1 * m].piece?.pieceType === 'pawn' && board[piece.id - 1 * m].piece?.color !== userColor && board[piece.id + 1 * m].piece?.amountMoves === 1 * m) {
    moves.push({ row: piece.row - 1 * m, col: piece.col - 1 * m, userColor: userColor })
  }
  if (getPieceOnTile(piece.row - 1 * m, piece.col - 1 * m, board) && getPieceOnTile(piece.row - 1 * m, piece.col - 1 * m, board)?.color !== userColor) {
    moves.push({ row: piece.row - 1 * m, col: piece.col - 1 * m, userColor: userColor })
  }
  if (getPieceOnTile(piece.row - 1 * m, piece.col + 1 * m, board) && getPieceOnTile(piece.row - 1 * m, piece.col + 1 * m, board)?.color !== userColor) {
    moves.push({ row: piece.row - 1 * m, col: piece.col + 1 * m, userColor: userColor })
  }
  return moves
}

const getRookMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board)) {
      moves.push({ row: piece.row + i, col: piece.col, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board)) {
      moves.push({ row: piece.row - i, col: piece.col, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board)) {
      moves.push({ row: piece.row, col: piece.col - i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board)) {
      moves.push({ row: piece.row, col: piece.col + i, userColor: userColor })
    } else break
  }
  return moves
}

const getBishopMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const moves = []
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board)) {
      moves.push({ row: piece.row + i, col: piece.col + i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board)) {
      moves.push({ row: piece.row - i, col: piece.col - i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board)) {
      moves.push({ row: piece.row + i, col: piece.col - i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 8; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board)) {
      moves.push({ row: piece.row - i, col: piece.col + i, userColor: userColor })
    } else break
  }
  return moves
}

const getKnightMoves = (piece: Piece, board: Tile[], userColor: string) => {
  const moves = []
  moves.push({ row: piece.row + 2, col: piece.col + 1, userColor: userColor })
  moves.push({ row: piece.row + 2, col: piece.col - 1, userColor: userColor })
  moves.push({ row: piece.row - 2, col: piece.col + 1, userColor: userColor })
  moves.push({ row: piece.row - 2, col: piece.col - 1, userColor: userColor })
  moves.push({ row: piece.row - 1, col: piece.col - 2, userColor: userColor })
  moves.push({ row: piece.row - 1, col: piece.col + 2, userColor: userColor })
  moves.push({ row: piece.row + 1, col: piece.col + 2, userColor: userColor })
  moves.push({ row: piece.row + 1, col: piece.col - 2, userColor: userColor })

  return moves
}

const getKingMoves = (piece: Piece, board: any, userColor: string) => {
  const moves = []
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col + i, board) && !moveExistsInOppositeColor(piece.row + i, piece.col + i, userColor)) {
      moves.push({ row: piece.row + i, col: piece.col + i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col - i, board) && !moveExistsInOppositeColor(piece.row - i, piece.col - i, userColor)) {
      moves.push({ row: piece.row - i, col: piece.col - i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col - i, board) && !moveExistsInOppositeColor(piece.row + i, piece.col - i, userColor)) {
      moves.push({ row: piece.row + i, col: piece.col - i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col + i, board) && !moveExistsInOppositeColor(piece.row - i, piece.col + i, userColor)) {
      moves.push({ row: piece.row - i, col: piece.col + i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row + i < 8 && existsNoPieceOnTile(piece.row + i, piece.col, board) && !moveExistsInOppositeColor(piece.row + i, piece.col, userColor)) {
      moves.push({ row: piece.row + i, col: piece.col, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.row - i >= 0 && existsNoPieceOnTile(piece.row - i, piece.col, board) && !moveExistsInOppositeColor(piece.row - i, piece.col, userColor)) {
      moves.push({ row: piece.row - i, col: piece.col, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col - i >= 0 && existsNoPieceOnTile(piece.row, piece.col - i, board) && !moveExistsInOppositeColor(piece.row, piece.col - i, userColor)) {
      moves.push({ row: piece.row, col: piece.col - i, userColor: userColor })
    } else break
  }
  for (let i = 1; i < 2; i++) {
    if (piece.col + i < 8 && existsNoPieceOnTile(piece.row, piece.col + i, board) && !moveExistsInOppositeColor(piece.row, piece.col + i, userColor)) {
      moves.push({ row: piece.row, col: piece.col + i, userColor: userColor })
    } else break
  }


  return moves
}



const kingIsChecked = (piece: Piece) => {
  return piece.pieceType === 'king' && piece.moves.length <= 0
}

export default getMoves
