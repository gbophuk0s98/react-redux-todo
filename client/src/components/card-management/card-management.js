import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { projectUpdate } from '../../actoins'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 16,
    margin: `0 8px 0 0`,
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
})

const CardManagement = ({ selectedProject, projectUpdate }) => {

    const [items, setItems] = useState(selectedProject.cards)

    const onDragEnd = (result) => {

        if (!result.destination) return

        const reorderItems = reorder(
            items,
            result.source.index,
            result.destination.index
        )
        setItems(reorderItems)
        projectUpdate(selectedProject._id, reorderItems)
    }

    return (
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedProject: state.selectedProject
    }
}

const matDispatchToProps = (dispatch) => {
    return {
        // cardsLoaded: (newCards) => dispatch(cardsLoaded(newCards)),
        projectUpdate: (projectId, items) => projectUpdate(dispatch, projectId, items)
    }
}


export default connect(mapStateToProps, matDispatchToProps)(CardManagement)