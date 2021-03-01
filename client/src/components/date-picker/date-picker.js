import React from 'react'

import './date-picker.css'

export const DatePicker = ({ date }) => {

    return (
        <input type="date" name="date" value={date}/>
    )
}