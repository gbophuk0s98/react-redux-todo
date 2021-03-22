import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import * as actions from '../../actoins'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ErrorAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ErrorAlertWrapper = ({
    updateTodoError, createTodoError, signInAuthError, signUpAuthError,
    clearUpdateTodoError, clearCreateTodoError, clearAuthError
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
        } else if (signInAuthError) {
            setOpen(true)
            setMessage(signInAuthError)
        } else if (signUpAuthError) {
            setOpen(!!signUpAuthError)
            setMessage(signUpAuthError)
        }
        
    }, [updateTodoError, createTodoError, signInAuthError, signUpAuthError])

    const onHandleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setOpen(false)
        clearUpdateTodoError()
        clearCreateTodoError()
        clearAuthError()
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
        updateTodoError: state.appErrors.updateTodoError,
        createTodoError: state.appErrors.createTodoError,
        signInAuthError: state.form.signInForm.authError,
        signUpAuthError: state.form.signUpForm.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { clearAuthError, clearCreateTodoError, clearUpdateTodoError } = bindActionCreators(actions, dispatch)
    
    return { clearUpdateTodoError ,clearCreateTodoError, clearAuthError }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlertWrapper)