import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards } from '../../actoins'

const CardPage = ({ cards, transferCardsItems, fetchCards }) => {

    useEffect(() => fetchCards(), [fetchCards])
    useEffect(() => saveCards(cards), [cards])

    const checkCard = (result) => {
        const { source, destination } = result

        if (!destination) return
        if ((source.index === destination.index) && (source.droppableId === destination.droppableId)) return
        transferCardsItems(result)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={result => checkCard(result)}>
                <Card columns={cards} />
            </DragDropContext>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { cards: state.cards }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transferCardsItems: (result) => dispatch(transferCardsItems(result)),
        fetchCards: () => fetchCards(dispatch),
        saveCards: (cards) => dispatch(saveCards(cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)