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
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: '#fff',
                backgroundColor: '#1976d2',
            }
        },
      }
}

export const muiThemeDark = {
    overrides: {
        MuiButton: {
            root: {
                ...defaultButtonStyles.root,
                color: "#fff",
                backgroundColor: '#424242',
            },
            text: { ...defaultButtonStyles.text },
        },
        MuiMenu: {
            list: {
                background: '#424242',
                color: '#fff',
                borderRadius: '0',
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: 'rgba(0, 0, 0, 0.87)',
                backgroundColor: '#333333',
            }
        },
        MuiLink: {
            color: 'red',
        }
    }
}