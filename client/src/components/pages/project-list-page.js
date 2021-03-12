import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { fetchProjects, fetchProject } from '../../actoins'
import AuthContext from '../../context'
import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'

const ProjectListPage = ({ projects, loading, fetchProjects, fetchProject }) => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => fetchProjects({userId: auth.userId, token: auth.token }), [fetchProjects, auth])

    const onTitleClick = (e, projectId) => {
        e.preventDefault()
        auth.login(auth.userId, auth.token, projectId)
        fetchProject(projectId)
        history.push('/cards')
    }

    if (loading) return <Spinner />
    if (projects.length===0) return <CreateProjectLink />

    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Ключ</th>
                    <th>Администратор</th>
                </tr>
            </thead>
            <tbody>
                { projects.map(project => {
                    console.log(project)
                    return (
                        <tr key={project._id}>
                            <td>
                                <button
                                    className="btn btn-dark text-info font-weight-bold"
                                    onClick={e => onTitleClick(e, project._id)}
                                >
                                    {project.title}
                                </button>
                            </td>
                            <td>{project.key}</td>
                            <td>{project.owner}</td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.items,
        loading: state.projects.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (userId) => fetchProjects(dispatch, userId),
        fetchProject: (projectId) => fetchProject(dispatch, projectId)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProjectListPage)