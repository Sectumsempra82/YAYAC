export const UPDATELIST = 'UPDATELIST';
export const ADDACADEMY = 'ADDACADEMY';

export const updateList = newList => {
    return {
        type: UPDATELIST,
        list: newList
    }
}


export const getList = (dispatch) => () => {
    fetch('/api/getList')
        .then(res => res.json())
        .then(list => dispatch(updateList(list)))
}


export const addAcademy = (dispatch, body) => {
    fetch('/api/addAcademy', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            
            res.json()   
                .then(mess => {
            if (res.status >= 400){
                alert(mess)
            }else{
                if (res.status === 200) {
                    alert("Academy correctly created");
                    window.location.reload();
                }
            }})
        .then(() => dispatch(getList(dispatch)))})      
        .catch(err => dispatch(err))
}
