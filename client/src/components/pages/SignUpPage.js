import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useSnackbar } from 'notistack'
import ErrorAlertWrapper from '../error-alert'
import GoogleLoginWrapper from '../google-login'
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
    googleBtn: {
        border: '1px solid red',
        width: '100%',
    },
}))

const variant = { variant: 'error' }

const SignUp = ({ errors, form, registerHandler, changeSignUpForm, formLoading, googleLogin, clearSignUpFormErrors, clearForms }) => {

    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => clearForms(), [])

    useEffect(() => {
        if (errors.matchPassword) enqueueSnackbar(errors.matchPassword, variant)
        if (errors.password) enqueueSnackbar(errors.password, variant)
        if (errors.email) enqueueSnackbar(errors.email, variant)
        if (errors.userName) enqueueSnackbar(errors.userName, variant)
        if (JSON.stringify(errors) !== '{}') clearSignUpFormErrors()
    }, [errors, enqueueSnackbar])


    const handleSubmit = () => registerHandler(form)

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
                        value={form.userName || ''}
                        onChange={changeSignUpForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        value={form.email || ''}
                        onChange={changeSignUpForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        value={form.password || ''}
                        onChange={changeSignUpForm}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="matchPassword"
                        label="Подтвердите пароль"
                        type="password"
                        value={form.matchPassword || ''}
                        onChange={changeSignUpForm}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        {formLoading ? <CircularProgress size={24} color="inherit" /> : <>{'Создать аккаунт'}</>}
                    </Button>
                </div>
            </div>
            <Box style={{ marginBottom: '5px' }}>
                <GoogleLoginWrapper />
            </Box>
            <Grid container>
                <Grid item>
                    <Link to="/login" variant="body2">
                        {"Или войдите в систему!"}
                    </Link>
                </Grid>
            </Grid>
            <ErrorAlertWrapper />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        form: state.form.signUpForm.form,
        errors: state.form.signUpForm.formErrors,
        formLoading: state.form.signUpForm.formLoading,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeSignUpForm, googleLogin, clearSignUpFormErrors, clearForms } = bindActionCreators(actions, dispatch)
    return {
        changeSignUpForm,
        clearSignUpFormErrors,
        clearForms,
        registerHandler: (form) => dispatch(actions.registerHandler(form)),
        googleLogin,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)