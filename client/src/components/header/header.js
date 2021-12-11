import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions'
import DropDown from '../dropdown'
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import { Button, makeStyles, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Drawer } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

import './header.css'

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    btnText: {
        fontSize: '0.875rem'
    },
    sectionDesktop: {
        display: 'flex',
        alignItems: 'center',
        flexShrink: '2',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'none',
        [theme.breakpoints.down('825')]: {
            display: 'block',
        }
    },
    sectionNavigationDesktop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('825')]: {
            display: 'none',
        }
    },
    drawerPaper: {
        width: '250px',
        top: '0',
    },
    drawerRoot: {
        ariaHidden: 'true',
    },
    titleApp: {
        [theme.breakpoints.down('825')]: {
            display: 'none'
        }
    },
    headerBtn: {
        [theme.breakpoints.down('825')]: {
            width: '100%',
        }
    },
    projectTextColor: {
        [theme.breakpoints.down('825')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.down('435')]: {
            fontSize: '0.765rem',
        },
        [theme.breakpoints.down('400')]: {
            fontSize: '0.665rem',
        },
        [theme.breakpoints.down('345')]: {
            fontSize: '0.565rem',
        },
    }
}))

const Header = ({ logoutHandler, setTheme, theme, selectedProject, user }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => setAnchorEl(null)

    const themeToggler = () => theme === 'light' ? setTheme('dark') : setTheme('light')

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={() => {
                handleMenuClose()
                logoutHandler()
            }}>
                Выйти
            </MenuItem>
        </Menu>
    )

    const renderLinks = (
        <>
            <Typography className={classes.titleApp} style={{ marginRight: 15 }}>Управление персональными задачами</Typography>
            <Button onClick={() => setOpen(false)} className={classes.headerBtn} component={Link} to='/cards'>
                <Typography className={classes.btnText}>Карточки</Typography>
            </Button>
            <Button onClick={() => setOpen(false)} className={classes.headerBtn} component={Link} to='/roadmap'>
                <Typography className={classes.btnText}>Задачи</Typography>
            </Button>
            <DropDown classes={classes.headerBtn} />
        </>
    )


    return (
        <div className={classes.grow}>
            <AppBar
                color="primary"
                position="static"
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.sectionMobile}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon
                        />
                    </IconButton>
                    <div className={classes.sectionNavigationDesktop}>
                        {renderLinks}
                    </div>
                    <Drawer
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            root: classes.drawerRoot,
                            paper: classes.drawerPaper
                        }}
                    >
                        <IconButton
                            onClick={() => setOpen(false)}
                            style={{
                                borderRadius: 0,
                                border: 'none'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {renderLinks}
                    </Drawer>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <Typography className={classes.projectTextColor}>
                            {selectedProject.title && `Текущая доска: ${selectedProject.title}`}
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="switch theme"
                            aria-haspopup="true"
                            onClick={themeToggler}
                            color="inherit"
                        >
                            <Brightness4RoundedIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedProject: state.selectedProject,
        theme: state.user.theme,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { logoutHandler, setTheme } = bindActionCreators(actions, dispatch)
    return { logoutHandler, setTheme }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)