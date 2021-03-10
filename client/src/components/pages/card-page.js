import React, { useEffect, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards } from '../../actoins'
import AuthContext from '../../context'
import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'

const CardPage = ({ cards, loading, transferCardsItems, fetchCards }) => {

    const { projectId } = useContext(AuthContext)
    const location = useLocation()

    useEffect(() => {
        if (projectId) fetchCards(projectId)
    }, [fetchCards, projectId])
    useEffect(() => saveCards(cards), [cards])

    const checkCard = (result) => {
        console.log('location.pathname', location.pathname)
        const { source, destination } = result

        if (!destination) return
        if ((source.index === destination.index) && (source.droppableId === destination.droppableId)) return
        transferCardsItems(result)
    }

    if (cards.length===0) return <CreateProjectLink />
    if (loading) return <Spinner />

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={result => checkCard(result)}>
                <Card columns={cards} />
            </DragDropContext>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards.items,
        loading: state.cards.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transferCardsItems: (result) => dispatch(transferCardsItems(result)),
        fetchCards: (projectId) => fetchCards(dispatch, projectId),
        saveCards: (cards) => dispatch(saveCards(cards))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)