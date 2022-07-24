import { Piece, Tile } from '../components/types'

export const castleRook = async (
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
}
