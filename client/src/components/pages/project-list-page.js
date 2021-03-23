import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { fetchProjects, fetchProject, setRecentProjects, clearSelectedTodo } from '../../actoins'
import { Table, Button, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core'

import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'

const columns = [
    { id: 'projectName', label: 'Проект', minWidth: 170, aling: 'left' },
    { id: 'projectKey', label: 'Ключ', minWidth: 100, aling: 'left' },
    { id: 'projectOwner', label: 'Администратор', minWidth: 170, aling: 'left' },
]

const useStyles = makeStyles({
    paperStyles: { width: '50%', height: 'max-content' },
    container: { height: 'max-content' },
})

const ProjectListPage = ({ headers, projects, loading, fetchProjects, fetchProject, setRecentProjects, clearSelectedTodo }) => {

    const history = useHistory()

    console.log(headers)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const classes = useStyles()

    useEffect(() => fetchProjects(headers), [fetchProjects])

    const onTitleClick = (projectId) => {
        const modifiedHeaders = {
            ...headers,
            Project: `Id ${projectId}`,
        }
        fetchProject(modifiedHeaders)
        setRecentProjects(modifiedHeaders)
        clearSelectedTodo()
        history.push('/cards')
    }

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
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

    const renderRow = (project) => {
        return (
            <TableRow hover key={project._id}>
                <TableCell>
                    <Button
                        onClick={() => onTitleClick(project._id)}
                    >
                        {project.title}
                    </Button>
                </TableCell>
                <TableCell>
                    {project.key}
                </TableCell>
                <TableCell>
                    {project.owner}
                </TableCell>
            </TableRow>
        )
    }

    if (loading) return <Spinner />
    if (projects.length === 0) return <CreateProjectLink />

    return (
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
                        {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(project => renderRow(project))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 15, 25]}
                component="div"
                count={projects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.items,
        loading: state.projects.loading,
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
        }
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchProjects: (headers) => dispatch(fetchProjects(headers)),
        fetchProject: (headers) => dispatch(fetchProject(headers)),
        setRecentProjects: (headers) => dispatch(setRecentProjects(headers)),
        clearSelectedTodo: () => dispatch(clearSelectedTodo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage)