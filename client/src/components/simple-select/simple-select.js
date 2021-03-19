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

const SimpleSelect = ({ selectedTodo, selectedProject, cards, moveCardItem, saveCards }) => {
    
    const [options, setOptions] = useState([])
    const [index, setIndex] = useState(null)
    console.log('seceltedProject', selectedProject)

    useEffect(() => setOptions(selectedProject.cards), [selectedProject.cards])
    useEffect(() => saveCards(cards), [saveCards, cards])
    useEffect(() => {
        cards.forEach((card, index) => {
            // console.log('card', card)
            const [todoInCard] = card.items.filter(item => {
                // console.log('item', item)
                // console.log('index', index)
                return item._id === selectedTodo._id
            })
            // console.log('todoInCard', todoInCard)
            if (todoInCard)  setIndex(index)
            // console.log('----------------------------')
        })
    })

    
    const changeHandler = (data) => {
        const copiedCards = [...cards]
        const targetCardIndex = copiedCards.findIndex((item) => item._id === data.value)

        let currentItemIndex, sourceCardIndex, currentItem
        copiedCards.every((card, index) => {
            currentItemIndex = card.items.findIndex((item) => item._id === selectedTodo._id)
            currentItem = card.items[currentItemIndex]
            if (currentItemIndex >= 0) {
                sourceCardIndex = index
                return false
            }
            return true
        })
        let obj = {
            targetCardIndex: targetCardIndex,
            sourceCardIndex: sourceCardIndex,
            currentItemIndex: currentItemIndex,
            currentItem: currentItem,
        }
    
        moveCardItem({
            targetCardIndex: targetCardIndex,
            sourceCardIndex: sourceCardIndex,
            currentItemIndex: currentItemIndex,
            currentItem: currentItem,
        })
    }

    const myArr = options.map(option => getObj(option))

    return (
        <Select
            value={myArr[index]}
            components={{ Option: CustomOption }}
            options={options.map(option => getObj(option))}
            onChange={(data) => changeHandler(data)}
        />
    )
}

const mapStateToProps = (state) => {

    const { _id,  customId, content, startDate, endDate } = state.selectedTodo

    return {
        cards: state.cards.items,
        selectedProject: state.selectedProject,
        selectedTodo: { _id, customId, content, startDate, endDate }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveCardItem: (transferInfo) => moveCardItem(dispatch, transferInfo),
        saveCards: (cards) => dispatch(saveCards(cards)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleSelect)