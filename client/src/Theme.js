export const lightTheme = {
    type: 'ligth',
    body: 'rgb(233, 236, 239)',
    text: '#363537',
    toggleBorder: '#FFF',
    background: 'rgb(233, 236, 239)',
    navBackground: 'rgb(39, 128, 227)',
    btnBackground: '#2fa4e7',
    tableBackground: `#c3dbf7`,
    dropDownBorderBottom: '#fff',
    cardBackground: '#2780e3',
}
    
export const darkTheme = {
    type: 'dark',
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
    navBackground: '#303030',
    btnBackground: 'rgb(68, 68, 68)',
    tableBackground: '#303030',
    dropDownBorderBottom: '#636363',
    cardBackground: '#303030',
}

const defaultButtonStyles = {
    root: {
        marginRight: '10px',
        boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        textTransform: 'none',
    },
    text: {
        padding: '6px 15px',
    }
}

export const muiThemeLight = {
    overrides: {
        MuiButton: {
            root: {
                ...defaultButtonStyles.root,
                color: "#fff",
                background: '#0097ff',
            },
            text: { ...defaultButtonStyles.text },
        },
        MuiMenu: {
            list: {
                color: '#303030',
                background: '#fff',
                '& button:hover, & a:hover': {
                    color: '#303030',
                }
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: '#fff',
                backgroundColor: '#1976d2',
            },
            root: {
                '& button, & a': {
                    backgroundColor: '#1976d2',
                    border: '1px solid #1976d2',
                    color: '#fff',
                    boxShadow: 'none',
                },
                '& button:hover, & a:hover': {
                    borderRadius: 0,
                    borderBottom: '1px solid #fff',
                }
            }
        },
        MuiCard: {
            root: {
                backgroundColor: '#fff',
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#fff',
            }
        },
        MuiTable: {
            root: {
                backgroundColor: '#fff',
            },
        },
        MuiTableHead: {
            root: {
                '& th': {
                    background: '#fff',
                    color: '#303030',
                }
            }
        },
        MuiTableBody: {
            root: {
                '& tr td': {
                    color: '#303030',
                },
                '& tr td:first-child > button': {
                    background: 'none',
                    boxShadow: 'none',
                    color: '#303030',
                    padding: '0px',
                    borderRadius: 0,
                    borderBottom: '1px solid #fff',
                    '&:hover': {
                        borderBottom: '1px solid #303030',
                    }
                }
            }
        },
        MuiTablePagination: {
            root: {
                color: '#303030',
                '& svg': {
                    fill: '#303030',
                }
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: 'none'
            },
        },
        MuiDrawer: {
            root: {
                ariaHidden: 'false',
            },
            paper: {
                top: '74px',
                maxWidth: '500px',
                width: '100%',
            }
        }
      }
}

export const muiThemeDark = {
    overrides: {
        '@global': {
            body: {
                background: 'red',
            }
        },

        MuiButton: {
            root: {
                ...defaultButtonStyles.root,
                color: "#fff",
                backgroundColor: '#424242',
            },
            text: { ...defaultButtonStyles.text },
        },
        MuiIconButtonBase: {
            root: {
                '&:hover': {
                    borderBottom: 'none',
                    boxShadow: 'none',
                }
            }
        },
        MuiMenu: {
            list: {
                background: '#424242',
                color: '#fff',
                borderRadius: '0',
                '& button, & a': {
                    color: '#fff',
                }
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: '#fff',
                backgroundColor: '#333333',
            },
            root: {
                '& button, & a': {
                    backgroundColor: '#333333',
                    border: '1px solid #333333',
                    color: '#fff',
                    boxShadow: 'none',
                },
                '& button:hover, & a:hover': {
                    borderRadius: 0,
                    borderBottom: '1px solid #fff',
                }
            },
        },
        MuiLink: {
            color: 'red',
        },
        MuiCard: {
            root: {
                backgroundColor: '#424242',
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: '#363537',
            }
        },
        MuiTable: {
            root: {
                backgroundColor: '#363537',
            },
        },
        MuiTableHead: {
            root: {
                '& th': {
                    background: '#363537',
                    color: '#fff',
                }
            }
        },
        MuiTableBody: {
            root: {
                '& tr td': {
                    color: '#fff',
                },
                '& tr td:first-child > button': {
                    background: 'none',
                    boxShadow: 'none',
                    color: '#fff',
                    padding: '0px',
                    borderRadius: 0,
                    borderBottom: '1px solid #363537',
                    '&:hover': {
                        borderBottom: '1px solid #fff',
                    }
                }
            }
        },
        MuiTablePagination: {
            root: {
                color: '#fff',
                '& svg': {
                    fill: '#fff',
                }
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: 'none'
            }
        }
    }
}