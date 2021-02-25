import uuid from 'react-uuid'

const initialState = {
    cards: {
        [uuid()]: {
            name: 'Задачи',
            items: [
                { id: uuid(), content: '1 task', columnType: 'TaskList' },
                { id: uuid(), content: '2 task', columnType: 'TaskList' },
                { id: uuid(), content: '3 task', columnType: 'TaskList' },
                { id: uuid(), content: '4 task', columnType: 'TaskList' },
                { id: uuid(), content: '5 task', columnType: 'TaskList' },
            ],
            columnType: 'TaskList',
        },
        [uuid()]: {
            name: 'Выбрано для разработки',
            items: [
                { id: uuid(), content: '1 task', columnType: 'SelectedList' },
                { id: uuid(), content: '2 task', columnType: 'SelectedList' },
                { id: uuid(), content: '3 task', columnType: 'SelectedList' },
                { id: uuid(), content: '4 task', columnType: 'SelectedList' },
                { id: uuid(), content: '5 task', columnType: 'SelectedList' },
            ],
            columnType: 'SelectedList',
        },
        [uuid()]: {
            name: 'Выполняется',
            items: [],
            columnType: 'ProcessingList',
        },
        [uuid()]: {
            name: 'Выполнено',
            items: [],
            columnType: 'DoneList',
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'FETCH_BOOKS_REQUEST':
            console.log('FETCH_BOOKS_REQUEST()')
            return state
        default:
            return state
    }
}


export default reducer