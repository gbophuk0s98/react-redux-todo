import React, { useState, useEffect, useCallback } from 'react'
import uuid from 'react-uuid'
import { DragDropContext } from 'react-beautiful-dnd'
import Card from '../card'

const columnsFromBackend = {
    [uuid()]: {
        name: 'Задачи',
        items: [
            { id: uuid(), content: '1 task', columnType: 'TaskList' },
            { id: uuid(), content: '2 task', columnType: 'TaskList' },
            { id: uuid(), content: '3 task', columnType: 'TaskList' },
            { id: uuid(), content: '4 task', columnType: 'TaskList' },
            { id: uuid(), content: '5 task', columnType: 'TaskList' },
        ],
        columnType: 'TaskList',
    },
    [uuid()]: {
        name: 'Выбрано для разработки',
        items: [],
        columnType: 'SelectedList',
    },
    [uuid()]: {
        name: 'Выполняется',
        items: [],
        columnType: 'ProcessingList',
    },
    [uuid()]: {
        name: 'Выполнено',
        items: [],
        columnType: 'DoneList',
    }
}

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        removed.columnType = destColumn.columnType
        destItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
    } else {
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
}

export const CardPage = () => {
	const [columns, setColumns] = useState(columnsFromBackend)

    const fetchedColumnsItems = useCallback(() => {
        const coppiedColumns = columns
        Object.entries(coppiedColumns).map(( [id, item] ) => {
            const findedItems = item.items.filter(colItem => colItem.columnType===item.columnType)
            coppiedColumns[id].items = [...findedItems]
            return item
        })
        setColumns(coppiedColumns)
    }, [setColumns, columns])

    useEffect(() => fetchedColumnsItems(), [fetchedColumnsItems])

    return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                <Card columns={columns} />
                {console.log(columns)}
            </DragDropContext>
        </div>
	)
}