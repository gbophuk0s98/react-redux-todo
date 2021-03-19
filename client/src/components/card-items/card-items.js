import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { FaArrowUp } from 'react-icons/fa'

import './card-items.css'

const CardItems = ({ items, projectKey, iconOptions }) => {
    
    const renderIcon = (priority) => {
        const [{styles}] = iconOptions.filter(option => option.value === priority)
        return <FaArrowUp style={{...styles}} />
    }

    return (
        <>
        {items.map(item => {

            return (
                <Draggable key={item.customId} draggableId={item.customId} index={item.posNumber}>
                    {(provided, snapshot) => {
                        return(
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                    backgroundColor: item.background,
                                    ...provided.draggableProps.style,
                                    border: snapshot.isDragging ? `2px solid rgba(140, 140, 140, 1)`: 'none',
                                    borderRadius: snapshot.isDragging ? '5px': '0px'
                                }}
                                className="card-items"
                            >
                                <div>{item.content}</div>
                                <div className="todo-info-wrapper">
                                    <div className="todo-info-icons">{renderIcon(item.priority)}</div>
                                    <div className="todo-key-number">{projectKey}-{item.creationNumber}</div>
                                </div>
                            </div>
                        )
                    }}
                </Draggable>
            )
        })}
        </>
    )
}

const mapStateTopProps = (state) => {
    return {
        projectKey: state.selectedProject.key,
        iconOptions: state.iconOptions,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateTopProps, mapDispatchToProps)(CardItems)