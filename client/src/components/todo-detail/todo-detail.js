import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ColorPicker from '../color-picker/color-picker'

import { todoUpdate, fetchCards } from '../../actions'
import CustomSelect from '../custom-select'
import SimpleSelect from '../simple-select'

import { makeStyles, TextField, Grid, Typography, } from '@material-ui/core'

import './todo-detail.css'
import Spinner from '../spinner'


const useStyles = makeStyles((theme) => ({
    container: {
        height: 'max-content'
    },
    grid: {
        padding: '5px 25px',
        marginBottom: '5px',
    },
    title: {
        '& input': {
            padding: '10px 15px',
        }
    },
    plusHeight: {
        height: '200px',
    },
    fieldText: {
        [theme.breakpoints.down('500')]: {
            fontSize: '0.8rem'
        },
        [theme.breakpoints.down('400')]: {
            fontSize: '0.65rem'
        }
    },
}))


const TodoDetail = ({ headers, selectedTodo, todoUpdate, selectedTodoLoading, todoUpdateDescription }) => {

    console.log(selectedTodo)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(``)
    const classes = useStyles()

    useEffect(() => setTitle(selectedTodo.content), [setTitle, selectedTodo])
    useEffect(() => setDescription(selectedTodo.description), [setDescription, selectedTodo])

    const onTitleChange = e => setTitle(e.target.value)

    const onTitleBlurHandler = e => {
        if (title === '' || title === selectedTodo.content) setTitle(selectedTodo.content)
        else todoUpdate(selectedTodo._id, headers, title)
    }

    const onDescriptionChange = e => setDescription(e.target.value)

    const onDescriptionBlur = e => {
        if (description === '' || description === selectedTodo.description) setDescription(selectedTodo.description)
        else todoUpdateDescription(selectedTodo._id, headers, description)
    }


    if (selectedTodoLoading) return (
        <Grid
            container
            justify='center'
            alignItems='center'
            style={{ height: '100%' }}
        >
            <Spinner />
        </Grid>
    )
    if (!selectedTodo._id) return (
        <Grid
            container
            justify='center'
            alignItems='center'
            style={{ height: '100%' }}
        >
            <Typography>Выберите задачу</Typography>
        </Grid>
    )

    return (
        <div className={classes.container}>
            <Grid
                container
                className={classes.grid}
                direction='row'
                justify='flex-start'
                spacing={2}
                alignItems="center"
            >
                <Grid item xs={2} id='xs'>
                    <ColorPicker />
                </Grid>
                <Grid item xs={10} key={selectedTodo._id}>
                    <TextField
                        id="standard-basic"
                        className={classes.title}
                        onChange={onTitleChange}
                        value={title}
                        onBlur={onTitleBlurHandler}
                        label="Контент"
                        style={{ width: '100%' }}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.grid}
                direction={"column"}
                spacing={0}
            >
                <Grid item>
                    <Typography className={classes.fieldText}>
                        Описание
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label="Добавить описание..."
                        multiline={true}
                        inputProps={{ maxLength: 150 }}
                        style={{ width: '100%' }}
                        value={description}
                        onChange={onDescriptionChange}
                        onBlur={onDescriptionBlur}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.grid}
                direction={"row"}
                spacing={0}
                alignItems={"center"}
            >
                <Grid item xs={3}>
                    <Typography className={classes.fieldText}>
                        Исполнитель
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        label="Исполнитель"
                        disabled={true}
                        value={selectedTodo.owner}
                        style={{ width: '100%' }}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.grid}
                direction={"row"}
                spacing={0}
                alignItems={"center"}
            >
                <Grid item xs={3}>
                    <Typography className={classes.fieldText}>
                        Автор
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        label="Автор"
                        disabled={true}
                        value={`${selectedTodo.owner} (${selectedTodo.ownerEmail})`}
                        style={{ width: '100%' }}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.grid}
                direction={"row"}
                spacing={0}
                alignItems={"center"}
            >
                <Grid item xs={3}>
                    <Typography className={classes.fieldText}>
                        Приоритет
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <CustomSelect
                        id={selectedTodo._id}
                        priority={selectedTodo.priority}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                className={classes.grid}
                direction={"row"}
                spacing={0}
                alignItems={"center"}
            >
                <Grid item xs={3}>
                    <Typography className={classes.fieldText}>
                        Карточка
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <SimpleSelect
                        todoId={selectedTodo._id}
                    />
                </Grid>
            </Grid>
            <Grid className={classes.plusHeight}></Grid>
        </div>
    )
}

const mapStateTopProps = (state) => {
    return {
        selectedTodo: state.selectedTodo,
        selectedTodoLoading: state.selectedTodo.loading,
        selectedProject: state.selectedProject,
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoUpdate: (id, headers, title) => dispatch(todoUpdate(id, headers, null, null, null, title)),
        todoUpdateDescription: (id, headers, description) => dispatch(todoUpdate(id, headers, null, null, null, null, null, null, description)),
        fetchCards: (projectId) => dispatch(fetchCards(projectId)),
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(TodoDetail)