const initialState = {
    list: []
}

const reducer = (state = initialState, action) => {
    if (action.type === 'GETLIST') {
        return {
            list: ['a1','b1', 'c1']
        }
    }
    
    return state;
}

export default reducer;