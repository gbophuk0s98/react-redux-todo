import React from 'react'

import { PageContainer } from '../auth-components/auth-page-container'
import { useForm } from '../../hooks/useForm'

import './pages.css'

export const RegPage = () => {

    const { changeForm, registerHandler, errors } = useForm()
    
    return (
        <PageContainer
            errors={errors} 
            btnHandler={registerHandler}
            changeForm={changeForm}
            title={'Регистрация'}
            btnText={'Зарегистрироваться'}
            link={'/login'}
            linkText={'Авторизоваться'}
            isRegister={true}
        />
    )
}