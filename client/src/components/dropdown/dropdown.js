import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProject, clearSelectedTodo } from '../../actions'
import { Button, Menu, MenuItem } from '@material-ui/core'

import './dropdown.css'

class DropDownWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.wrapper = React.createRef()
    }
    render() {
        return <div className={this.props.styles} ref={this.wrapper}>{this.props.children}</div>
    }
}

const DropDown = ({ headers, recentProjects, fetchProject, clearSelectedTodo, classes }) => {

    const [anchorEl, setAnchorEl] = useState(false)

    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <DropDownWrapper styles={classes}>
            <Button
                onClick={handleClick}
                style={{ width: '100%' }}
            >
                Доски
                <ArrowDropDownIcon />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <span className="projectList-label">НЕДАВНИЕ:</span>
                {
                    recentProjects.map(project => {
                        return (
                            <MenuItem
                                key={project._id}
                                onClick={() => {
                                    handleClose()
                                    fetchProject({
                                        ...headers,
                                        Project: `Id ${project._id}`,
                                    })
                                    clearSelectedTodo()
                                }}
                            >
                                {project.title}
                            </MenuItem>
                        )
                    })
                }
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to='boardList'>
                        Все доски
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button component={Link} to='/createProject'>
                        Создать...
                    </Button>
                </MenuItem>
            </Menu>
        </DropDownWrapper>
    )
}

const mapStateToProps = (state) => {
    return {
        recentProjects: state.recentProjects,
        selectedProject: state.selectedProject,
        headers: {
            user: `Id ${state.user.id}`,
            token: `Bearer ${state.user.token}`,
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProject: (headers) => dispatch(fetchProject(headers)),
        clearSelectedTodo: () => dispatch(clearSelectedTodo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropDown)