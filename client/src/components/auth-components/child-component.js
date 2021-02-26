import React from 'react'

import './auth-components.css'

export const ChildComponent = ({ errors, changeForm, props }) => {

    return(
        <div className="d-flex align-items-center mb-2 flex-column">
            <input 
                className="form-control"
                name={props.name}
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                onChange={changeForm}
                />
            { 
                errors && 
                <div className="alert alert-secondary" role="alert">
                    {errors}
                </div>
            }
        </div>
    )
}