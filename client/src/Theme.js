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
        pallete: {
            background: {
                paper: '#e8e8e8',
            },
        },
        Typography: {
            root: {
                color: '#303030',
            },
            '&-h5': {
                color: '#303030',
            }
        },
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
                backgroundColor: '#f4f5f7',
                color: '#201E1E',
                '& p': {
                    paddingLeft: '5px',
                }
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
                color: '#303030',
                '& .MuiInputBase-root.Mui-disabled': {
                    color: '#303030',
                },
                '& MuiFormLabel-root': {
                    color: '#303030',
                }
            }
        },
        MuiInputBase: {
            root: {
                color: '#303030',
                borderColor: '#fff',
            }
        },
        MuiFormLabel: {
            root: {
                color: '#303030',
            }
        },
        MuiTextField: {
            root: {
                color: '#303030',
                '& .MuiFormLabel-root': {
                    color: '#303030',
                }
            }
        },
        MuiSvgIcon: {
            colorPrimary: {
                color: '#1976d2',
            }
        },

    }
}

export const muiThemeDark = {
    overrides: {
        pallete: {
            background: {
                paper: '#474747'
            },
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
                color: '#fff',
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
        },
        MuiDrawer: {
            root: {
                ariaHidden: 'false',
            },
            paper: {
                top: '74px',
                maxWidth: '500px',
                width: '100%',
                color: '#fff',
                '& .MuiInputBase-root.Mui-disabled': {
                    color: '#fff',
                },
                '& MuiFormLabel-root': {
                    color: '#fff',
                }
            }
        },
        MuiSvgIcon: {
            colorPrimary: {
                color: '#456C86'
            }
        },
        MuiInputBase: {
            root: {
                color: '#fff',
                borderColor: '#fff',
            }
        },
        MuiFormLabel: {
            root: {
                color: '#fff',
            }
        },
        MuiTextField: {
            root: {
                color: '#fff',
                '& .MuiFormLabel-root': {
                    color: '#fff',
                }
            }
        }
    }
}