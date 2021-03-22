import React, { useEffect } from 'react'
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

const SingIn = ({ user, errors, form, loginHandler, changeForm, clearErrors, formLoading }) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        if (errors.password) enqueueSnackbar(errors.password, { variant: 'error'})
        if (errors.email) enqueueSnackbar(errors.email, { variant: 'error'})
    }, [errors, enqueueSnackbar])

    useEffect(() => clearErrors(), [clearErrors])

    const handleSubmit = () => loginHandler(form)

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <div className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Почта"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={form.email || ''}
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
                        value={form.password || ''}
                        onChange={changeForm}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        >
                        { formLoading  ? <CircularProgress color="inherit" /> : <>{'Войти'}</>}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Нет аккаунта? Зарегистрируйтесь!"}
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
        errors: state.form.formErrors,
        user: state.user,
        formLoading: state.form.formLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, clearErrors } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        clearErrors,
        loginHandler: (form) => dispatch(actions.loginHandler(form))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingIn)