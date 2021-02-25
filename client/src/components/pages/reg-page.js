import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ParentComponent from '../auth-components'

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
        <div className="d-flex form-container text-center align-items-center">
            <div className="form-signin">
                <form>
                    <img className="mb-3 picture" src="favicon.png" alt="" width="80" height="80"/>
                    <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                    <ParentComponent
                        changeForm={changeForm}
                        mode="register"
                    />

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Запомнить меня
                        </label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={registerHandler}>Зарегистрироваться</button>
                    <Link to="/login">
                            <button type="button" className="btn btn-link">Авторизоваться</button>
                    </Link>
                    <p className="mt-3 mb-3 text-muted">©gbophuk0s 2021</p>

                </form>
            </div>
        </div>
    )
}