import * as actionTypes from './actions';
const initialState = {
    list: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATELIST:
                return {
                    ...state,
                    list: action.list
                }
        default:
            return {
                ...state
            }
    }
    

}

export default reducer;