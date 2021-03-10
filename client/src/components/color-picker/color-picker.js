import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { connect } from 'react-redux'

import { todoColorUpdate } from '../../actoins'
import { compareSync } from 'bcryptjs'

const colorToRGBA = (color) => {
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

const ColorPicker = ({ todoId, todoColor, todoColorUpdate }) => {

	const [displayColorPicker, setDisplayColorPicker] = useState(false)
	const [color, setColor] = useState({ r: '241',g: '112',b: '19',a: '1', })

	const handleClick = () => setDisplayColorPicker(!displayColorPicker)

	const handleClose = () => {
		setDisplayColorPicker(!displayColorPicker)
		if (JSON.stringify(colorToRGBA(color)) !== JSON.stringify(todoColor)) {
			todoColorUpdate(todoId, colorToRGBA(color))
		}
	} 

	const handleChange = (color) => setColor({ ...color.rgb })

	const styles = reactCSS({
		'default': {
			color: {
				width: '25px',
				height: '25px',
				borderRadius: '2px',
				background: todoColor != '' ? todoColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${ color.a })`,
			},
			swatch: {
				padding: '5px',
				borderRadius: '1px',
				display: 'inline-block',
				cursor: 'pointer',
			},
			popover: {
				position: 'absolute',
				zIndex: '2',
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
        <div style={ styles.swatch } onClick={ handleClick }>
          <div style={ styles.color } />
        </div>
        { displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose }/>
          <SketchPicker color={ color } onChange={ handleChange } />
        </div> : null }

      </>
    )
}

const mapStateToProps = (state) => {
	return {
		todoId: state.selectedTodo._id,
		todoColor: state.selectedTodo.background,
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		todoColorUpdate: (id, color) => todoColorUpdate(dispatch, id, color)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)