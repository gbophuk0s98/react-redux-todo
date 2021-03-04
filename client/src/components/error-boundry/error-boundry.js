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
        // if (this.state.hasError) return <p>Ошибка</p>
        
        return this.props.children
    }

}