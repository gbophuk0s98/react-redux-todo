import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'

import { GoogleLogin } from 'react-google-login'
import { makeStyles } from '@material-ui/core'

import './google-login.css'

const useStyles = makeStyles(theme => ({
    googleBtn: {
        border: '1px solid red',
        width: '100%',
    },
}))


const GoogleLoginWrapper = ({ googleLogin }) => {

    const classes = useStyles()

    const googleResponseSuccess = response => {
        googleLogin({
            tokenId: response.tokenId

        })
    }
    const googleResponseFailure = response => console.log(response)

    return (
        <GoogleLogin
            clientId="279291504148-ocdee30nc0f7hpu6bbtftof75qhgn0gi.apps.googleusercontent.com"
            buttonText="Войти с помощью Google"
            className={classes.googleBtn}
            onSuccess={googleResponseSuccess}
            onFailure={googleResponseFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    const { googleLogin } = bindActionCreators(actions, dispatch)
    return { googleLogin }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginWrapper)