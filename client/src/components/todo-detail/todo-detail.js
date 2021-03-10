import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './todo-detail.css'

const TodoDetail = ({ todo }) => {

    const [title, setTitle] = useState('')

    useEffect(() => setTitle(todo.content), [setTitle, todo])

    const onTitleChange = e => setTitle(e.target.value)

    return (
        <div className="todo-detail-container">
            <div className="todo-title">
                {
                    JSON.stringify(todo) === '{}' ? 
                    'Выберите тудушку': 
                    <input type="text" value={title} onChange={onTitleChange} />
                }
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

export default connect(mapStateTopProps)(TodoDetail)