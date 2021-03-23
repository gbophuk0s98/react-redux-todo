const updateSelectedProject = (state, action) => {

    const initialStateSelectedProject = {
        _id: '',
        cards: [],
        title: '',
        description: '',
        key: '',
        owner: '',
        loading: false,
    }

    if (state === undefined) return initialStateSelectedProject

    switch (action.type) {
        case 'CREATE_PROJECT_REQUESTED':
            return { ...initialStateSelectedProject, loading: true }
        case 'CREATE_PROJECT_SUCCESS':
            return { ...action.payload, loading: false }
        case 'PROJECT_SELECT_SUCCESS':
            return { ...action.payload }
        default:
            return state.selectedProject
    }
}

export default updateSelectedProject