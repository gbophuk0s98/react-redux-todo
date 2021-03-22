import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { fetchProjects, fetchProject, setRecentProjects, clearSelectedTodo } from '../../actoins'
import { Table, Button, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core'

import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'

const columns = [
    { id: 'projectName', label: 'Проект', minWidth: 170, aling: 'left' },
    { id: 'projectKey', label: 'Ключ', minWidth: 100, aling: 'left' },
    { id: 'projectOwner', label: 'Администратор', minWidth: 170, aling: 'left' },
]

const ProjectListPage = ({ user, projects, loading, fetchProjects, fetchProject, setRecentProjects, clearSelectedTodo }) => {

    const history = useHistory()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const useStyles = makeStyles({
        paperStyles: { width: '50%', maxHeight: 500 },
        container: { maxHeight: 440 },
    })
    const classes = useStyles()
    
    useEffect(() => fetchProjects({userId: user.id, token: user.token }), [fetchProjects, user])
    
    const onTitleClick = (projectId) => {
        fetchProject(projectId)
        setRecentProjects(projectId)
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
    if (projects.length===0) return <CreateProjectLink />

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
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchProjects: (userId) => dispatch(fetchProjects(userId)),
        fetchProject: (projectId) => dispatch(fetchProject(projectId)),
        setRecentProjects: (projectId) => dispatch(setRecentProjects(projectId)),
        clearSelectedTodo: () => dispatch(clearSelectedTodo())
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProjectListPage)