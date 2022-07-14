import bd from '../public/pieces/bd.svg'
import bl from '../public/pieces/bl.svg'
import kd from '../public/pieces/kd.svg'
import kl from '../public/pieces/kl.svg'
import nd from '../public/pieces/nd.svg'
import nl from '../public/pieces/nl.svg'
import pd from '../public/pieces/pd.svg'
import pl from '../public/pieces/pl.svg'
import qd from '../public/pieces/qd.svg'
import ql from '../public/pieces/ql.svg'
import rd from '../public/pieces/rd.svg'
import rl from '../public/pieces/rl.svg'

const createPiece = (pieceType, color, icon, col, row, id) => {
  return {
    pieceType: pieceType, color: color, icon: icon, col: col, row: row, id: id, moves: [], amountMoves: 0
  }
}
const createListDuplicatedPieces = (pieceType, color, icon, row, id, amount) => {
  console.log(color)
  const pieces = []
  for (let i = 0; i < amount; i++) {
    pieces.push(createPiece(pieceType, color, icon, i, row, id))
  }
  return pieces
}

const blackForwards =
    [{ pieceType: 'rook', color: 'black', icon: rd, col: 0, row: 0, id: 0, moves: [], amountMoves: 0 },
      { pieceType: 'knight', color: 'black', icon: nd, col: 1, row: 0, id: 1, moves: [], amountMoves: 0 },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 2, row: 0, id: 2, moves: [], amountMoves: 0 },
      { pieceType: 'queen', color: 'black', icon: qd, col: 3, row: 0, id: 3, moves: [], amountMoves: 0 },
      { pieceType: 'king', color: 'black', icon: kd, col: 4, row: 0, id: 4, moves: [], amountMoves: 0 },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 5, row: 0, id: 5, moves: [], amountMoves: 0 },
      { pieceType: 'knight', color: 'black', icon: nd, col: 6, row: 0, id: 6, moves: [], amountMoves: 0 },
      { pieceType: 'rook', color: 'black', icon: rd, col: 7, row: 0, id: 7, moves: [], amountMoves: 0 }]

const blackPawns = createListDuplicatedPieces('pawn', 'black', pd, 6, 48, 8)

const whitePawns = createListDuplicatedPieces('pawn', 'white', pl, 0, 6, 48, 8)

const whiteForwards =
    [{ pieceType: 'rook', color: 'white', icon: rl, col: 0, row: 7, id: 56, moves: [], amountMoves: 0 },
      { pieceType: 'knight', color: 'white', icon: nl, col: 1, row: 7, id: 57, moves: [], amountMoves: 0 },
      { pieceType: 'bishop', color: 'white', icon: bl, col: 2, row: 7, id: 58, moves: [], amountMoves: 0 },
      { pieceType: 'queen', color: 'white', icon: ql, col: 3, row: 7, id: 59, moves: [], amountMoves: 0 },
      { pieceType: 'king', color: 'white', icon: kl, col: 4, row: 7, id: 60, moves: [], amountMoves: 0 },
      { pieceType: 'bishop', color: 'white', icon: bl, col: 5, row: 7, id: 61, moves: [], amountMoves: 0 },
      { pieceType: 'knight', color: 'white', icon: nl, col: 6, row: 7, id: 62, moves: [], amountMoves: 0 },
      { pieceType: 'rook', color: 'white', icon: rl, col: 7, row: 7, id: 63, moves: [], amountMoves: 0 }]

export { bd, bl, kd, kl, nd, nl, pd, pl, qd, ql, rd, rl, blackForwards, blackPawns, whitePawns, whiteForwards }
