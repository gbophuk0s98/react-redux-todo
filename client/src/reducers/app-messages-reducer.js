const updateAppMessages = (state, action) => {

    const initialAppMessagesState = {
        todoCreated: {
            message: '',
            loading: '',
        },
        todoUpdated: {
            message: '',
            loading: '',
        },
        cardTitleUpdated: {
            message: '',
            loading: '',
        },
    }

    if (state === undefined) return initialAppMessagesState

    switch (action.type) {
        case 'UPDATE_CARD_TITLE_REQUESTED':
            return {
                ...state.appMessages, 
                cardTitleUpdated: {
                    message: '',
                    loading: true,
                } 
            }
        case 'UPDATE_CARD_TITLE_SUCCESS':
            return {
                ...state.appMessages,
                cardTitleUpdated: {
                    message: action.payload,
                    loading: false,
                }
            }
        case 'CLEAR_CARD_TITLE_MESSAGE':
            return {
                ...state.appMessages,
                cardTitleUpdated: {
                    message: '',
                    loading: false
                }
            }
        case 'UPDATE_TODO_SUCCESS':
            return {
                ...state.appMessages,
                todoUpdated: {
                    message: action.payload,
                    loading: false,
                }
            }
        case 'CLEAR_UPDATE_TODO_MESSAGE':
            return {
                ...state.appMessages,
                todoUpdated: {
                    message: '',
                    loading: false,
                }
            }
        case 'CREATE_TODO_SUCCESS':
            return {
                ...state.appMessages,
                todoCreated: {
                    message: action.payload,
                    loading: false,
                }
            }
        case 'CLEAR_CREATE_TODO_MESSAGE':
            return {
                ...state.appMessages,
                todoCreated: {
                    message: '',
                    loading: false
                }
            }
        default:
            return state.appMessages
    }

}

export default updateAppMessages