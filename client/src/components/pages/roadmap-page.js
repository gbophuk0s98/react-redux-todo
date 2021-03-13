import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'

import { fetchTodos, todoCreated, todoSelected, fetchProject } from '../../actoins'
import AuthContext from '../../context'
import Spinner from '../spinner'
import TodoDetail from '../todo-detail'
import CustomDateRangePicker from '../date-range-picker'
import CreateProjectLink from '../create-project-link'

import './pages-css/roadmap-page.css'

const getDate = (plusMonth = 0) => `${(new Date().getMonth() + 1) + plusMonth }/${new Date().getDate()}/${new Date().getFullYear()}`

const RoadMapPage = ({ todos, project, todoCreated, fetchTodos, todoSelected, loading, projectListIsEmpty, fetchProject }) => {

    const auth = useContext(AuthContext)

    const [showInput, setShowInput] = useState(false)
    const [todo, setTodo] = useState({
        content: '',
        startDate: getDate(),
        endDate: getDate(1),
    })

    useEffect(() => {
        if (auth.projectId) fetchTodos(auth.projectId)
    }, [fetchTodos, auth])

    useEffect(() => {
        if (auth.projectId) fetchProject(auth.projectId)
    }, [fetchProject, auth.projectId])
    
    const addTableRow = () => showInput ? setShowInput(false) : setShowInput(true)
    
    const changeHandler = e => setTodo({ ...todo, [e.target.name]: e.target.value })
    
    const onBlurHandler = () => {
        if (todo.content) {
            todoCreated(todo, auth.projectId)
            setTodo({ ...todo, content: '' })
        }
        setShowInput(false)
    }

    const InputRow = () => {
        return (
            <tr className="todo" onBlur={onBlurHandler}>
                <td className="todo-content">
                    <input 
                        type="text" 
                        id="inputTodo" 
                        ref={input => input ? input.focus() : null}
                        name="content"
                        onChange={changeHandler}
                        value={todo.content}
                    />
                </td>
                <td>
                    <CustomDateRangePicker
                        startDate={getDate()}
                        endDate={getDate(1)}
                    />
                </td>
            </tr>
        )
    }

    const BtnRow = () => {
        return (
            <tr>
                <td colSpan={2}>
                <button 
                    className="btn btn-primary"
                    style={{ padding: '1px 10px' }}
                    onClick={addTableRow}
                >
                        Создать Epic...
                </button>
                </td>
            </tr>
        )
    }

    if (!auth.projectId) return <>Выберите проект</>
    if (loading) return <Spinner />
    if (projectListIsEmpty) return <CreateProjectLink />

    return (
        <div className="roadmap-container">
            <TodoDetail/>
            <div className="scroll-table">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr className="todo">
                            <th className="todo-content">
                                Epic
                            </th>
                            <th>
                                Срок выполнения
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(todo => {
                            const { content, startDate, endDate } = todo
                            return (
                                <tr className="todo" key={todo._id}>
                                    <td className="todo-content">
                                        <div className="key-button-wrapper">
                                            <div className="project-key-text">{project.key}-{todo.creationNumber}</div>
                                            <div
                                                className="right-btn btn btn-dark text-info font-weight-bold"
                                                onClick={() => todoSelected(todo._id)}
                                            >
                                                {content}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="todo-content">
                                        <CustomDateRangePicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            todoId={todo._id}
                                            projectId={auth.projectId}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    { showInput && <InputRow /> }
                    { !showInput && <BtnRow />}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const mapStateTopProps = (state) => {

    const projectListIsEmpty = state.projects.items.length === 0 ? true: false
    return {
        todos: state.todos.items,
        loading: state.todos.loading,
        error: state.todos.error,
        project: state.project,
        projectListIsEmpty,
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