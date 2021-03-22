import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import { Card, CardContent, TextField, makeStyles, IconButton } from '@material-ui/core'

import { deleteCard, updateCardTitle } from '../../actoins'

const useStyles = makeStyles({
    cardContent: {
        padding: 0
    }
})

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '2px 5px',
    margin: `0 8px 0 0`,
    maxWidth: '400px',
    width: '100%',
    ...draggableStyle,
})

const CardManagementItems = ({ items, item, index, selectedProjectId, deleteCard, updateCardTitle }) => {

    const classes = useStyles()
    const [title, setTitle] = useState(item.name)

    const handleDelete = (id, index) => {
        const myArr = [
            ...items.slice(0, index),
            ...items.slice(index + 1)
        ]
        deleteCard({ cardId: id, projectId: selectedProjectId }, myArr)
    }

    const handleOnBlur = () => {
        if (item.name !== title) {
            const objToBackend = {
                cardId: item.id,
                projectId: selectedProjectId,
                title: title,
            }
            updateCardTitle(objToBackend)
        }
    }

    return (
        <Draggable draggableId={item.id} index={index}>
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleOnBlur}
                            style={{ marginBottom: '15px', width: '100%' }}
                        />
                        <Divider />
                    </CardContent>
                </Card>
            )}
        </Draggable>
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCard: (objToBackend, projectItems) => dispatch(deleteCard(objToBackend, projectItems)),
        updateCardTitle: (objToBackend) => dispatch(updateCardTitle(objToBackend))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardManagementItems)