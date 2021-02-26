import React from 'react'

import { PageContainer } from '../auth-components/page-container'

import './pages.css'

export const LoginPage = () => {

    const loginHandler = async () => {
        try
        {
            console.log('loginHandler()')
            // const data = await request("/api/auth/login", 'POST', {...form})
            // auth.login(data.token, data.userId)
        }
        catch {}
    }

    return (
        <PageContainer 
            title={'Авторизация'}
            btnHandler={loginHandler}
            btnText={'Авторизоваться'}
            link={'/register'}
            linkText={'Регистрация'}
            isRegister={false} 
        />
    )
}