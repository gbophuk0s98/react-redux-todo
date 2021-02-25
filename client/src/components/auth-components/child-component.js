import React from 'react'

import './auth-components.css'

export const ChildComponent = ({ changeForm, props }) => {

    return(
        <div className="d-flex align-items-center mb-2">
            {/* <label className="form-label" htmlFor={props.id}>{props.text}</label> */}
            <input 
                className="form-input"
                name={props.name}
                type={props.type}
                id={props.id}
                className="form-control"
                placeholder={props.placeholder}
                onChange={changeForm}
                />
        </div>
    )
}