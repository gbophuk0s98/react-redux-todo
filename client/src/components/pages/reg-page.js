import React from 'react'
import { PageContainer } from '../auth-components/page-container'

import './pages.css'

export const RegPage = () => {
    
    const registerHandler = async () => {
        try
        {
            console.log('registerHandler()')
            // const data = await request("/api/auth/register", 'POST', {...form})
            // auth.login(data.token, data.userId)
        }
        catch {}
    }

    return (
        <PageContainer 
            title={'Регистрация'}
            btnHandler={registerHandler}
            btnText={'Зарегистрироваться'}
            link={'/login'}
            linkText={'Авторизоваться'}
            isRegister={true}
        />
    )
}