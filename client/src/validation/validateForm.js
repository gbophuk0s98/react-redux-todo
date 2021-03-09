const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const rePassword = /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/

const validateAuthForm = (form) => {
    let errors = {}

    if (!form) return
    if (!form.email) errors.email = 'Почта обязательна!'
    else if (!reEmail.test(form.email)) {
        errors.email = 'Неверная почта'
    }
    if (!form.password) errors.password = 'Пароль обязателен'
    else if (!rePassword.test(form.password)) errors.password = `Минимум 6 символов, буквы (латиница) в верхнем и нижнем регистре`
    console.log('errors', errors)
    return errors
}

const validateRegForm = (form) => {
    let errors = {}

    if (!form) return
    if (!form.userName.trim()) errors.userName = 'Имя обязательно!'
    if (!form.email) errors.email = 'Почта обязательна!'
    else if (!reEmail.test(form.email)) {
        errors.email = 'Неверная почта'
    }
    if (!form.password) errors.password = 'Пароль обязателен'
    else if (!rePassword.test(form.password)) errors.password = 'Минимум 6 символов, буквы (латиница) в верхнем и нижнем регистре'
    if (!form.matchPassword) errors.matchPassword = 'Пароль обязателен'
    else if (form.password !== form.matchPassword) errors.matchPassword = 'Пароли не совпадают!'
    console.log('val err', errors)
    return errors
}

const isEmptyObject = obj => {
    return JSON.stringify(obj) === '{}'
}

export {
    validateAuthForm,
    validateRegForm,
    isEmptyObject
}