import React, { useState, useEffect } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

import * as actions from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const SuccessAlert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SuccessAlertWrapper = ({ universalMessage, clearUniversalMessage }) => {

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (universalMessage) {
            setOpen(true)
            setMessage(universalMessage)
        }
        return () => {
            clearUniversalMessage()
        }
    }, [clearUniversalMessage, universalMessage])

    const onHandleClose = (event, reason) => {
        setOpen(false)
        clearUniversalMessage()
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
        universalMessage: state.appMessages.universalMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    const { clearUniversalMessage } = bindActionCreators(actions, dispatch)

    return { clearUniversalMessage }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlertWrapper)