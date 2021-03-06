import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { connect } from 'react-redux'

import * as actions from '../../actions'

import 'bootstrap-daterangepicker/daterangepicker.css'
import './date-range-picker.css'

const CustomDateRangePicker = ({ headers, todoId, startDate, endDate, projectId, todoUpdate }) => {

    const getDateFromPicker = picker => `${picker.getMonth() + 1}/${picker.getDate()}/${picker.getFullYear()}`

    const applyHandler = (e, picker) => {
        const startDate = getDateFromPicker(picker.startDate._d)
        const endDate = getDateFromPicker(picker.endDate._d)
        if (picker.oldStartDate._i !== startDate || picker.oldEndDate._i !== endDate) {
            todoUpdate(todoId, headers, startDate, endDate)
        }
    }

    return (
        <DateRangePicker
            initialSettings={{ startDate, endDate }}
            onApply={applyHandler}
        >
            <button className="btn btn-primary btn-container">
                <div className="btn-content">
                    <span>{startDate}</span>
                    <span>→</span>
                    <span>{endDate}</span>
                </div>
            </button>
        </DateRangePicker>
    )
}

const mapStateTopProps = (state) => {
    return {
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoUpdate: (id, headers, startDate, endDate) => dispatch(actions.todoUpdate(id, headers, startDate, endDate))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(CustomDateRangePicker)