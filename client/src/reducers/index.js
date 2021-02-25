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

const transferItems = (payload, columns) => {
    console.log(payload)
    if (!payload.destination) return
    const { source, destination } = payload
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        removed.columnType = destColumn.columnType
        destItems.splice(destination.index, 0, removed)
        return {
            cards: {
                ...columns,
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
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        console.log(copiedItems)
        return {
            cards:{
                ...columns,
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
            const newq = transferItems(action.payload, state.cards, state)
            console.log(newq)
            return newq
        default:
            return state
    }
}


export default reducer