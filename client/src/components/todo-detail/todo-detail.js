import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ColorPicker from '../color-picker/color-picker'

import { todoTitleUpdate } from '../../actoins'

import './todo-detail.css'
import AuthContext from '../../context'

const TodoDetail = ({ todo, todoTitleUpdate }) => {

    const auth = useContext(AuthContext)
    const [title, setTitle] = useState('Todo content')

    useEffect(() => setTitle(todo.content), [setTitle, todo])

    const onTitleChange = e => setTitle(e.target.value)
    const onTitleBlurHandler = e => {
        if (title === '' || title === todo.content) setTitle(todo.content)
        else {
            todoTitleUpdate(todo._id, title, auth.projectId)
        }
    } 

    if (JSON.stringify(todo) === '{}') return <div className="todo-detail-container">Выберите тудушку</div>
    
    return (
        <div className="todo-detail-container">
            <div className="todo-title">
                <div className="todo-title-color">
                    <ColorPicker />
                </div>
                <div className="todo-title-input">
                    <input
                        type="text"
                        className="form-control"
                        onChange={onTitleChange}
                        value={title || ''}
                        onBlur={onTitleBlurHandler}
                    />
                </div>
            </div>
            <div className="users-info-list">
                <div className="users-info-item">
                    <div className="users-info-left">
                        <span>
                            Исполнитель:
                        </span>
                    </div>
                    <div className="users-info-right">
                        <span>
                            {todo.owner} 
                        </span>
                    </div>
                </div>
                <div className="users-info-item">
                    <div className="users-info-left">
                        <span>
                            Автор:
                        </span>
                    </div>
                    <div className="users-info-right">
                        <span>
                            {todo.owner} ({todo.ownerEmail})
                        </span>
                    </div>
                </div>
                <div className="users-info-item">
                    <div className="users-info-left">
                        <span>
                            Приоритет:
                        </span>
                    </div>
                    <div className="users-info-right">
                        <span>
                            Medium
                        </span>
                    </div>
                </div>
                <div className="users-info-item">
                    <div className="users-info-left">
                        <span>
                            Название:
                        </span>
                    </div>
                    <div className="users-info-right">
                        <span>
                            {todo.content}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateTopProps = (state) => {
    return {
        todo: state.selectedTodo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoTitleUpdate: (id, title, projectId) => todoTitleUpdate(dispatch, id, title, projectId)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(TodoDetail)