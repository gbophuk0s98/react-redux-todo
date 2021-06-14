import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

import SuccessAlertWrapper from '../success-alert'
import ErrorAlertWrapper from '../error-alert'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Typography
} from '@material-ui/core'

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const ProjectDetailsDialog = ({ projectId, openDialog, handleClose, addParticipant, headers }) => {

    const [hasError, setHasError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState(null)
    const [email, setEmail] = useState(null)

    const emailHandler = e => {
        if (!reEmail.test(e.target.value)) {
            setHasError(true)
            setEmail(null)
            setEmailErrorText('Введите корректный email')
        }
        else {
            setHasError(false)
            setEmail(e.target.value)
            setEmailErrorText('')
        }
        if (e.target.value === '') {
            setHasError(false)
            setEmailErrorText('')
        }
    }

    const saveHandler = () => {
        if (!email) return
        addParticipant({ email: email, projectId: projectId, }, headers)
        handleClose()
    }

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">Настройки проекта</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={3}
                        >
                            <Typography>Добавить пользователя</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={3}
                        >
                            <TextField
                                error={hasError}
                                onChange={emailHandler}
                                helperText={emailErrorText}
                                fullWidth={true}
                                placeholder="Email"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={saveHandler}
                    >
                        Сохранить
                </Button>
                    <Button
                        color="primary"
                        onClick={handleClose}
                    >
                        Закрыть
                </Button>
                </DialogActions>
            </Dialog>
            <ErrorAlertWrapper />
            <SuccessAlertWrapper />
        </>
    )
}

const mapStateToProps = state => {
    return {
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`
        }
    }
}

const mapDispatchToProps = dispatch => {
    const { addParticipant } = bindActionCreators(actions, dispatch)
    return { addParticipant }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsDialog)