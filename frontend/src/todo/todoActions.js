import axios from 'axios'

import faker from 'faker'

const URL = 'http://localhost:3007/api/todos'

const URLLanguages = 'http://localhost:3007/api/languages'

faker.locale = "pt_BR";



const popula = () => {

    let pessoas = [];

    for (var i = 0; i< 50; i++){
        pessoas.push(faker.name.findName());
    
        // console.log("faker.: ",pessoas[i]);
    }

    return pessoas
}

    let nomesPessoas = popula();


export const searchPeople = (searchText) => {

    

    let filter = nomesPessoas.filter( (nomesPessoas) => {
        return nomesPessoas.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

    if(filter.length > 10 ){
        filter = filter.slice(0,10);
    }

    return [{ type: 'OPTIONS_SEARCHED', payload: Object.values(filter) }]
}

export const changeDescription = event => {
    return [{ type: 'DESCRIPTION_CHANGED', payload: event.target.value }]
}

export const changeDescriptionValue = (value) => {
    return [{ type: 'DESCRIPTION_CHANGED', payload: value }]
}


export const search = () => {

    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))
    }
}

export const searchLanguages = () => {

    return (dispatch, getState) => {
        const request = axios.get(`${URLLanguages}`)
            .then(resp => dispatch({type: 'LANGUAGE_SEARCHED', payload: resp.data}))
    }
}

export const add = (description) => {

    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const addLanguage = (name, year) => {
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
    return [{ type: 'TODO_CLEAR' }, search()]
}