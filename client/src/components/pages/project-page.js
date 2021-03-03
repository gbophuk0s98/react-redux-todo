import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'

import './pages.css'

const ProjectPage = () => {

    const [name, setName] = useState('')

    const onChangeHandler = (e) => setName(e.target.value)

    return (
        <div className="project-page-container d-flex align-items-top">
            <div className="form-project">
                <div>
                    <div className="h4 mb-2 fw-normal">
                        <span className="project-title-span">Создать проект</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 flex-column">
                        <input 
                            className="form-control"
                            name="projectName"
                            value={name}
                            type="text"
                            id="projectId"
                            onChange={onChangeHandler}
                            placeholder="Введите название проекта"
                            />
                    </div>
                    <div className="btn-container">
                        <div className="btn-left">
                            <button 
                                className="form-btn w-100 btn btn-primary" 
                                type="button" 
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