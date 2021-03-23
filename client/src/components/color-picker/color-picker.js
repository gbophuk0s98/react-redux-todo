import React, { useEffect, useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { connect } from 'react-redux'

import { todoUpdate } from '../../actoins'

import './color-picker.css'

const colorToRGBA = (color) => {
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

const ColorPicker = ({ headers, todoId, todoColor, todoUpdate, selectedProject }) => {

	const [displayColorPicker, setDisplayColorPicker] = useState(false)
	const [color, setColor] = useState({ r: '241', g: '112', b: '19', a: '1' })

	useEffect(() => {
		let colorObj = { r: '241', g: '112', b: '19', a: '1' }
		let arrOfNumbers = todoColor.match(/\d+/g)
		if (arrOfNumbers) {
			if (arrOfNumbers.length === 4) {
				colorObj = { r: arrOfNumbers[0], g: arrOfNumbers[1], b: arrOfNumbers[2], a: arrOfNumbers[3] }
			}
		}
		setColor(colorObj)
	}, [todoColor])

	const handleClick = () => setDisplayColorPicker(!displayColorPicker)

	const handleClose = () => {
		setDisplayColorPicker(false)
		if (JSON.stringify(colorToRGBA(color)) !== JSON.stringify(todoColor)) {
			todoUpdate(todoId, headers, colorToRGBA(color))
		}
	} 

	const handleChange = (color) => setColor({ ...color.rgb })

	const styles = reactCSS({
		'default': {
			color: {
				width: '30px',
				height: '30px',
				borderRadius: '2px',
				background: `rgba(${color.r}, ${color.g}, ${color.b}, ${ color.a })`,
			},
			swatch: {
				padding: '5px',
				borderRadius: '1px',
				display: 'inline-block',
				cursor: 'pointer',
			},
			popover: {
				position: 'absolute',
				zIndex: '9999',
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px',
			},
		},
	})

	return (
		<>
		<div className="color-picker-container" style={ styles.swatch } onClick={ handleClick }>
			<div style={ styles.color } />
		</div>
		{ 
		displayColorPicker ? 
		<div style={ styles.popover }>
			<div style={ styles.cover } onClick={ handleClose }/>
				<SketchPicker color={ color } onChange={ handleChange } />
			</div>
		: null
		}
		</>
    )
}

const mapStateToProps = (state) => {
	return {
		todoId: state.selectedTodo._id,
		todoColor: state.selectedTodo.background,
		selectedProject: state.selectedProject,
		headers: {
            User: `Id ${state.user.id}`,
            Token: `Bearer ${state.user.token}`,
            Project: `Id ${state.selectedProject._id}`
        }
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		todoUpdate: (id, headers, color) => dispatch(todoUpdate(id, headers, null, null, color))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)