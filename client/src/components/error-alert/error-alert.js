import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import { clearCreateTodoError, clearUpdateTodoError } from '../../actoins'
import { connect } from 'react-redux'

const ErrorAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ErrorAlertWrapper = ({
    updateTodoError, createTodoError,
    clearUpdateTodoError, clearCreateTodoError
}) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (!!updateTodoError) {
            setOpen(!!updateTodoError)
            setMessage(updateTodoError)
        }
        else if (!!createTodoError) {
            setOpen(!!createTodoError)
            setMessage(createTodoError)
        }
        
    }, [updateTodoError, createTodoError])

    const onHandleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
        clearUpdateTodoError()
        clearCreateTodoError()
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onHandleClose}
        >
            <ErrorAlert onClose={onHandleClose} severity="error">
                {message}
            </ErrorAlert>
        </Snackbar>
    )
}

const mapStateToProps = (state) => {
    return {
        updateTodoError: state.updateTodoError,
        createTodoError: state.createTodoError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearUpdateTodoError: () => dispatch(clearUpdateTodoError()),
        clearCreateTodoError: () => dispatch(clearCreateTodoError()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlertWrapper)