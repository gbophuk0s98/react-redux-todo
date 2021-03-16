import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchTodos, todoCreated, todoSelected, fetchProject } from '../../actoins'
import Spinner from '../spinner'
import TodoDetail from '../todo-detail'
import CustomDateRangePicker from '../date-range-picker'
import CreateProjectLink from '../create-project-link'
// import { TableWrapper, Button } from '../styled-components'
import { Table, Button, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, Paper, TextField, makeStyles } from '@material-ui/core'

import './pages-css/roadmap-page.css'

const getDate = (plusMonth = 0) => `${(new Date().getMonth() + 1) + plusMonth }/${new Date().getDate()}/${new Date().getFullYear()}`

const columns = [
    { id: 'epicName', label: 'Epic', minWidth: 170, aling: 'left' },
    { id: 'epicDate', label: 'Срок выполнения', minWidth: 100, aling: 'left' },
]

const RoadMapPage = ({ todos, todoCreated, fetchTodos, todoSelected, loading, projectListIsEmpty, selectedProject }) => {

    const [showInput, setShowInput] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const useStyles = makeStyles({
        paperStyles: { width: '50%', maxHeight: 550, borderRadius: '0' },
        container: { maxHeight: 500 },
        paperRow: { width: '50%', maxHeight: 550, padding: '15px 25px', borderRadius: '0' },
    })
    const classes = useStyles()

    useEffect(() => {
        if (selectedProject._id) fetchTodos(selectedProject._id)
    }, [fetchTodos, selectedProject])

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    
    const onBlurHandler = e => {
        const { value } = e.target
        if (value) {
            const todo = { content: value, startDate: getDate(), endDate: getDate(1)}
            todoCreated(todo, selectedProject._id)
        }
        setShowInput(false)
    }

    const renderHead = (column) => {
        return (
            <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
            >
                {column.label}
            </TableCell>
        )
    }

    const renderRow = (todo) => {
        return (
            <TableRow hover key={todo._id}>
                <TableCell>
                    <Button
                        onClick={() => todoSelected(todo._id)}
                    >
                        {todo.content}
                    </Button>
                </TableCell>
                <TableCell>
                    <CustomDateRangePicker
                        startDate={todo.startDate}
                        endDate={todo.endDate}
                        todoId={todo._id}
                        projectId={selectedProject._id}
                    />
                </TableCell>
            </TableRow>
        )
    }

    const InputRow = () => {
        return (
            <>
                <TextField 
                    label="Epic"
                    variant="outlined"
                    name="content"
                    autoFocus={true}
                    onBlur={e => onBlurHandler(e)}
                />
            </>
        )
    }

    const BtnRow = () => {
        return (
            <>
                <Button
                    onClick={() => setShowInput(!showInput)}
                >
                        Создать Epic...
                </Button>
            </>
        )
    }

    if (projectListIsEmpty) return <CreateProjectLink />
    if (!selectedProject._id) return <>Выберите проект</>
    if (loading) return <Spinner />

    return (
        <div className="roadmap-container">
            <TodoDetail/>
            <Paper className={classes.paperStyles}>
                <TableContainer className={classes.container}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                    >
                        <TableHead>
                            <TableRow>
                                {columns.map(column => renderHead(column))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(todo => renderRow(todo))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={todos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Paper className={classes.paperRow}>
                { !showInput && <BtnRow /> }
                { showInput && <InputRow /> }
            </Paper>
        </div>
    )
}

const mapStateTopProps = (state) => {

    const projectListIsEmpty = state.projects.items.length === 0
    return {
        todos: state.todos.items,
        loading: state.todos.loading,
        error: state.todos.error,
        projectListIsEmpty,
        selectedProject: state.selectedProject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: (projectId) => fetchTodos(dispatch, projectId),
        todoCreated: (todo, projectId) => todoCreated(dispatch, todo, projectId),
        todoSelected: (id) => todoSelected(dispatch, id),
        fetchProject: (projectId) => fetchProject(dispatch, projectId),
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(RoadMapPage)