import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import * as actions from '../../actoins'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ErrorAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const ErrorAlertWrapper = ({ universalError, clearUniversalError }) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (!!universalError) {
            setOpen(true)
            setMessage(universalError)
        }
        return () => clearUniversalError()
    }, [universalError, clearUniversalError])

    const onHandleClose = () => {
        setOpen(false)
        clearUniversalError()
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
        universalError: state.appMessages.universalError,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { clearUniversalError } = bindActionCreators(actions, dispatch)
    
    return { clearUniversalError }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlertWrapper)