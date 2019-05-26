export const UPDATELIST = 'UPDATELIST';
export const ADDACADEMY = 'ADDACADEMY';

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

export const addAcademy = (body) => {
    return dispatch => {
        fetch('/api/addAcademy', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => { return res.json()})
        .catch(err => alert(err))
    }
}