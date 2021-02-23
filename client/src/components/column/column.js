import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import COLUMN_NAMES from '../../constants'

import './column.css'

export const Column = ({ children, className, title }) => {
	
	const [classes, setClasses] = useState(className)
	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: 'Our first type',
		drop: () => ({ name: title }),
		collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
		canDrop: (item) => {
			const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES
			const { currentColumnName } = item
			return (currentColumnName === title) || 
			(currentColumnName === DO_IT && title === IN_PROGRESS) ||
			(currentColumnName === IN_PROGRESS && (title === DO_IT || title === AWAITING_REVIEW)) ||
			(currentColumnName === AWAITING_REVIEW && (title === IN_PROGRESS || title === DONE)) ||
			(currentColumnName === DONE && (title === AWAITING_REVIEW))
		}
	}))

	const getBackgroundColor = () => {
		if (isOver) {
			if (canDrop) return 'rgb(0, 188, 140)'
			return 'rgb(231, 76, 60)'
		}
		return ''
	}

	return (
		<div ref={drop} className={className} style={{backgroundColor: getBackgroundColor()}}>
			{/* <div className="column-title">{title}</div> */}
			<div className="card-header column-title">{title}</div>
				<div className="card-body">
					{children}
				</div>
		</div>
	)
}