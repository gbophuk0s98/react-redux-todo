import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { projectUpdate, createCard } from '../../actoins'
import { Card, CardContent, Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core'

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
    maxWidth: '300px',
    width: '100%',
    background: isDragging ? 'lightgreen' : 'grey',
    ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    height: '50%',
})

const CardManagement = ({ selectedProject, projectUpdate, createCard }) => {

    const [items, setItems] = useState(selectedProject.cards || [])
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')

    useEffect(() => setItems(selectedProject.cards), [selectedProject])

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
    
    const handleSubmit = () => {
        setOpen(false)
        createCard({ name: title, projectId: selectedProject._id })
    }

    const handleClose = () => {
        setTitle('')
        setOpen(false)
    }
    const handleOpen = () => setOpen(true)
    const handleChange = e => setTitle(e.target.value)

    return (
        <div>
        <div className="d-flex justify-content-end m-2">
            <Button
                onClick={handleOpen}
            >
                Добавить столбец...
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <TextField 
                        label="Название столбца"
                        value={title}
                        onChange={(e) => handleChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                    >
                        Добавить
                    </Button>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
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
                                <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                    )}
                                >
                                <CardContent>
                                {item.name}
                                </CardContent>
                                </Card>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedProject: state.selectedProject
    }
}

const matDispatchToProps = (dispatch) => {
    return {
        projectUpdate: (projectId, items) => projectUpdate(dispatch, projectId, items),
        createCard: (objToBackend) => createCard(dispatch, objToBackend),
    }
}


export default connect(mapStateToProps, matDispatchToProps)(CardManagement)