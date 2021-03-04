import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'

import './pages.css'

const ProjectPage = () => {

    const [name, setName] = useState('')
    const [projectKey, setProjectKey] = useState('')

    const makeid = () => {
        var text = ""
        var possible = "abcdefghijklmnopqrstuvwxyz"

        for( var i=0; i < 4; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text.toUpperCase()
    }

    const onChangeHandler = (e) => {
        if (e.target.value.length > 2) setProjectKey(makeid())
        if (/[а-я]/i.test(e.target.value)) setProjectKey(makeid())
        setName(e.target.value)
        if (e.target.value.length <= 2) setProjectKey('')
    }

    return (
        <div className="project-page-container d-flex align-items-top">
            <div className="form-project">
                <div>
                    <div className="h4 mb-2 fw-normal">
                        <span className="project-title-span">Создать проект</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 flex-column">
                        <input 
                            className="form-control mb-1"
                            name="projectName"
                            value={name}
                            type="text"
                            id="projectId"
                            onChange={onChangeHandler}
                            placeholder="Введите название проекта"
                            />
                    </div>
                    <div className="mb-2 fw-normal">
                        <span className="project-title-span">Ключ проекта</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 flex-column">
                        <input 
                            className="form-control"
                            name="projectKey"
                            type="text"
                            id="porjectKey"
                            defaultValue={projectKey}
                            placeholder="Ключ"
                            />
                    </div>
                    <div className="btn-container">
                        <div className="btn-left">
                            <button 
                                className="form-btn w-100 btn btn-primary" 
                                type="button"
                                disabled={name.length > 2 ? false : true}
                            >
                            Создать
                            </button>
                        </div>
                        <div className="btn-right">
                            <button 
                                className="form-btn w-100 btn btn-primary" 
                                type="button" 
                            >
                            Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, loginHandler, clearErrors } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        loginHandler,
        clearErrors
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)