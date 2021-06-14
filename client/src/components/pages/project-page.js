import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import { Button, Card, CardContent, makeStyles, TextField } from '@material-ui/core'

import './pages-css/project-page.css'

const makeId = () => {
    let text = ""
    let possible = "abcdefghijklmnopqrstuvwxyz"

    for (let i = 0; i < 4; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text.toUpperCase()
}

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: '10px',
        width: 400,
        height: 180,
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
    }
}))

const ProjectPage = ({ headers, createProject, loading, user }) => {

    const [project, setProject] = useState({
        projectName: '',
        projectKey: '',
    })

    const history = useHistory()

    const classes = useStyles()

    const onChangeHandler = e => {
        const { name, value } = e.target

        if (project.projectName.length >= 2 && value.length > 2) {
            setProject({ [name]: value, projectKey: makeId() })
        } else setProject({ [name]: value, projectKey: '' })
    }

    const onCreateHandler = e => {
        e.preventDefault()
        createProject({ ...project, userId: user.id }, headers)
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
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                    </Button>
                    <Button
                        onClick={() => history.goBack()}
                    >
                        Закрыть
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.selectedProject.loading,
        error: state.selectedProject.error,
        user: state.user,
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    const { changeForm, loginHandler, clearErrors } = bindActionCreators(actions, dispatch)
    return {
        changeForm,
        loginHandler,
        clearErrors,
        createProject: (project, headers) => dispatch(actions.createProject(project, headers)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)