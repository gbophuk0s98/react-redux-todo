import React from 'react'
import { connect } from 'react-redux'

import './todo-detail.css'

const TodoDetail = ({ styles, todo }) => {
    return (
        <div className="todo-detail-container" style={styles}>
            <div className="todo-title">
                <span>{JSON.stringify(todo) === '{}' ? 'Выберите тудушку': todo.content}</span>
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