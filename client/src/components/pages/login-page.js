import React from 'react'

import { PageContainer } from '../auth-components/auth-page-container'
import { useForm } from '../../hooks/useForm'

import './pages.css'

export const LoginPage = () => {

    const { changeForm, loginHandler, errors } = useForm()

    return (
        <PageContainer 
            errors={errors}
            btnHandler={loginHandler}
            changeForm={changeForm}
            title={'Авторизация'}
            btnText={'Авторизоваться'}
            link={'/register'}
            linkText={'Регистрация'}
            isRegister={false} 
        />
    )
}