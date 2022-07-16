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

const blackForwards =
    [{ pieceType: 'rook', color: 'black', icon: rd, col: 0, row: 0, id: 0, moves: [], amountMoves: 0 },
      { pieceType: 'knight', color: 'black', icon: nd, col: 1, row: 0, id: 1, moves: [], amountMoves: 0 },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 2, row: 0, id: 2, moves: [], amountMoves: 0 },
      { pieceType: 'queen', color: 'black', icon: qd, col: 3, row: 0, id: 3, moves: [], amountMoves: 0 },
      { pieceType: 'king', color: 'black', icon: kd, col: 4, row: 0, id: 4, moves: [], amountMoves: 0 },
      { pieceType: 'bishop', color: 'black', icon: bd, col: 5, row: 0, id: 5, moves: [], amountMoves: 0 },
      { pieceType: 'knight', color: 'black', icon: nd, col: 6, row: 0, id: 6, moves: [], amountMoves: 0 },
      { pieceType: 'rook', color: 'black', icon: rd, col: 7, row: 0, id: 7, moves: [], amountMoves: 0 }]

const blackPawns =
    [{ pieceType: 'pawn', color: 'black', icon: pd, col: 0, row: 1, id: 8, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 1, row: 1, id: 9, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 2, row: 1, id: 10, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 3, row: 1, id: 11, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 4, row: 1, id: 12, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 5, row: 1, id: 13, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 6, row: 1, id: 14, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'black', icon: pd, col: 7, row: 1, id: 15, moves: [], amountMoves: 0 }]

const whitePawns =
    [{ pieceType: 'pawn', color: 'white', icon: pl, col: 0, row: 6, id: 48, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 1, row: 6, id: 49, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 2, row: 6, id: 50, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 3, row: 6, id: 51, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 4, row: 6, id: 52, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 5, row: 6, id: 53, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 6, row: 6, id: 54, moves: [], amountMoves: 0 },
      { pieceType: 'pawn', color: 'white', icon: pl, col: 7, row: 6, id: 55, moves: [], amountMoves: 0 }]

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
