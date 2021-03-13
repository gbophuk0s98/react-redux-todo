import React, { useEffect, useContext } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards } from '../../actoins'
import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'

import './pages-css/card-page.css'

const CardPage = ({ cards, loading, transferCardsItems, fetchCards, selectedProject, projectListIsEmpty }) => {

    const location = useLocation()

    useEffect(() => {
        if (selectedProject._id) fetchCards(selectedProject._id)
    }, [fetchCards, selectedProject])
    useEffect(() => saveCards(cards), [cards])

    const checkCard = (result) => {
        const { source, destination } = result

        if (!destination) return
        if ((source.index === destination.index) && (source.droppableId === destination.droppableId)) return
        transferCardsItems(result)
    }

    if (projectListIsEmpty) return <CreateProjectLink />
    if (!selectedProject._id) return <>Выберите проект</>
    if (loading) return <Spinner />

    return (
        <div className="card-container">
            <DragDropContext onDragEnd={result => checkCard(result)}>
                <Card columns={cards} />
            </DragDropContext>
        </div>
    )
}

const mapStateToProps = (state) => {
    const projectListIsEmpty = state.projects.items.length === 0
    return {
        cards: state.cards.items,
        loading: state.cards.loading,
        selectedProject: state.selectedProject,
        projectListIsEmpty,
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