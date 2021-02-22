import React, { useState } from 'react'
import ItemList from '../item-list'

import './app.css'

const App = () => {

    const [cards, setCards] = useState([
        { id: 1, title: "Доска 1", 
        items: [
            { id: 1, title: "111111111111111"},
            { id: 2, title: "222222222222222"},
            { id: 3, title: "333333333333333"},
            { id: 4, title: "444444444444444"},
        ]},
        { id: 2, title: "Доска 2", 
        items: [
            { id: 6, title: "AAAAAAAAAAAAAAA"},
            { id: 7, title: "BBBBBBBBBBBBBBB"},
            { id: 8, title: "CCCCCCCCCCCCCCC"},
            { id: 9, title: "DDDDDDDDDDDDDDD"},
        ]},
        { id: 3, title: "Доска 3", 
        items: [
            { id: 10, title: "Дело 1, Доска 3"},
            { id: 11, title: "Дело 2, Доска 3"},
            { id: 12, title: "Дело 3, Доска 3"},
            { id: 13, title: "Дело 4, Доска 3"},
        ]},
    ])
    const [currentItem, setCurrentItem] = useState(null)
    const [currentCard, setCurrentCard] = useState(null)

    const getIndex = (board) => board.items.indexOf(currentItem)

    const getNewBoard = (board) => {
        return cards.filter(item => {
            if (item.id === board.id) return board
            if (item.id === currentCard.id) return currentCard 
            return item
        })
    }

    const deleteItemFromCard = () => {
        const currentIdx = getIndex(currentCard)
        currentCard.items.splice(currentIdx, 1)
    }

    const updateBoards = (e, board) => {
        setCards(getNewBoard(board))
        e.target.style.boxShadow = 'none'
        setCurrentItem(null)
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'item') e.target.style.boxShadow = '0 2px 3px gray'
    }

    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dragStartHandler = (e, board, item) => {
        setCurrentCard(board)
        setCurrentItem(item)
    }

    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }

    const dropItemHandler = (e, board, item) => {
        e.stopPropagation()
        if (currentItem) {
            deleteItemFromCard()

            const dropIdx = board.items.indexOf(item)
            board.items.splice(dropIdx + 1, 0, currentItem)

            updateBoards(e, board)
        }
    }

    const swapCard = (board) => {
        return cards.map(card => {
            if (card.id === board.id) return { ...card, id: currentCard.id }
                if (card.id === currentCard.id) return { ...card, id: board.id }
                return card
        })
    }

    const dropCardHandler = (e, board) => {
        e.stopPropagation()
        if (currentItem) {
            deleteItemFromCard()

            board.items.push(currentItem)

            updateBoards(e, board)
        } else setCards(swapCard(board))
    }
    
    const dragStartCardHandler = (board) => setCurrentCard(board)

    const sortCards = (a, b) => {
        if (a.id > b.id) return 1
        return -1
    }


    return(
        <div className="container app">
            <div 
                className="cards-list"
            >
            {
                cards.sort(sortCards).map((board, index) => 
                    <div
                        draggable={true}
                        onDragOver={e => dragOverHandler(e)}
                        onDrop={e => dropCardHandler(e, board)}
                        onDragStart={e => dragStartCardHandler(board)}
                        className="board"
                        key={ index }
                    >
                        <div className="board-title">{ board.title }</div>
                        <ItemList
                            board={board}
                            dragOverHandler={dragOverHandler}
                            dragLeaveHandler={dragLeaveHandler}
                            dragStartHandler={dragStartHandler}
                            dragEndHandler={dragEndHandler}
                            dropItemHandler={dropItemHandler}
                        />
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default App