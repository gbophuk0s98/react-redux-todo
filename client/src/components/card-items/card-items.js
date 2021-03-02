import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import './card-items.css'

export const CardItems = ({ items }) => {

    return (
        <>
        {items.map((item, index) => {
            return (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided, snapshot) => {
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