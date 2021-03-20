const updatePosNumbers = (arr) => {
    return arr.map((el, index) => {
        el.posNumber = index
        return el
    })
}

const transferItems = (state, payload) => {
    if (!payload.destination) return state
    let newCards = []
    const { source, destination } = payload
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = state.cards.items[source.droppableId]
        const destColumn = state.cards.items[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        newCards = state.cards.items.map((el, index) => {
            if (index.toString() === source.droppableId) return { ...el, items: updatePosNumbers(sourceItems) }
            if (index.toString() === destination.droppableId) return { ...el, items: updatePosNumbers(destItems) }
            return el
        })
    } else {
        const column = state.cards.items[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        newCards = state.cards.items.map((el, index) => {
            if (index.toString() === source.droppableId) return { ...el, items: updatePosNumbers(copiedItems) }
            return el
        })
    }

    return {
        items: newCards,
        loading: false,
        error: null
    }
}

const moveItem = (state, payload) => {

    let newCards, newTargetCardIndex
    const { sourceCardIndex, targetCardIndex, currentItemIndex, currentItem } = payload
    const copiedCardsItems = [...state.cards.items]
    console.log('reducer !!', payload)
    if ((!sourceCardIndex && sourceCardIndex === undefined) || sourceCardIndex < 0 || !currentItem) {
        console.log('Условие сработало в редьюсере')
        console.log('!sourceCardIndex', !sourceCardIndex)
        console.log('sourceCardIndex < 0', sourceCardIndex < 0)
        console.log('!currentItem', !currentItem)
        console.log('copiedCardsItems', copiedCardsItems)
        newTargetCardIndex = targetCardIndex
        if (targetCardIndex < 0) newTargetCardIndex = 0
        console.log('newTargetCardIndex', newTargetCardIndex)
        copiedCardsItems[newTargetCardIndex].items.push(state.selectedTodo)
        newCards = copiedCardsItems.map((el, index) => {
            if (index === newTargetCardIndex) return { ...el, items: updatePosNumbers(copiedCardsItems[newTargetCardIndex].items) }
            return el
        })
    }
    else {
        console.log('Условие не сработало в редьюсере')
        copiedCardsItems[sourceCardIndex].items = [
            ...copiedCardsItems[sourceCardIndex].items.slice(0, currentItemIndex),
            ...copiedCardsItems[sourceCardIndex].items.slice(currentItemIndex + 1)
        ]
        copiedCardsItems[targetCardIndex].items.push(currentItem)

        newCards = copiedCardsItems.map((el, index) => {
            if (index === sourceCardIndex) return { ...el, items: updatePosNumbers(copiedCardsItems[sourceCardIndex].items) }
            if (index === targetCardIndex) return { ...el, items: updatePosNumbers(copiedCardsItems[targetCardIndex].items) }
            return el
        })
        console.log('newCards', newCards)
    }

    return {
        loading: false,
        error: null,
        items: newCards
    }
}

const updateCards = (state, action) => {

    const initialCardsState = {
        items: [],
        loading: false,
        error: null,
    }

    if (state === undefined) return initialCardsState

    switch (action.type) {
        case 'FETCH_CARDS_REQUEST':
            return { ...initialCardsState, loading: true }
        case 'FETCH_CARDS_FAILURE':
            return { ...initialCardsState, error: action.payload }
        case 'FETCH_CARDS_SUCCESS':
            return { ...initialCardsState, items: action.payload }
        case 'TRANSFER_CARDS_ITEMS':
            return transferItems(state, action.payload)
        case 'MOVE_CARD_ITEM':
            return moveItem(state, action.payload)
        default:
            return state.cards
    }

}

export default updateCards