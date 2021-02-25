import React from 'react'
import { ChildComponent } from './child-component'

const email = { text: 'Почта', name: "email", type: "email", id: "inputEmail", placeholder: 'Почта' }

const name = { text: 'Имя', name: "name", type: "text", id: "inputName", placeholder: 'Имя' }

const password = { text: 'Пароль', name: "password", type: "password", id: "inputPassword", placeholder: 'Пароль' }

export const ParentComponent = ({ changeForm, isRegister }) => {
    
    if (!isRegister) {
        return (
            <>
                <ChildComponent 
                    changeForm={changeForm}
                    props={email} 
                />
                <ChildComponent 
                    changeForm={changeForm}
                    props={password} 
                />
            </>
        )
    }

    return(
        <>
            <ChildComponent 
                changeForm={changeForm}
                props={name} 
            />
            <ChildComponent 
                changeForm={changeForm}
                props={email} 
            />
            <ChildComponent 
                changeForm={changeForm}
                props={password} 
            />
        </>
    )
}