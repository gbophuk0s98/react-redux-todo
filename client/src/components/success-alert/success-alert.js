import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import * as actions from '../../actoins'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const SuccessAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SuccessAlertWrapper = ({ clearCardTitleMessage, titleUpdatedMessage, todoUpdatedMessage, clearUpdateTodoMessage, createTodoMessage, clearCreateTodoMessage }) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (titleUpdatedMessage) {
            setOpen(true)
            setMessage(titleUpdatedMessage)
        } else if (todoUpdatedMessage) {
            setOpen(true)
            setMessage(todoUpdatedMessage)
        } else if (createTodoMessage) {
            setOpen(true)
            setMessage(createTodoMessage)
        }
        return () => {
            clearCardTitleMessage()
            clearUpdateTodoMessage()
            clearCreateTodoMessage()
        }
    }, [titleUpdatedMessage, todoUpdatedMessage, clearCardTitleMessage, clearUpdateTodoMessage, createTodoMessage, clearCreateTodoMessage])

    const onHandleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
        clearCardTitleMessage()
        clearUpdateTodoMessage()
        clearCreateTodoMessage()
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onHandleClose}
        >
            <SuccessAlert onClose={onHandleClose} severity="success">
                {message}
            </SuccessAlert>
        </Snackbar>
    )
}

const mapStateToProps = (state) => {
    return {
        titleUpdatedMessage: state.appMessages.cardTitleUpdated.message,
        todoUpdatedMessage: state.appMessages.todoUpdated.message,
        createTodoMessage: state.appMessages.todoCreated.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { clearCardTitleMessage, clearUpdateTodoMessage, clearCreateTodoMessage } = bindActionCreators(actions, dispatch)
    
    return { clearCardTitleMessage, clearUpdateTodoMessage, clearCreateTodoMessage }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlertWrapper)