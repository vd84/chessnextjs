export type Move = {
    col: number,
    row: number,
    pieceColor: string,
    attackMove: boolean,
    castleMove?: boolean
    enPassantMove?: boolean
}

export type Piece = {
    pieceType: string,
    color: string,
    icon: any,
    col: number,
    row: number,
    id: number,
    moves: Move[]
    amountMoves: number
}

export type Tile = {
    col: number,
    color: string,
    id: number,
    piece?: Piece,
    row: number
}
