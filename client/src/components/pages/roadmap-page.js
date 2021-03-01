import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import uuid from 'react-uuid'

import { fetchTodos } from '../../actoins'
import DatePicker from '../date-picker'

import './pages.css'

const RoadMapPage = ({ fetchTodos, todos }) => {

    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    const addTableRow = () => {
        if (showInput) {
            setShowInput(false)
        } else {
            setShowInput(true)
        }
        // showInput ? setShowInput(false) : setShowInput(true)
    }

    const changeText = e => {
        const date = new Date()
        console.log(date)
    }

    const InputRow = () => {
        return (
            <tr className="todo">
                <td className="todo-content">
                    <input 
                        ref={input => input ? input.focus() : null}
                        onBlur={() => setShowInput(false)} 
                        type="text" id="inputTodo" 
                        onChange={changeText}
                    />
                </td>
                <td>
                    <div className="date-picker-list">
                        <div className="date-picker-item">
                        <input type="date" name="date" defaultValue="2021-12-21"/>
                        </div>
                        <span>→</span>
                        <div className="date-picker-item">
                        <input type="date" name="date" defaultValue="2021-12-21"/>
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
                    const { content, date } = todo
                    return (
                        <tr className="todo" key={todo._id}>
                            <td className="todo-content">{content}</td>
                            <td>
                                <div className="date-picker-list">
                                    <div className="date-picker-item">
                                        <input type="date" name="date" defaultValue="2021-12-21"/>
                                    </div>
                                    <span>→</span>
                                    <div className="date-picker-item">
                                        <input type="date" name="date" defaultValue="2021-12-21"/>
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
        fetchTodos: () => fetchTodos(dispatch)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(RoadMapPage)