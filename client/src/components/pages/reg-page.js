import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PageContainer from '../auth-components/auth-page-container'
import * as actions from '../../actoins'

import './pages.css'

const RegPage = ({ errors, form, changeForm, registerHandler, clearErrors }) => {

    useEffect(() => {
        clearErrors()
    }, [clearErrors])

    return (
        <PageContainer
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
    }
}

const mapDispatchToProps = (dispatch) => {
    
    const { changeForm, registerHandler, clearErrors } = bindActionCreators(actions, dispatch)

    return {
        changeForm,
        registerHandler,
        clearErrors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegPage)