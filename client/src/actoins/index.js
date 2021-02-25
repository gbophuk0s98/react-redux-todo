const cardsRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
}

const transferCardsItems = (result) => {
    return {
        type: 'TRANSFER_CARDS_ITEMS',
        payload: result
    }
}

export {
    cardsRequested,
    transferCardsItems
}