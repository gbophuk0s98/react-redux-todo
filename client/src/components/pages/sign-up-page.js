import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useSnackbar } from 'notistack'
import ErrorAlertWrapper from '../error-alert'
import { Link } from 'react-router-dom'
import { makeStyles, Container, Typography, Box, TextField, Button, Avatar, Grid, CircularProgress } from '@material-ui/core'

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'gbophuk0s98© '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
)

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const variant = { variant: 'error' }

const SignUp = ({ user, errors, form, registerHandler, changeForm, clearErrors, formLoading }) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        console.log('errors', errors)
        if (errors.matchPassword) enqueueSnackbar(errors.matchPassword, variant)
        if (errors.password) enqueueSnackbar(errors.password, variant)
        if (errors.email) enqueueSnackbar(errors.email, variant)
        if (errors.userName) enqueueSnackbar(errors.userName, variant)
    }, [errors, enqueueSnackbar])

    useEffect(() => clearErrors(), [clearErrors])

    const handleSubmit = () => {
        registerHandler(form)
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Имя"
                        name="userName"
                        autoComplete="email"
                        autoFocus
                        onChange={changeForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={changeForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        onChange={changeForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="matchPassword"
                        label="Подтвердите пароль"
                        type="password"
                        onChange={changeForm}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        >
                        { formLoading  ? <CircularProgress color="inherit" /> : <>{'Создать аккаунт'}</>}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Или войдите в систему!"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={4}>
                <Copyright />
            </Box>
            <ErrorAlertWrapper />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        form: state.form,
        errors: state.formErrors,
        user: state.user,
        formLoading: state.formLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, registerHandler, clearErrors } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        clearErrors,
        registerHandler: (form) => registerHandler(dispatch, form)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)