
const getMoves = (piece: { pieceType?: string; icon?: any; col: number; row: number; id?: number }, board: any) => {
  const moves = [{ row: piece.row + 1, col: piece.col }, { row: piece.row + 2, col: piece.col }]
  console.log(moves)
}

export default getMoves
