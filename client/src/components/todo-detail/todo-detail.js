import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ColorPicker from '../color-picker/color-picker'

import { todoUpdate, fetchCards } from '../../actoins'
import CustomSelect from '../custom-select'
import SimpleSelect from '../simple-select'

import { makeStyles, TextField, Grid, Typography, } from '@material-ui/core'

import './todo-detail.css'
import Spinner from '../spinner'


const useStyles = makeStyles((theme) => ({
    grid: {
        padding: '5px 25px',
        marginBottom: '5px',
    },
    title: {
        '& input': {
            padding: '10px 15px',
        }
    },
}))


const TodoDetail = ({ selectedTodo, todoUpdate, selectedTodoLoading, selectedProject, fetchCards }) => {

    const [title, setTitle] = useState('')
    const classes = useStyles()

    useEffect(() => setTitle(selectedTodo.content), [setTitle, selectedTodo])

    const onTitleChange = e => setTitle(e.target.value)
    
    const onTitleBlurHandler = e => {
        if (title === '' || title === selectedTodo.content) setTitle(selectedTodo.content)
        else todoUpdate(selectedTodo._id, selectedProject._id, title)
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
    if (JSON.stringify(selectedTodo) === '{}') return (
        <Grid
            container
            justify='center'
            alignItems='center'
            style={{ height: '100%' }}
        >
            Выберите тудушку
        </Grid>
    )
    
    return (
        <>
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
                    <Typography>
                        Описание
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        label="Добавить описание..."
                        multiline={true}
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
                        Исполнитель
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
                        Автор
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
                        Приоритет
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
                        Карточка
                </Grid>
                <Grid item xs={9}>
                    <SimpleSelect 
                        todoId={selectedTodo._id}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const mapStateTopProps = (state) => {
    return {
        selectedTodo: state.selectedTodo,
        selectedTodoLoading: state.selectedTodo.loading,
        selectedProject: state.selectedProject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoUpdate: (id, projectId, title) => todoUpdate(dispatch, id, projectId, null, null, null, title),
        fetchCards: (projectId) => fetchCards(dispatch, projectId)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(TodoDetail)