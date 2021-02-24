import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import COLUMN_NAMES from '../../constants'

import './movable-item.css'

export const MovableItem = ({ name, index, id, moveCardHandler, currentColumnName, setItems }) => {

    const ref = useRef(null)
    const [, drop] = useDrop(() => ({
        accept: 'Card',
        hover(item, monitor) {
            if (!ref.current) return
            const dragIndex = item.index;
            const hoverIndex = index;
            console.log(1)
            if (dragIndex === hoverIndex) return
            console.log(2)
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
			console.log(3)
            
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
			console.log(4)
            
			console.log(item.currentColumnName)

            moveCardHandler(dragIndex, hoverIndex, item.currentColumnName)

            item.index = hoverIndex
        },
    }), [index, moveCardHandler])

    const [{ isDragging }, drag] = useDrag(() => ({
		item: { index, id, name, currentColumnName, type: 'Card'},
		end: (item, monitor) => {
			console.log(item)
			const dropResult = monitor.getDropResult()
			if (dropResult){
				const { name } = dropResult
				const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES
				switch (name) {
					case DO_IT:
						changeItemColumn(item, DO_IT)
						break
					case IN_PROGRESS:
						changeItemColumn(item, IN_PROGRESS)
						break
					case AWAITING_REVIEW:
						changeItemColumn(item, AWAITING_REVIEW)
						break
					case DONE:
						changeItemColumn(item, DONE)
						break
					default:
						break
				}
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		}),
	}), [name, index])

    const changeItemColumn = (currentItem, columnName) => {
		setItems((prevState) => {
			return prevState.map(e => {
				return {
					...e,
					column: e.id === currentItem.id ? columnName: e.column,
				}
			})
		})
	}

	const opacity = isDragging ? 0.4 : 1

	drag(drop(ref))

    return (
        <div ref={ref} className="movable-item" style={{opacity}}>
            {name}
        </div>
    )
}