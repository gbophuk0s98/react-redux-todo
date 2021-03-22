import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import updateUser from './user-reducer'
import updateSelectedProject from './selected-project-reducer'
import updateProjects from './projects-reducer'
import updateCards from './cards-reducer'
import updateTodos from './todos-reducer'
import updateAppErrors from './app-errors-reducer'
import updateSelectedTodo from './selected-todo-reducer'
import updateAuthForms from './form-reducers'
import updateRecentProjects from './recent-projects-reducer'
import updateAppMessages from './app-messages-reducer'

const reducer = (state, action) => {
    return {
        user: updateUser(state, action),
        projects: updateProjects(state, action),
        cards: updateCards(state, action),
        todos: updateTodos(state, action),
        recentProjects: updateRecentProjects(state, action),
        selectedProject: updateSelectedProject(state, action),
        selectedTodo: updateSelectedTodo(state, action),
        form: updateAuthForms(state, action),
        appErrors: updateAppErrors(state, action),
        appMessages: updateAppMessages(state, action),
        iconOptions: [
            { value: 'Наивысший', label: 'Наивысший', styles: { fill: 'red', opacity: '1' } },
            { value: 'Высокий', label: 'Высокий', styles: { fill: '#ff4d4b', opacity: '0.8' } },
            { value: 'Средний', label: 'Средний', styles: { fill: '#ff902d', opacity: '1' } },
            { value: 'Низкий', label: 'Низкий', styles: { fill: '#2dee36', opacity: '0.8' } },
        ]
    }
}

const persistConfig = {
    key: 'myState',
    storage,
}

export default persistReducer(persistConfig, reducer)