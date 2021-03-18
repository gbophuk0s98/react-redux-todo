import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import { clearCardsError, clearCreateTodoError } from '../../actoins'
import { connect } from 'react-redux'

const ErrorAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ErrorAlertWrapper = ({
    cardsError, createTodoError,
    clearCardsError, clearCreateTodoError
}) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (!!cardsError) {
            setOpen(!!cardsError)
            setMessage(cardsError)
        }
        else if (!!createTodoError) {
            setOpen(!!createTodoError)
            setMessage(createTodoError)
        }
        
    }, [cardsError, createTodoError])

    const onHandleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
        clearCardsError()
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
        cardsError: state.cards.error,
        createTodoError: state.createTodoError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCardsError: () => dispatch(clearCardsError()),
        clearCreateTodoError: () => dispatch(clearCreateTodoError()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlertWrapper)