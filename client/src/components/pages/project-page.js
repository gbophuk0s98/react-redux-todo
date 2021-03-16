import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'
import { ProjectPageContainer } from '../styled-components'
import { Button, Card, CardContent, makeStyles, TextField } from '@material-ui/core'

import './pages-css/project-page.css'

const makeId = () => {
    let text = ""
    let possible = "abcdefghijklmnopqrstuvwxyz"

    for( let i = 0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text.toUpperCase()
}

const ProjectPage = ({ createProject, loading, user }) => {

    const [project, setProject] = useState({
        projectName: '',
        projectKey: '',
    })

    const history = useHistory()

    const useStyles = makeStyles((theme) => ({
        card: {
            width: 400,
            height: 180,
        },
        cardContent: {
            display: 'flex',
            flexDirection: 'column',
        }
    }))
    const classes = useStyles()

    const onChangeHandler = e => {
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
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <TextField
                    name="projectName"
                    value={project.projectName}
                    label="Название проекта"
                    onChange={onChangeHandler}
                />
                <TextField
                    name="projectKey"
                    type="text"
                    id="standard-basic2"
                    label="Ключ"
                    disabled={true}
                    value={project.projectKey}
                />
                <div className="d-flex justify-content-end mt-3 mb-2 flex-row">
                    <Button
                        disabled={project.projectName.length > 2 ? false : true}
                        onClick={e => onCreateHandler(e)}
                    >
                        <span className="btn-text">Создать</span>
                        { loading && <span className="spinner-border spinner-border-sm"></span> }
                    </Button>
                    <Button 
                        onClick={() => history.goBack()}
                    >
                        Закрыть
                    </Button>
                </div>
            </CardContent>
        </Card>
        // <ProjectPageContainer className="d-flex align-items-top">
        //     <div className="form-project">
        //         <div>
        //             <div className="h4 mb-2 fw-normal">
        //                 <span className="project-title-span">Создать проект</span>
        //             </div>
        //             <div className="d-flex align-items-center mb-2 flex-column">
        //                 <input 
        //                     className="form-control mb-1"
        //                     name="projectName"
        //                     value={project.projectName}
        //                     type="text"
        //                     id="projectId"
        //                     onChange={onChangeHandler}
        //                     placeholder="Введите название проекта"
        //                     />
        //             </div>
        //             <div className="mb-2 fw-normal">
        //                 <span className="project-title-span">Ключ проекта</span>
        //             </div>
        //             <div className="d-flex align-items-center mb-2 flex-column">
        //                 <input 
        //                     className="form-control"
        //                     name="projectKey"
        //                     type="text"
        //                     id="porjectKey"
        //                     defaultValue={project.projectKey}
        //                     disabled={true}
        //                     placeholder="Ключ"
        //                     />
        //             </div>
        //             <div className="btn-container">
        //                 <div className="btn-left">
        //                     <Button 
        //                         className="btn" 
        //                         disabled={project.projectName.length > 2 ? false : true}
        //                         onClick={e => onCreateHandler(e)}
        //                     >
        //                         <span className="btn-text">Создать</span>
        //                         { loading && <span className="spinner-border spinner-border-sm"></span> }
        //                     </Button>
        //                 </div>
        //                 <div className="btn-right">
        //                     <Button 
        //                         className="btn"
        //                         onClick={() => history.goBack()}
        //                     >
        //                         Закрыть
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </ProjectPageContainer>
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