import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core'
import { connect } from 'react-redux'

import { projectUpdate, createCard, cardsLoaded } from '../../actoins'

import CardManagementItems from '../card-management-items'
import SuccessAlertWrapper from '../success-alert'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    width: '100%',
    height: '50%',
})

const sortCards = (cards, projectItems) => {
    return cards.sort((a, b) => {
        return projectItems.findIndex(({ id }) => id === a._id ) - projectItems.findIndex(({ id }) => id === b._id )
    })
}

const CardManagement = ({ headers, user, selectedProject, projectUpdate, createCard, cards, cardsLoaded }) => {

    const [items, setItems] = useState(selectedProject.cards || [])
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const history = useHistory()

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
        projectUpdate(selectedProject._id, reorderItems, headers)
    }

    const handleSubmit = () => {
        setOpen(false)
        createCard({ name: title, projectId: selectedProject._id }, headers)
        setTitle('')
    }

    const handleClose = () => {
        setTitle('')
        setOpen(false)
    }
    const handleOpen = () => setOpen(true)
    const handleChange = e => setTitle(e.target.value)


    return (
        <div style={{ width: '70%' }}>
            <div className="d-flex justify-content-end m-2">
                <Button
                    onClick={handleOpen}
                >
                    {'Добавить столбец...'}
                </Button>
                <Button
                    onClick={() => history.goBack()}
                >
                    {'Назад'}
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
                                <CardManagementItems
                                    key={item.id}
                                    items={items}
                                    item={item}
                                    index={index}
                                    selectedProjectId={selectedProject._id}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <SuccessAlertWrapper />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedProject: state.selectedProject,
        cards: state.cards.items,
        user: state.user,
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
    }
}

const matDispatchToProps = (dispatch) => {
    return {
        projectUpdate: (projectId, items, headers) => dispatch(projectUpdate(projectId, items, headers)),
        createCard: (objToBackend, headers) => dispatch(createCard(objToBackend, headers)),
        cardsLoaded: (cards) => dispatch(cardsLoaded(cards)),
    }
}


export default connect(mapStateToProps, matDispatchToProps)(CardManagement)