import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import CardItems from '../card-items'

import './card.css'

export const Card = ({ columns }) => {
	console.log(columns)	
	return (
		<>
		{Object.entries(columns).map(([ id, column ]) => {
			return (
				<div className="card" key={id}>
					<div className="card-title">
						<div className="card-title-text">
							{column.name}
						</div>
						<div className="card-title-count">
							<span>{column.items.length}</span>
						</div>
					</div>
					<div className="card-items" style={{ margin: 1, padding: 5 }}>
						<Droppable droppableId={id.toString()} key={id}>
							{(provided, snapshot) => {
								return (
									<div
										className="card-items-droppable"
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											background: snapshot.isDraggingOver ? 'lightblue': '#303030',
											border: snapshot.isDraggingOver ? 2 + 'px dashed rgb(16,59,68)': '',
										}}
									>
										<CardItems items={column.items} />
										{provided.placeholder}
									</div>
								)
							}}
						</Droppable>
					</div>

				</div>
			)
		})}
		</>
	)
}