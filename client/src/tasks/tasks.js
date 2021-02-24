import COLUMN_NAMES from '../constants';

const { DO_IT, IN_PROGRESS } = COLUMN_NAMES;
export const tasks = [
    {id: 1, name: 'Item 1', column: DO_IT},
    {id: 2, name: 'Item 2', column: DO_IT},
    {id: 3, name: 'Item 3', column: DO_IT},
    {id: 4, name: 'Item 4', column: DO_IT},
    {id: 11, name: 'Item 1', column: IN_PROGRESS},
    {id: 22, name: 'Item 2', column: IN_PROGRESS},
    {id: 33, name: 'Item 3', column: IN_PROGRESS},
    {id: 44, name: 'Item 4', column: IN_PROGRESS},
];