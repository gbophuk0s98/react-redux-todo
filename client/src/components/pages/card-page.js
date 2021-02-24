import React, { useState } from 'react'

import COLUMN_NAMES from '../../constants'
import Card from '../card'
import MovableItem from '../movable-item'
import tasks from '../../tasks'

export const CardPage = () => {

    const [items, setItems] = useState(tasks)
	const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES

	const moveCardHandler = (dragIndex, hoverIndex, columnName) => {
		const dragItem = items[dragIndex]
		console.log('dragItem', dragItem)

		if (dragItem && dragItem.column===columnName) {
			setItems(prevState => {
				const coppiedStateArray = [...prevState]
				console.log(coppiedStateArray)
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
					id={item.id}
					currentColumnName={item.column}
					moveCardHandler={moveCardHandler}
				/>))
	}
	

    return(
		<>
			<Card title={DO_IT}>
				{returnItemsForColumn(DO_IT)}
			</Card>
			<Card title={IN_PROGRESS}>
				{returnItemsForColumn(IN_PROGRESS)}
			</Card>
			<Card title={AWAITING_REVIEW}>
				{returnItemsForColumn(AWAITING_REVIEW)}
			</Card>
			<Card title={DONE}>
				{returnItemsForColumn(DONE)}
			</Card>
		</>
    )
}