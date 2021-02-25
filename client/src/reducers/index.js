import { STATES } from 'mongoose'
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

const transferItems = (payload, state) => {
    if (!payload.destination) return state
    const { source, destination } = payload
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = state.cards[source.droppableId]
        const destColumn = state.cards[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        removed.columnType = destColumn.columnType
        destItems.splice(destination.index, 0, removed)
        return {
            cards: {
                ...state.cards,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }
        }
    } else {
        const column = state.cards[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        return {
            cards:{
                ...state.cards,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'FETCH_BOOKS_REQUEST':
            return state
        case 'TRANFER_CARDS_ITEMS':
            return transferItems(action.payload, state)
        default:
            return state
    }
}


export default reducer