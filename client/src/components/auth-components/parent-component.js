import React from 'react'
import { ChildComponent } from './child-component'

const name = { name: "userName", type: "text", id: "inputName", placeholder: 'Имя' }
const email = { name: "email", type: "email", id: "inputEmail", placeholder: 'Почта' }
const password = { name: "password", type: "password", id: "inputPassword", placeholder: 'Пароль' }
const matchPassword = { name: "matchPassword", type: "password", id: "inputMatchPassword", placeholder: 'Подтвердите пароль' }

export const ParentComponent = ({ errors, changeForm, isRegister }) => {
    
    if (isRegister) {
        return (
            <>
                <ChildComponent
                    errors={errors.userName}
                    changeForm={changeForm}
                    props={name} 
                />
                <ChildComponent 
                    errors={errors.email}
                    changeForm={changeForm}
                    props={email} 
                />
                <ChildComponent
                    errors={errors.password}
                    changeForm={changeForm}
                    props={password} 
                />
                <ChildComponent
                    errors={errors.matchPassword} 
                    changeForm={changeForm}
                    props={matchPassword} 
                />
            </>
        )
    }

    return(
        <>
            <ChildComponent
                errors={errors.email} 
                changeForm={changeForm}
                props={email} 
            />
            <ChildComponent
                errors={errors.password} 
                changeForm={changeForm}
                props={password} 
            />
        </>
    )
}