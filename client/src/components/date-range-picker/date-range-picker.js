import React from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'

import 'bootstrap-daterangepicker/daterangepicker.css'
import './date-range-picker.css'

const CustomDateRangePicker = ({ todoId, startDate, endDate, projectId, todoDateUpdate }) => {

    const getDateFromPicker = picker => `${picker.getMonth() + 1}/${picker.getDate()}/${picker.getFullYear()}`

    const applyHandler = (e, picker) => {
        const startDate = getDateFromPicker(picker.startDate._d)
        const endDate = getDateFromPicker(picker.endDate._d)
        if ( picker.oldStartDate._i !== startDate || picker.oldEndDate._i !== endDate) {
            todoDateUpdate({id: todoId, startDate, endDate}, projectId)
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
    return {}
}

const mapDispatchToProps = (dispatch) => {
    const { todoDateUpdate } = bindActionCreators(actions, dispatch)
    return {
        todoDateUpdate: (todo, projectId) => todoDateUpdate(dispatch, todo, projectId)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(CustomDateRangePicker)