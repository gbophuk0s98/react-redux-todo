import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { moveCardItem, saveCards } from '../../actoins'

const CustomOption = ({ data, innerRef, innerProps }) => {
    return (
        <div className="select-option" style={{ cursor: 'pointer' }} ref={innerRef} {...innerProps}>
            <span className="priority-text">{data.label}</span>
        </div>
    )
}

const getObj = (card) => {
    return {
        value: card.id,
        label: card.name
    }
}

const SimpleSelect = ({ todoId, selectedProject, cards, projectId, moveCardItem, saveCards }) => {
    
    const [options, setOptions] = useState([])
    
    useEffect(() => setOptions(selectedProject.cards), [selectedProject.cards])
    useEffect(() => saveCards(cards), [saveCards, cards])

    const changeHandler = (data) => {
        const copiedCards = [...cards]
        const targetCardIndex = cards.findIndex(({ _id }) => _id === data.value)

        let currentItemIndex, sourceCardIndex, currentItem
        copiedCards.every((card, index) => {
            currentItemIndex = card.items.findIndex(({ _id }) => _id === todoId)
            currentItem = card.items[currentItemIndex]
            sourceCardIndex = index
            console.log('currentItemIndex', currentItemIndex)
            if (currentItemIndex >= 0) return false
            return true
        })
        moveCardItem({
            targetCardIndex: targetCardIndex,
            sourceCardIndex: sourceCardIndex,
            currentItemIndex: currentItemIndex,
            currentItem: currentItem
        })
    }

    const myArr = options.map(option => getObj(option))

    return (
        <Select
            value={myArr[0]}
            components={{ Option: CustomOption }}
            options={myArr}
            onChange={(data) => changeHandler(data)}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards.items,
        selectedProject: state.selectedProject,
        projectId: state.selectedProject._id       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveCardItem: (transferInfo) => dispatch(moveCardItem(transferInfo)),
        saveCards: (cards) => dispatch(saveCards(cards)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSelect)