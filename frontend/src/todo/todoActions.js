import axios from 'axios'

const URL = 'http://localhost:3007/api/todos'

const URLLanguages = 'http://localhost:3007/api/languages'

export const changeDescription = event => {
    return [{ type: 'DESCRIPTION_CHANGED', payload: event.target.value }]
}

export const changeDescriptionValue = (value) => {
    return [{ type: 'DESCRIPTION_CHANGED', payload: value }]
}

export const handlerKey = e => {

    return (dispatch, getState) => {
        const description = getState().todo.description
        if(e.key === 'Enter') {
            e.shiftKey ? search() : add(description);
        }else if(e.key === 'Escape') {
            // console.log("esc");
            clear();
        }
    }

}

export const search = () => {

    // console.log("search");

    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))
    }
}

export const searchLanguages = () => {

    // console.log("search");

    return (dispatch, getState) => {
        const request = axios.get(`${URLLanguages}`)
            .then(resp => dispatch({type: 'LANGUAGE_SEARCHED', payload: resp.data}))
    }
}

export const add = (description) => {
    console.log("add.: ",description);

    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const addLanguage = (name, year) => {
    // console.log("add.: ",description);
    // let name = "C#";
    // let year = "1975";
    return dispatch => {
        axios.post(URLLanguages, { name, year })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch({type: 'TODO_MARKED_AS_DONE', payload: resp.data}))
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(search()))
    }
}

export const removeLanguage = (language) => {
    return dispatch => {
        axios.delete(`${URLLanguages}/${language._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    // console.log("clear");
    return [{ type: 'TODO_CLEAR' }, search()]
}