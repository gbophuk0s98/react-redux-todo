import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'
import DropDown from '../dropdown'
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import { Button, makeStyles, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Drawer } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'

import './header.css'

const useStyles = makeStyles((theme) => ({
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
        fontSize: '0.875rem',
        [theme.breakpoints.down('825')]: {
            fontSize: '0.675rem'
        }
    },
    sectionDesktop: {
        display: 'none',
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
    MuiDrawer: {
        root: {
            ariaHidden: 'true',
        },
        paper: {
            top: '0',
            maxWidth: '300px',
            width: '100%',
            color: '#303030',
            '& .MuiInputBase-root.Mui-disabled': {
                color: '#303030',
            },
            '& MuiFormLabel-root': {
                color: '#303030',
            }
        }
    }
}))

const Header = ({ logoutHandler, setTheme, theme, selectedProject, user }) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
	}

    const menuId = 'primary-search-account-menu';
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
            <Typography style={{ marginRight: 15 }}>CroCodileUI</Typography>
            <Button component={Link} to='/cards'>
            <Typography className={classes.btnText}>Главная</Typography>
            </Button>
            <Button component={Link} to='/roadmap'>
                <Typography className={classes.btnText}>Дорожная карта</Typography>
            </Button>
            <DropDown />
            <Typography>
                {selectedProject.title && `Текущий проект: ${selectedProject.title}`}
            </Typography>
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
                        onClick={() => setOpen(!open)}
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
                        className={classes.drawer}
                    >
                        {renderLinks}
                    </Drawer>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
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