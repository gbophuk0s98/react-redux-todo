import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageContainer from '../auth-components/auth-page-container'
import * as actions from '../../actoins'

import './pages.css'
import AuthContext from '../context'

const LoginPage = ({ user, authError, errors, form, loginHandler, changeForm, clearErrors, clearAuthError }) => {

    const auth = useContext(AuthContext)

    useEffect(() => clearErrors(), [clearErrors])
    useEffect(() => clearAuthError(), [clearAuthError])

    return (
        <PageContainer
            errorFromBackend={authError}
            errors={errors}
            btnHandler={() => {
                loginHandler(form)
                auth.login(user.id, user.token)
            }}
            changeForm={changeForm}
            title={'Авторизация'}
            btnText={'Авторизоваться'}
            link={'/register'}
            linkText={'Регистрация'}
            isRegister={false} 
        />
    )
}

const mapStateToProps = (state) => {
    return {
        form: state.form,
        errors: state.formErrors,
        authError: state.authError,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, loginHandler, clearErrors, clearAuthError } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        loginHandler: (form) => loginHandler(dispatch, form),
        clearErrors,
        clearAuthError
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)