import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import CardItems from '../card-items'

import './card.css'

export const Card = ({ columns }) => {
	
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
					<div style={{ margin: 1 }}>
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
											padding: 4,
											width: 250
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