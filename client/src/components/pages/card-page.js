import React, { useEffect, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards, fetchProject } from '../../actoins'
import AuthContext from '../../context'
import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'

import './pages-css/card-page.css'

const CardPage = ({ cards, loading, transferCardsItems, fetchCards, fetchProject }) => {

    const { projectId } = useContext(AuthContext)
    const location = useLocation()

    useEffect(() => {
        if (projectId) fetchCards(projectId)
    }, [fetchCards, projectId])
    useEffect(() => saveCards(cards), [cards])
    useEffect(() => {
        if (projectId) fetchProject(projectId)
    }, [fetchProject, projectId])

    const checkCard = (result) => {
        console.log('location.pathname', location.pathname)
        const { source, destination } = result

        if (!destination) return
        if ((source.index === destination.index) && (source.droppableId === destination.droppableId)) return
        transferCardsItems(result)
    }

    if (loading) return <Spinner />
    if (cards.length===0) return <CreateProjectLink />

    return (
        <div className="card-container">
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
        saveCards: (cards) => dispatch(saveCards(cards)),
        fetchProject: (projectId) => fetchProject(dispatch, projectId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)