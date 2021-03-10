import React from 'react'
import { Link } from 'react-router-dom'

import './create-project-link.css'

const CreateProjectLink = () => {
    return (
        <div>
            Для начала <Link to='/createProject'>создайте</Link> проект!
        </div>
    )
}

export default CreateProjectLink