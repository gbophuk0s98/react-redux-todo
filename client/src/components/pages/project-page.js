import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'

import './pages-css/project-page.css'

const ProjectPage = ({ createProject, loading, user }) => {
    
    const history = useHistory()

    const [project, setProject] = useState({
        projectName: '',
        projectKey: '',
    })

    const makeId = () => {
        let text = ""
        let possible = "abcdefghijklmnopqrstuvwxyz"

        for( let i = 0; i < 4; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length))

        return text.toUpperCase()
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target

        if (project.projectName.length >= 2 && value.length > 2) {
            setProject({ [name]: value, projectKey: makeId() })
        } else setProject({ [name]: value, projectKey: '' })
    }

    const onCreateHandler = e => {
        e.preventDefault()
        createProject({ ...project, userId: user.id})
        history.push('/projectList')
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
                            disabled={true}
                            placeholder="Ключ"
                            />
                    </div>
                    <div className="btn-container">
                        <div className="btn-left">
                            <button 
                                className="form-btn w-100 btn btn-primary" 
                                type="button"
                                disabled={project.projectName.length > 2 ? false : true}
                                onClick={e => onCreateHandler(e)}
                            >
                                <span className="btn-text">Создать</span>
                                { loading && <span className="spinner-border spinner-border-sm"></span> }
                            </button>
                        </div>
                        <div className="btn-right">
                            <button 
                                className="form-btn w-100 btn btn-primary" 
                                type="button" 
                            >
                            <Link to='/projectList' style={{ color: '#fff' }} >Закрыть</Link>
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
        loading: state.selectedProject.loading,
        error: state.selectedProject.error,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, loginHandler, clearErrors } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        loginHandler,
        clearErrors,
        createProject: (project) => actions.createProject(dispatch, project),
        fetchProjects: (userId) => actions.fetchProjects(dispatch, userId),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)