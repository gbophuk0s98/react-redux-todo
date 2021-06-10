import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, makeStyles } from '@material-ui/core'

import './create-project-link.css'

const useStyles = makeStyles(theme => ({
    textColor: {
        color: theme.palette.secondary.light
    }
}))

const CreateProjectLink = () => {

    const classes = useStyles()

    return (
        <Typography>
            <span className={classes.textColor}>
                {`Для начала`}
            </span>
            <Link to='/createProject'>
                {` создайте `}
            </Link>
            <span className={classes.textColor}>
                {`проект!`}
            </span>
        </Typography>
    )
}

const SelectProjectMessage = () => {

    const classes = useStyles()

    return (
        <span className={classes.textColor}>
            {`Выберите проект`}
        </span>
    )

}

export {
    CreateProjectLink,
    SelectProjectMessage
}