import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageContainer from '../auth-components/auth-page-container'
import * as actions from '../../actoins'
import AuthContext from '../../context'

import './pages.css'

const RegPage = ({ user, authError, errors, form, changeForm, registerHandler, clearErrors, clearAuthError }) => {

    const auth = useContext(AuthContext)

    useEffect(() => clearErrors(), [clearErrors])
    useEffect(() => clearAuthError(), [clearAuthError])
    useEffect(() => {
        if (!!user.token) auth.login(user.id, user.token, '')
    }, [user, auth])

    return (
        <PageContainer
            errorFromBackend={authError}
            errors={errors} 
            btnHandler={() => registerHandler(form)}
            changeForm={changeForm}
            title={'Регистрация'}
            btnText={'Зарегистрироваться'}
            link={'/login'}
            linkText={'Авторизоваться'}
            isRegister={true}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        form: state.form,
        errors: state.formErrors,
        authError: state.authError,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    
    const { changeForm, registerHandler, clearErrors, clearAuthError } = bindActionCreators(actions, dispatch)

    return {
        changeForm,
        registerHandler: (form) => registerHandler(dispatch, form),
        clearErrors,
        clearAuthError,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegPage)