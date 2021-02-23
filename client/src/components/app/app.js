import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import COLUMN_NAMES from '../../constants'
import Column from '../column'
import MovableItem from '../movable-item'
import tasks from '../../tasks'

import './app.css'

export const App = () => {
    const [items, setItems] = useState(tasks)
	const isMobile = window.innerWidth < 600

	const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES

	const moveCardHandler = (dragIndex, hoverIndex) => {
		const dragItem = items[dragIndex]
		if (dragItem) {
			setItems(prevState => {
				const coppiedStateArray = [...prevState]

				const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem)

				coppiedStateArray.splice(dragIndex, 1, prevItem[0])
				
				return coppiedStateArray
			})
		}
	}

	const returnItemsForColumn = (columnName) => {
		return items
			.filter(item => item.column === columnName)
			.map((item, index) => (
				<MovableItem 
					key={item.id}
					name={item.name}
					setItems={setItems}
					index={index}
					currentColumnName={item.column}
					moveCardHandler={moveCardHandler}
				/>))
	}


	return (
		<div className="container">
			<DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
				<Column title={DO_IT} className='card border-light mb-3'>
					{returnItemsForColumn(DO_IT)}
				</Column>
				<Column title={IN_PROGRESS} className='card border-light mb-3'>
					{returnItemsForColumn(IN_PROGRESS)}
				</Column>
				<Column title={AWAITING_REVIEW} className='card border-light mb-3'>
					{returnItemsForColumn(AWAITING_REVIEW)}
				</Column>
				<Column title={DONE} className='card border-light mb-3'>
					{returnItemsForColumn(DONE)}
				</Column>
			</DndProvider>
		</div>
	)
}