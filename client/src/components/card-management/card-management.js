import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { projectUpdate, createCard, deleteCard, cardsLoaded } from '../../actoins'
import { Card, CardContent, Button, Dialog, DialogActions, DialogContent, TextField, makeStyles, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '2px 5px',
    margin: `0 8px 0 0`,
    maxWidth: '400px',
    width: '100%',
    ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    width: '100%',
    height: '50%',
})

const useStyles = makeStyles({
    cardContent: {
        padding: 0
    }
})

const sortCards = (cards, projectItems) => {
    return cards.sort((a, b) => {
        return projectItems.findIndex(({ id }) => id === a._id ) - projectItems.findIndex(({ id }) => id === b._id )
    })
}

const CardManagement = ({ selectedProject, projectUpdate, createCard, deleteCard, cards, cardsLoaded }) => {

    const [items, setItems] = useState(selectedProject.cards || [])
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const classes = useStyles()

    useEffect(() => setItems(selectedProject.cards), [selectedProject])

    const onDragEnd = (result) => {

        if (!result.destination) return

        const reorderItems = reorder(
            items,
            result.source.index,
            result.destination.index
        )
        setItems(reorderItems)        
        cardsLoaded(sortCards(cards, reorderItems))
        projectUpdate(selectedProject._id, reorderItems)
    }

    const handleSubmit = () => {
        setOpen(false)
        createCard({ name: title, projectId: selectedProject._id })
        setTitle('')
    }

    const handleClose = () => {
        setTitle('')
        setOpen(false)
    }
    const handleOpen = () => setOpen(true)
    const handleChange = e => setTitle(e.target.value)
    const handleDelete = (id, index) => {
        const myArr = [
            ...items.slice(0, index),
            ...items.slice(index + 1)
        ]
        deleteCard({ cardId: id, projectId: selectedProject._id }, myArr)
    }

    return (
        <div style={{ width: '70%' }}>
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
                                            <CardContent className={classes.cardContent}>
                                                <div className="text-right">
                                                    <IconButton
                                                        onClick={() => handleDelete(item.id, index)}
                                                        edge="end"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                                <TextField
                                                    value={item.name}
                                                    style={{ marginBottom: '15px', width: '100%' }}
                                                />
                                                <Divider />
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
        selectedProject: state.selectedProject,
        cards: state.cards.items
    }
}

const matDispatchToProps = (dispatch) => {
    return {
        projectUpdate: (projectId, items) => dispatch(projectUpdate(projectId, items)),
        createCard: (objToBackend) => dispatch(createCard(objToBackend)),
        deleteCard: (objToBackend, projectItems) => dispatch(deleteCard(objToBackend, projectItems)),
        cardsLoaded: (cards) => dispatch(cardsLoaded(cards)),
    }
}


export default connect(mapStateToProps, matDispatchToProps)(CardManagement)