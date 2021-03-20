const updateProjects = (state, action) => {

    const initialProjectsState = {
        items: [],
        loading: false,
        error: null,
    }

    if (state === undefined) return initialProjectsState

    switch (action.type) {
        case 'FETCH_PROJECTS_REQUEST':
            return { ...initialProjectsState, loading: true }
        case 'FETCH_PROJECTS_FAILURE':
            return { ...initialProjectsState, error: action.payload }
        case 'FETCH_PROJECTS_SUCCESS':
            return { ...initialProjectsState, items: action.payload }
        default:
            return state.projects
    }
}

export default updateProjects