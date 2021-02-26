import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageContainer from '../auth-components/auth-page-container'
import * as actions from '../../actoins'

import './pages.css'

const LoginPage = ({ errors, form, loginHandler, changeForm, clearErrors }) => {

    useEffect(() => {
        clearErrors()
    }, [clearErrors])

    return (
        <PageContainer
            errors={errors}
            btnHandler={() => loginHandler(form)}
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
        errors: state.formErrors
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, loginHandler, clearErrors } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        loginHandler,
        clearErrors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)