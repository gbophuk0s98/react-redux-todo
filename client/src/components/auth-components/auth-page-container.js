import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ParentComponent } from './parent-component'

const PageContainer = ({ errorFromBackend, errors, title, btnHandler, btnText, link, linkText, isRegister, changeForm, formLoading }) => {

    return (
        <div className="d-flex mw-340 form-container text-center align-items-center">
            <div className="form-signin">
                <form>
                    <img className="mb-3 picture" src="favicon.png" alt="" width="80" height="80"/>
                    <h1 className="h3 mb-3 fw-normal">
                        {title}
                    </h1>
                    {
                        errorFromBackend && 
                        <div className="alert alert-danger mb-2">
                            <strong>Внимание!</strong> {errorFromBackend}.
                        </div>
                    }
                    <ParentComponent
                        errors={errors}
                        changeForm={changeForm}
                        isRegister={isRegister}
                    />

                    <button 
                        className="form-btn w-100 btn btn-lg btn-primary" 
                        type="button" 
                        onClick={btnHandler}
                    >
                        <span className="mr-2">{btnText}</span>
                        { formLoading && <span className="spinner-border spinner-border-sm"></span> }
                    </button>
                    <Link to={link}>
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => errors={}}
                        >
                            {linkText}
                        </button>
                    </Link>
                    <p className="mt-3 mb-3 text-muted">©gbophuk0s 2021</p>
                </form>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        formLoading: state.formLoading
    }
}

export default connect(mapStateToProps)(PageContainer)
