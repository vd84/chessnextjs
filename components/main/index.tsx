import React from 'react'

function MainComp () {
  const createBoard = () => {
    const board = []
    for (let i = 0; i < 64; i++) {
      board.push({ color: 'black' })
    }
    return board
  }

  const getColorTile = (tileId: number) => {
    const col = tileId % 8 + 1
    const row = Math.floor(tileId / 8) + 1
    return (col % 2) === (row % 2) ? 'bg-black' : 'bg-white'
  }

  return (
    <div className='parent-container'>
        <div className='container'>
        <div className="board-wrapper place-items-center" >
        {

            createBoard().map((tile, idx) => {
              getColorTile(idx)
              return <div key={idx} className={getColorTile(idx) + ' tile w-full bg-black' } color='tile.color' />
            }
            )
        }
        </div>
        <style jsx>
            {`
            .parent-container{
                display:flex;
                justify-content:center;
            }
            .board-wrapper {
                display: grid;
                grid-template-columns: repeat(8,1fr);
                grid-template-rows: repeat(8, 1fr);
                justify-content: center;
                margin: 30px 30px
            }
            .tile{
                aspect-ratio: 1;
            }
            `}
        </style>
        </div>
    </div>
  )
}

export default MainComp
