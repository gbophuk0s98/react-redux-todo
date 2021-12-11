import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import { Button, Card, CardContent, makeStyles, TextField } from '@material-ui/core'

import './css/project-page.css'

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

const BoardPage = ({ headers, createProject, loading, user }) => {

    const [board, setBoard] = useState({
        projectName: '',
        projectKey: '',
    })

    const history = useHistory()

    const classes = useStyles()

    const onChangeHandler = e => {
        if (board.projectName.length >= 2) {
            setBoard({
                projectName: e.target.value,
                projectKey: makeId()
            })
        } else {
            setBoard({
                projectName: e.target.value,
                projectKey: ''
            })
        }
    }

    const onCreateHandler = async (e) => {
        e.preventDefault()
        await createProject({ ...board, userId: user.id }, headers)
        history.push('/boardList')
    }

    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <TextField
                    name="projectName"
                    value={board.projectName}
                    label="Название доски"
                    onChange={onChangeHandler}
                />
                <TextField
                    name="projectKey"
                    type="text"
                    id="standard-basic2"
                    label="Ключ"
                    disabled={true}
                    value={board.projectKey}
                />
                <div className="d-flex justify-content-end mt-3 mb-2 flex-row">
                    <Button
                        disabled={!board.projectName.length > 2}
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)