import React, { useState, useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'
import AuthContext from '../context'

import './pages.css'

const ProjectPage = ({ projectInfo, createProject }) => {

    const auth = useContext(AuthContext)

    const [project, setProject] = useState({
        projectName: '',
        projectKey: '',
    })

    useEffect(() => {
        if (!!projectInfo.id) {
            console.log('auth', auth)
            auth.login(auth.userId, auth.token, projectInfo.id)
        }
    }, [auth, projectInfo])

    const makeId = () => {
        let text = ""
        let possible = "abcdefghijklmnopqrstuvwxyz"

        for( let i=0; i < 4; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text.toUpperCase()
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target

        if (project.projectName.length >= 2 && value.length > 2) {
            setProject({ [name]: value, projectKey: makeId() })
        } else setProject({ [name]: value, projectKey: '' })
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
                            value={project.projectName}
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
                            defaultValue={project.projectKey}
                            placeholder="Ключ"
                            />
                    </div>
                    <div className="btn-container">
                        <div className="btn-left">
                            <button 
                                className="form-btn w-100 btn btn-primary" 
                                type="button"
                                disabled={project.projectName.length > 2 ? false : true}
                                onClick={() => createProject({ ...project, userId: auth.userId})}
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
        projectInfo: state.project
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, loginHandler, clearErrors, createProject } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        loginHandler,
        clearErrors,
        createProject: (project) => createProject(dispatch, project)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)