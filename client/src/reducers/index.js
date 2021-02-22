const initialState = {
    cards: [
        {
            title: 'First card',
            quantityTodo: 10, 
        },
        {
            title: 'Second card',
            quantityTodo: 5,
        }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'TEST_ACTION':
            console.log('TEST_ACTION')
            return state
        default:
            return "hello"
            return state
    }
}


export default reducer