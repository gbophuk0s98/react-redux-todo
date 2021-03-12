import React, { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ColorPicker from '../color-picker/color-picker'

import { todoUpdate } from '../../actoins'
import CustomSelect from '../custom-select'

import './todo-detail.css'
import AuthContext from '../../context'

const TodoDetail = ({ todo, todoUpdate}) => {

    const auth = useContext(AuthContext)
    const [title, setTitle] = useState('Todo content')

    useEffect(() => setTitle(todo.content), [setTitle, todo])

    const onTitleChange = e => setTitle(e.target.value)
    const onTitleBlurHandler = e => {
        if (title === '' || title === todo.content) setTitle(todo.content)
        else {
            todoUpdate(todo._id, auth.projectId, title)
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
                        <span className="users-info-span">
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
                        <span className="users-info-span">
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
                        <span className="users-info-span">
                            Приоритет:
                        </span>
                    </div>
                    <div className="users-info-right">
                        <CustomSelect id={todo._id} priority={todo.priority}/>
                    </div>
                </div>
                <div className="users-info-item">
                    <div className="users-info-left">
                        <span className="users-info-span">
                            Epic name:
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
        todoUpdate: (id, projectId, title) => todoUpdate(dispatch, id, projectId, null, null, null, title)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(TodoDetail)