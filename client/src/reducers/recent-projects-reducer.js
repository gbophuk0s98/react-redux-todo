const setRecentProjects = (state, project) => {
    let recentProjectsArray = state.recentProjects
    let filterArr = recentProjectsArray.filter(item => item._id === project._id)
    if (filterArr.length === 0) recentProjectsArray.unshift(project)
    if (recentProjectsArray.length === 4) recentProjectsArray.splice(-1, 1)
    console.log('CURRENT ARRAY:', recentProjectsArray)
    return [...recentProjectsArray]
}

const updateRecentProjects = (state, action) => {

    const initialRecentProjectsState = []

    if (state === undefined) return initialRecentProjectsState

    switch (action.type){
        case 'USER_RECENT_PROJECTS':
            return setRecentProjects(state, action.payload)
        default:
            return state.recentProjects
    }
}

export default updateRecentProjects