export const UPDATELIST = 'UPDATELIST';

export const updateList = newList => {
    return {
        type: UPDATELIST,
        list: newList
    }
};

export const getList = () => {
    return dispatch => {
        fetch('/api/getList')
            .then(res => res.json())
            .then(list => dispatch(updateList(list)))
    }
}