import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({
        '@global': {
            body: {
                transition: 'all 0.50s linear',
                background: `${theme.overrides.pallete.background.paper}`,
            }
        }
    })
)

const GlobalStyles = () => {
    useStyles()
    return null
}

export default GlobalStyles