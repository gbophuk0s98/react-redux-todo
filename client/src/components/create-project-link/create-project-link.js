import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

import './create-project-link.css'

const CreateProjectLink = () => {
    return (
        <div>
            <Typography>
                Для начала <Link to='/createProject'>создайте</Link> проект!
            </Typography>
        </div>
    )
}

export default CreateProjectLink