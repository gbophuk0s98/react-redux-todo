import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { FaArrowUp } from 'react-icons/fa'
import { todoUpdate } from '../../actions'

import './custom-select.css'

const CustomOption = ({ data, innerRef, innerProps }) => {
    return (
        <div className="select-option" style={{ cursor: 'pointer' }} ref={innerRef} {...innerProps}>
            <FaArrowUp style={{...data.styles, fontSize: '17px'}}/> 
            <span className="priority-text">{data.label}</span>
        </div>
    )
}

const CustomSelect = ({ headers, priority, id, todoUpdate, iconOptions, selectedProject }) => {
    
    const [options, setOptions] = useState([])
    
    useEffect(() => setOptions(iconOptions), [setOptions, iconOptions])

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

    const changeHandler = data => todoUpdate(id, headers, data.value)

    return (
        <Select
            components={{ Option: CustomOption }}
            options={options}
            styles={styles}
            value={renderOption()}
            onChange={(data) => changeHandler(data)}
            isSearchable={false}
        />
    )
}

const mapStateTopProps = (state) => {
    
    return {
        iconOptions: state.iconOptions,
        selectedProject: state.selectedProject,
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        todoUpdate: (id, headers, priority) => dispatch(todoUpdate(id, headers, null, null, null, null, priority))
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(CustomSelect)