import React, { useState } from 'react'

import ParentComponent from '../auth-components'
import { PageContainer } from '../auth-components/page-container'

import './pages.css'

export const LoginPage = () => {

    const [form, setForm] = useState(null)

    const loginHandler = async () => {
        try
        {
            console.log('loginHandler()')
            // const data = await request("/api/auth/login", 'POST', {...form})
            // auth.login(data.token, data.userId)
        }
        catch {}
    }

    const changeForm = (event) => {
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        })
        console.log(form)
    }

    return (
        <PageContainer 
        title={'Авторизация'}
        btnHandler={loginHandler}
        btnText={'Авторизоваться'}
        link={'/register'}
        linkText={'Регистрация'}
    >
        <ParentComponent
                    changeForm={changeForm}
                    isRegister={false}
                />
    </PageContainer>
    )
}