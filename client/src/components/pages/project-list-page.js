import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { fetchProjects } from '../../actoins'
import AuthContext from '../../context'
import Spinner from '../spinner'

const ProjectListPage = ({ projects, loading, fetchProjects }) => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => fetchProjects(auth.userId), [fetchProjects, auth])

    const onTitleClick = (e, projectId) => {
        e.preventDefault()
        auth.login(auth.userId, auth.token, projectId)
        history.push('/cards')
    }

    if (loading) return <Spinner />

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
        fetchProjects: (userId) => fetchProjects(dispatch, userId)
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProjectListPage)