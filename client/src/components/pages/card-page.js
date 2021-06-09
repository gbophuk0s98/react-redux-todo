import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Card from '../card'
import { transferCardsItems, fetchCards, saveCards } from '../../actoins'
import Spinner from '../spinner'
import CreateProjectLink from '../create-project-link'
import { IconButton, makeStyles } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

import './pages-css/card-page.css'

const sortCards = (cards, projectItems) => {
    return cards.sort((a, b) => {
        return projectItems.findIndex(({ id }) => id === a._id) - projectItems.findIndex(({ id }) => id === b._id)
    })
}

const useStyles = makeStyles(theme => ({
    pageContainer: {

    },
    cardContainer: {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-around',
        height: '100%',
        [theme.breakpoints.down('1300')]: {
            width: '100%'
        },
        [theme.breakpoints.down('900')]: {
            justifyContent: 'space-around',
            flexWrap: 'wrap',
        }
    },
    card: {
        height: 'max-content',
        [theme.breakpoints.up('900')]: {
            width: 'calc(25% - 20px)',
            marginBottom: '20px',
        },
        [theme.breakpoints.down('900')]: {
            width: 'calc(50% - 20px)',
            marginBottom: '20px',
        },
        [theme.breakpoints.down('480')]: {
            width: 'calc(100% - 20px)',
            marginBottom: '20px',
        }
    }
}))

const CardPage = ({ headers, cards, loading, transferCardsItems, fetchCards, selectedProject, projectListIsEmpty, saveCards }) => {

    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        if (selectedProject._id) fetchCards(headers)
    }, [fetchCards, selectedProject])
    useEffect(() => saveCards(cards), [saveCards, cards])

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
                    <SettingsIcon color="primary" />
                </IconButton>
            </div>
            <div className={classes.cardContainer}>
                <DragDropContext onDragEnd={result => checkCard(result)}>
                    <Card styles={classes.card} columns={sortCards(cards, selectedProject.cards)} />
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
        headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        transferCardsItems: (result) => dispatch(transferCardsItems(result)),
        fetchCards: (headers) => dispatch(fetchCards(headers)),
        saveCards: (cards, headers) => dispatch(saveCards(cards, headers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)