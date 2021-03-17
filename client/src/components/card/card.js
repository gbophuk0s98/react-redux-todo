import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import CardItems from '../card-items'
import { Card as MaterialCard, CardContent, Typography, makeStyles } from '@material-ui/core'

import './card.css'

export const Card = ({ columns }) => {

	const useStyles = makeStyles({
		card: {
			minHeight: '166px',
			height: 'max-content',
			maxWidth: '600px',
			width: '100%',
			margin: '5px',
			boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
			borderRadius: '5px',
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			color: '#201E1E',
			flexDirection: 'column',
			alignItems: 'center',
		},
		cardContent: {
			width: '100%',
			padding: '5px 0px',
			'&:last-child': {
				paddingBottom: '5px',
			}
		},
	})

	const classes = useStyles()

	return (
		<>
		{Object.entries(columns).map(([ id, column ]) => {
			return (
				<MaterialCard className={classes.card} key={id}>
					<CardContent className={classes.cardContent}>
					<Typography>
							{column.name} {column.items.length}
					</Typography>
					<div className="card-items" style={{ margin: 1, padding: 5, width: '100%' }}>
						<Droppable droppableId={id.toString()} key={id}>
							{(provided, snapshot) => {
								return (
									<div
										className="card-items-droppable"
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											background: snapshot.isDraggingOver ? 'lightblue': '',
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
					</CardContent>
				</MaterialCard>
			)
		})}
		</>
	)
}