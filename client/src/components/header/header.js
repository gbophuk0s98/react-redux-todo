import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import * as actions from '../../actoins'
import DropDown from '../dropdown'
import { HeaderWrapper } from '../styled-components'
import { Button, makeStyles, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MoreIcon from '@material-ui/icons/MoreVert'

import './header.css'

const Header = ({ logoutHandler, setTheme, theme, selectedProject, user }) => {
     
    const useStyles = makeStyles((theme) => ({
        background: {
        background: '#000',
        },
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
        sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        },
        sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        },
    }))

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
    };

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
        <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        >
        <AccountCircle />
        </IconButton>
        <p>Profile</p>
        </MenuItem>
        </Menu>
    );
  

    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
	}
    
    // return (
    //     <HeaderWrapper>
    //     <nav className="navbar navbar-expand-lg navbar-dark">
    //         <Button
    //             onClick={themeToggler}
    //         >
    //             CroCodileUI
    //         </Button>

    //         <div className="collapse navbar-collapse" id="navbarColor03">
    //             <ul className="navbar-nav mr-auto">
    //                 <li className="nav-item">
    //                     <Link className="nav-link" to="/cards">Главная</Link>
    //                 </li>
    //                 <li className="nav-item">
    //                     <Link className="nav-link" to="/roadmap">Дорожная карта</Link>
    //                 </li>
    //                 <li>
    //                     <DropDown />
    //                 </li>
    //                 <li className="nav-item">
    //                     <div className="project-info">
    //                         <span className="nav-link-text">
    //                             {selectedProject.title}
    //                         </span>
    //                         <span className="nav-link-text">
    //                             {selectedProject.key}
    //                         </span>
    //                     </div>
    //                 </li>
    //             </ul>
    //             <div className="header-user-info">
    //                 <div className="header-user-title">
    //                     <span>{user.userName} ({user.email})</span>
    //                 </div>
    //                 <Button
    //                     onClick={() => logoutHandler()}
    //                 >
    //                     Выход
    //                 </Button>
    //             </div>
    //         </div>
    //         </nav>
    //     </HeaderWrapper>
    // )


    return (
        <div className={classes.grow}>
            <AppBar className={classes.background} position="static">
                <Toolbar>

                <Button
                    onClick={themeToggler}
                >
                    CroCodileUI
                </Button>
                {/* <Link className="nav-link" to="/cards">Главная</Link> */}
                {/* <Link className="nav-link" to="/roadmap">Дорожная карта</Link> */}
                <DropDown />

                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
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
                <div className={classes.sectionMobile}>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                    <MoreIcon />
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
      )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedProject: state.selectedProject,
        theme: state.theme,
    }
}

const mapDispatchToProps = (dispatch) => {
    const { logoutHandler, setTheme } = bindActionCreators(actions, dispatch)
    return { logoutHandler, setTheme }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)