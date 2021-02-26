import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ParentComponent } from './parent-component'

export const PageContainer = ({ title, btnHandler, btnText, link, linkText, isRegister }) => {

    const [form, setForm] = useState(null)

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
                    <h1 className="h3 mb-3 fw-normal">
                        {title}
                    </h1>

                    <ParentComponent
                        changeForm={changeForm}
                        isRegister={isRegister}
                    />

                    <button 
                        className="form-btn w-100 btn btn-lg btn-primary" 
                        type="button" 
                        onClick={btnHandler}
                    >
                        {btnText}
                    </button>
                    <Link to={link}>
                        <button
                            type="button"
                            className="btn btn-link"
                        >
                            {linkText}
                        </button>
                    </Link>
                    <p className="mt-3 mb-3 text-muted">©gbophuk0s 2021</p>
                </form>
            </div>
        </div>
    )

}
