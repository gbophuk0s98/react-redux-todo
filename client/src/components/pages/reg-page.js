import React, { useState } from 'react'

import ParentComponent from '../auth-components'
import { PageContainer } from '../auth-components/page-container'

import './pages.css'

export const RegPage = () => {
    
    const [form, setForm] = useState(null)

    const registerHandler = async () => {
        try
        {
            console.log('registerHandler()')
            // const data = await request("/api/auth/register", 'POST', {...form})
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
            title={'Регистрация'}
            btnHandler={registerHandler}
            btnText={'Зарегистрироваться'}
            link={'/login'}
            linkText={'Авторизоваться'}
        >
            <ParentComponent
                        changeForm={changeForm}
                        isRegister={true}
                    />
        </PageContainer>
    )
}