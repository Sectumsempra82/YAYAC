export const UPDATELIST = 'UPDATELIST';
export const ADDACADEMY = 'ADDACADEMY';

export const updateList = newList => {
    return {
        type: UPDATELIST,
        list: newList
    }
};

export const getList = () => {
    //added fetch as arg to allow easier testing
    // eslint-disable-next-line no-use-before-define
    return (dispatch, fetch=fetch) => {
        fetch('/api/getList')
            .then(res => res.json())
            .then(list => dispatch(updateList(list)))
    }
}

export const addAcademy = (body) => {
    //added fetch as arg to allow easier testing
    // eslint-disable-next-line no-use-before-define
    return (dispatch, fetch=fetch) => {
        fetch('/api/addAcademy', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            res.json()
            .then((mess) => {
                if (res.status >= 400){
                    alert(mess)
                }else{
                    if (res.status === 200) {
                        alert("Academy correctly created");
                        window.location.reload();
                    }
                }
                ;
                return  mess})})
            
        .catch(err => alert(err))
    }
}
