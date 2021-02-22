import React, { useEffect } from 'react'

import './item-list.css'

const ItemList = ({ board, dragOverHandler, dragLeaveHandler, dragStartHandler, dragEndHandler, dropItemHandler }) => {

    return(
        <React.Fragment>
            {
                board.items.map((item, index) => {
                    return(
                    <div
                        onDragOver={e => dragOverHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={e => dragStartHandler(e, board, item)}
                        onDragEnd={e => dragEndHandler(e)}
                        onDrop={e => dropItemHandler(e, board, item)}
                        draggable={true} 
                        className="item"
                        key={ index }
                        >{ item.title }</div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default ItemList