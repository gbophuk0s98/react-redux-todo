import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards } from '../../actoins'
import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'
import { IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

import './pages-css/card-page.css'

const sortCards = (cards, projectItems) => {
    return cards.sort((a, b) => {
        return projectItems.findIndex(({ id }) => id === a._id ) - projectItems.findIndex(({ id }) => id === b._id )
    })
}

const CardPage = ({ cards, loading, transferCardsItems, fetchCards, selectedProject, projectListIsEmpty }) => {

    console.log('cards', cards)
    const history = useHistory()
    console.log(selectedProject)

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
        <div className="page-container">
        <div className="icons-wrapper">
        <IconButton
            edge="end"
            aria-label="settings"
            aria-haspopup="true"
            onClick={() => history.push('/cardsSettings')}
            color="inherit"
        >
            <SettingsIcon />
        </IconButton>
        </div>
        <div className="card-container">
            <DragDropContext onDragEnd={result => checkCard(result)}>
                <Card columns={sortCards(cards, selectedProject.cards)} />
            </DragDropContext>
        </div>
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