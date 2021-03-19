import React, { Component } from 'react'

export default class ErrorBoundry extends Component {

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
        console.log('ERROR')
    }

    render() {        
        return this.props.children
    }

}