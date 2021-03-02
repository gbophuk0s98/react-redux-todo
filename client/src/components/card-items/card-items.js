import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import './card-items.css'

export const CardItems = ({ items }) => {

    return (
        <>
        {items.map((item, index) => {
            return (
                <Draggable key={item.customId} draggableId={item.customId} index={index}>
                    {(provided, snapshot) => {
                        console.log('item', item)
                        return(
                            <div
                                className="card-items"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                    backgroundColor: snapshot.isDragging ? '#263B4A': '#456C86',
                                    ...provided.draggableProps.style
                                }}
                            >
                                {item.content}
                            </div>
                        )
                    }}
                </Draggable>
            )
        })}
        </>
    )
}