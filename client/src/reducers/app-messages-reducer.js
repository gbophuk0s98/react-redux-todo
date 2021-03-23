const updateAppMessages = (state, action) => {

    const initialAppMessagesState = {
        universalError: null,
        universalMessage: null,
    }

    if (state === undefined) return initialAppMessagesState

    switch (action.type) {
        case 'SET_UNIVERSAL_ERROR':
            return { ...initialAppMessagesState, universalError: action.payload }
        case 'CLEAR_UNIVERSAL_ERROR':
            return { ...initialAppMessagesState, universalError: null }
        case 'SET_UNIVERSAL_MESSAGE':
            return { ...initialAppMessagesState, universalMessage: action.payload }
        case 'CLEAR_UNIVERSAL_MESSAGE':
            return { ...initialAppMessagesState, universalMessage: null }
        default:
            return state.appMessages
    }

}

export default updateAppMessages