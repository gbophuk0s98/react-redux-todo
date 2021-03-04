import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageContainer from '../auth-components/auth-page-container'
import * as actions from '../../actoins'

import './pages.css'

const RegPage = ({ authError, errors, form, changeForm, registerHandler, clearErrors, clearAuthError }) => {

    useEffect(() => clearErrors(), [clearErrors])
    useEffect(() => clearAuthError(), [clearAuthError])

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