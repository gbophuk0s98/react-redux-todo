import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { FaArrowUp } from 'react-icons/fa'

import { todoPriorityUpdate } from '../../actoins'

import './custom-select.css'
import AuthContext from '../../context'

const CustomOption = ({ data, innerRef, innerProps }) => {
    return (
        <div className="select-option" style={{ cursor: 'pointer' }} ref={innerRef} {...innerProps}>
            <FaArrowUp style={{...data.styles, fontSize: '17px'}}/> 
            <span className="priority-text">{data.label}</span>
        </div>
    )
}

const CustomSelect = ({ priority, id, todoPriorityUpdate }) => {

    const auth = useContext(AuthContext)

    const [options, ] = useState([
        { value: 'Наивысший', label: 'Наивысший', styles: { fill: 'red', opacity: '1' } },
        { value: 'Высокий', label: 'Высокий', styles: { fill: '#ff4d4b', opacity: '0.8' } },
        { value: 'Средний', label: 'Средний', styles: { fill: '#ff902d', opacity: '1' } },
        { value: 'Низкий', label: 'Низкий', styles: { fill: '#2dee36', opacity: '0.8' } },
    ])

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: '8px',
            height: 10,
            width: 10,
        },
    })

    const styles = {
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles =>  ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.styles.fill) }),
    }

    const renderOption = () => options.filter(option => option.value === priority)
    const changeHandler = data => todoPriorityUpdate(id, data.value, auth.projectId)

    return (
        <Select
            components={{ Option: CustomOption }}
            options={options}
            styles={styles}
            value={renderOption()}
            onChange={(data) => changeHandler(data)}
        />
    )
}

const mapStateTopProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoPriorityUpdate: (id, priority, projectId) => todoPriorityUpdate(dispatch, id, priority, projectId)
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(CustomSelect)