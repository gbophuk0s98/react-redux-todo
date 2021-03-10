import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'

import 'bootstrap-daterangepicker/daterangepicker.css'
import './date-range-picker.css'

const CustomDateRangePicker = ({ todoId, startDate, endDate, projectId, todoUpdate }) => {

    const getDateFromPicker = picker => `${picker.getMonth() + 1}/${picker.getDate()}/${picker.getFullYear()}`

    const applyHandler = (e, picker) => {
        const startDate = getDateFromPicker(picker.startDate._d)
        const endDate = getDateFromPicker(picker.endDate._d)
        if ( picker.oldStartDate._i !== startDate || picker.oldEndDate._i !== endDate) {
            todoUpdate({todoId, startDate, endDate}, projectId)
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
                    <span className="content-arrow">→</span>
                    <span className="content-endDate">{endDate}</span>
                </div>
            </button>
        </DateRangePicker>
    )
}

const mapStateTopProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    const { todoUpdate } = bindActionCreators(actions, dispatch)
    return {
        todoUpdate: (todo, projectId) => todoUpdate(dispatch, todo, projectId)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(CustomDateRangePicker)