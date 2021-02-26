import { useState } from 'react'
import { validateAuthForm, validateRegForm } from '../validation'

export const useForm = () => {
    const [ form, setForm ] = useState({
        userName: '',
        email: '',
        password: '',
        matchPassword: '',
    })

    const [ errors, setErrors ] = useState({})

    const changeForm = event => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const registerHandler = async () => {
        try
        {
            setErrors(validateRegForm(form))
            // const data = await request("/api/auth/register", 'POST', {...form})
            // auth.login(data.token, data.userId)
        }
        catch {}
    }

    const loginHandler = async () => {
        try
        {
            setErrors(validateAuthForm(form))
            // const data = await request("/api/auth/login", 'POST', {...form})
            // auth.login(data.token, data.userId)
        }
        catch {}
    }

    return { changeForm, registerHandler, loginHandler, errors }
}