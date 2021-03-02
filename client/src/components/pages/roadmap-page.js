import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchTodos, todoCreated, todoUpdate } from '../../actoins'

import './pages.css'

const getDate = (endDate = false) => {
    const date = new Date()
    const days = date.getDay() < 10 ? '0' + date.getDay(): date.getDay()

    if (!endDate) {
        const months = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1): date.getMonth() + 1
        return `${date.getFullYear()}-${months}-${days}`
    }
    const months = date.getMonth() + 2 < 10 ? '0' + (date.getMonth() + 2): date.getMonth() + 2
    return `${date.getFullYear()}-${months}-${days}`
}

const RoadMapPage = ({ todos, todoCreated, fetchTodos, todoUpdate }) => {

    const [todo, setTodo] = useState({
        content: '',
        startDate: getDate(),
        endDate: getDate(true),
    })

    const [showInput, setShowInput] = useState(false)
    
    const addTableRow = () => showInput ? setShowInput(false) : setShowInput(true)
    
    const changeHandler = e => setTodo({ ...todo, [e.target.name]: e.target.value })
    
    const onDateBlur = (e, id) => todoUpdate({ id, [e.target.name]: e.target.value })

    const onBlurHandler = () => {
        if (todo.content) {
            todoCreated(todo)
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

    useEffect(() => fetchTodos(), [fetchTodos])

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
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodos: () => fetchTodos(dispatch),
        todoCreated: (todo) => todoCreated(dispatch, todo),
        todoUpdate: (todo) => todoUpdate(dispatch, todo) 
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(RoadMapPage)