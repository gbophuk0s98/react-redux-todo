import React, { useEffect, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards } from '../../actoins'
import AuthContext from '../context'

const CardPage = ({ cards, transferCardsItems, fetchCards }) => {

    const { projectId } = useContext(AuthContext)

    useEffect(() => {
        fetchCards(projectId)
    }, [fetchCards, projectId])
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
        fetchCards: (projectId) => fetchCards(dispatch, projectId),
        saveCards: (cards) => dispatch(saveCards(cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)