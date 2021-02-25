import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Card from '../card'
import * as actions from '../../actoins'

const CardPage = ({ cards, transferCardsItems }) => {
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
    const { transferCardsItems } = bindActionCreators(actions, dispatch)
    return {
        transferCardsItems
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage)