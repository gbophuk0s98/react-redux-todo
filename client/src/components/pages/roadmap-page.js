import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'

import { fetchTodos, todoCreated, todoUpdate } from '../../actoins'
import AuthContext from '../../context'

import './pages.css'

const getDate = (endDate = false) => {
    const date = new Date()
    const days = date.getDate()  < 10 ? '0' + date.getDate(): date.getDate()
    let months
    if (!endDate) {
        months = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1
    } else {
        months = date.getMonth() + 2 < 10 ? '0' + (date.getMonth() + 2): date.getMonth() + 2
    }
    return `${date.getFullYear()}-${months}-${days}`
}

const RoadMapPage = ({ todos, todoCreated, fetchTodos, todoUpdate }) => {

    const auth = useContext(AuthContext)

    const [todo, setTodo] = useState({
        content: '',
        startDate: getDate(),
        endDate: getDate(true),
    })

    const [showInput, setShowInput] = useState(false)

    useEffect(() => fetchTodos(auth.projectId), [fetchTodos, auth])
    
    const addTableRow = () => showInput ? setShowInput(false) : setShowInput(true)
    
    const changeHandler = e => setTodo({ ...todo, [e.target.name]: e.target.value })
    
    const onDateBlur = (e, id) => todoUpdate({ id, [e.target.name]: e.target.value })

    const onBlurHandler = () => {
        if (todo.content) {
            todoCreated(todo, auth.projectId)
            setTodo({
                ...todo, content: ''
            })
        }
        setShowInput(false)
    }

    const InputRow = () => {
        return (
            <tr className="todo" onBlur={onBlurHandler}>
                <td className="todo-content">
                    <input 
                        type="text" id="inputTodo" 
                        ref={input => input ? input.focus() : null}
                        name="content"
                        onChange={changeHandler}
                        value={todo.content}
                    />
                </td>
                <td>
                    <div className="date-picker-list">
                        <div className="date-picker-item">
                        <input 
                            type="date"
                            name="startDate"
                            onChange={changeHandler}
                            defaultValue={todo.startDate}
                        />
                        </div>
                        <span>→</span>
                        <div className="date-picker-item">
                        <input
                            type="date"
                            name="endDate"
                            onChange={changeHandler}
                            defaultValue={todo.endDate}
                        />
                        </div>
                    </div>
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
                    style={{padding: '1px 10px'}}
                    onClick={addTableRow}
                >
                        Добавить задачу...
                </button>
                </td>
            </tr>
        )
    }

    return (
        <>
        <table className="table table-striped table-dark">
            <tbody>
            {
                todos.map((todo, index) => {
                    const { content, startDate, endDate } = todo
                    return (
                        <tr className="todo" key={todo._id}>
                            <td className="todo-content">{content}</td>
                            <td>
                                <div className="date-picker-list">
                                    <div className="date-picker-item">
                                        <input type="date" onBlur={(e) => onDateBlur(e, todo._id)} name="startDate" defaultValue={startDate}/>
                                    </div>
                                    <span>→</span>
                                    <div className="date-picker-item">
                                        <input type="date" onBlur={(e) => onDateBlur(e, todo._id)} name="endDate" defaultValue={endDate}/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
            { showInput && <InputRow /> }
            { !showInput && <BtnRow />}
            </tbody>
        </table>
        </>
    )
}

const mapStateTopProps = (state) => {
    return {
        todos: state.todos.items,
        loading: state.todos.loading,
        error: state.todos.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: (projectId) => fetchTodos(dispatch, projectId),
        todoCreated: (todo, projectId) => todoCreated(dispatch, todo, projectId),
        todoUpdate: (todo) => todoUpdate(dispatch, todo) 
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(RoadMapPage)