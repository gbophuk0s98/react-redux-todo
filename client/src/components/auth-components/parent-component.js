import React, { useState, useEffect } from 'react'
import { ChildComponent } from './child-component'

export const ParentComponent = ({ changeForm, mode }) => {
    const [email, setEmail] = useState({
        text: 'Почта', name: "email", type: "email", id: "inputEmail", placeholder: 'Почта'
    })
    const [password, setPassword] = useState({
        text: 'Пароль', name: "password", type: "password", id: "inputPassword", placeholder: 'Пароль'
    })
    const [name, setName] = useState({
        text: 'Имя', name: "name", type: "text", id: "inputName", placeholder: 'Имя'
    })
    const [isLogin, setIsLogin] = useState(false)
    
    useEffect(() => {
        setIsLogin(mode==='login')
    }, [mode])
    
    return(
        <>
            {
                isLogin && 
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
            }
    
            {
                !isLogin && 
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
            }
        </>
    )
}