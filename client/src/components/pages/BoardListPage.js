import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { fetchProjects, fetchProject, setRecentProjects, clearSelectedTodo } from '../../actions'

import Spinner from '../spinner'
import { CreateBoardLink } from '../create-project-link'
import ProjectDetailsDialog from '../project-details-dialog'

import {
    Table,
    Button,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    Paper,
    makeStyles,
    IconButton
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

const columns = [
    { id: 'projectName', label: 'Доска', minWidth: 170, aling: 'left' },
    { id: 'projectKey', label: 'Ключ', minWidth: 100, aling: 'left' },
    { id: 'projectOwner', label: 'Создатель', minWidth: 170, aling: 'left' },
    { id: 'projectSettings', label: '', minWidth: 50, align: 'left' }
]

const useStyles = makeStyles(theme => ({
    paperStyles: {
        marginTop: '10px',
        width: '50%',
        height: 'max-content',
        [theme.breakpoints.between('1080', '1280')]: {
            width: '70%'
        },
        [theme.breakpoints.down('1080')]: {
            width: '70%'
        },
        [theme.breakpoints.down('860')]: {
            width: '100%'
        },
    },
    container: {
        height: 'max-content'
    },
}))

const BoardListPage = ({ headers, projects, loading, fetchProjects, fetchProject, setRecentProjects, clearSelectedTodo }) => {

    const history = useHistory()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [openDialog, setOpenDialog] = useState(false)
    const [projectIdForDialog, setProjectIdFroDialog] = useState(null)

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

    const onSettingsIconClick = projectId => {
        setOpenDialog(true)
        setProjectIdFroDialog(projectId)
    }

    const closeDialog = () => setOpenDialog(false)

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = event => {
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
                <TableCell>
                    <Button
                        onClick={() => onSettingsIconClick(project._id)}
                    >
                        Добавить пользователя
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    if (loading) return <Spinner />
    if (projects.length === 0) return <CreateBoardLink />

    return (
        <>
            <ProjectDetailsDialog
                openDialog={openDialog}
                projectId={projectIdForDialog}
                handleClose={closeDialog}
            />
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
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardListPage)