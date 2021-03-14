import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'

import { fetchTodos, todoCreated, todoSelected, fetchProject } from '../../actoins'
import Spinner from '../spinner'
import TodoDetail from '../todo-detail'
import CustomDateRangePicker from '../date-range-picker'
import CreateProjectLink from '../create-project-link'
import { TableWrapper, Button } from '../styled-components'

import './pages-css/roadmap-page.css'

const getDate = (plusMonth = 0) => `${(new Date().getMonth() + 1) + plusMonth }/${new Date().getDate()}/${new Date().getFullYear()}`

const RoadMapPage = ({ todos, todoCreated, fetchTodos, todoSelected, loading, projectListIsEmpty, selectedProject }) => {

    const [showInput, setShowInput] = useState(false)
    const [todo, setTodo] = useState({
        content: '',
        startDate: getDate(),
        endDate: getDate(1),
    })

    useEffect(() => {
        if (selectedProject._id) fetchTodos(selectedProject._id)
    }, [fetchTodos, selectedProject])
    
    const addTableRow = () => showInput ? setShowInput(false) : setShowInput(true)
    
    const changeHandler = e => setTodo({ ...todo, [e.target.name]: e.target.value })
    
    const onBlurHandler = () => {
        if (todo.content) {
            todoCreated(todo, selectedProject._id)
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

    if (projectListIsEmpty) return <CreateProjectLink />
    if (!selectedProject._id) return <>Выберите проект</>
    if (loading) return <Spinner />

    return (
        <div className="roadmap-container">
            <TodoDetail/>
            <div className="scroll-table">
                <TableWrapper className="table table-hover">
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
                                            <div className="project-key-text">{selectedProject.key}-{todo.creationNumber}</div>
                                            <Button
                                                className="right-btn btn"
                                                onClick={() => todoSelected(todo._id)}
                                            >
                                                {content}
                                            </Button>
                                        </div>
                                    </td>
                                    <td className="todo-content">
                                        <CustomDateRangePicker
                                            startDate={startDate}
                                            endDate={endDate}
                                            todoId={todo._id}
                                            projectId={selectedProject._id}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    { showInput && <InputRow /> }
                    { !showInput && <BtnRow />}
                    </tbody>
                </TableWrapper>
            </div>
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