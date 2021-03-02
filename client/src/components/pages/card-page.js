import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import Card from '../card'
import { transferCardsItems, fetchCards } from '../../actoins'

const CardPage = ({ cards, transferCardsItems, fetchCards }) => {

    useEffect(() => {
        fetchCards()
    }, [fetchCards])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={result => transferCardsItems(result)}>
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
        fetchCards: () => fetchCards(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)