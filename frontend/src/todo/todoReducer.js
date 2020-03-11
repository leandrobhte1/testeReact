const INITIAL_STATE = {description: '',list: [], languages: [], options: []}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'DESCRIPTION_CHANGED':
            return { ...state, description: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload}
        case 'LANGUAGE_SEARCHED':
            // console.log("lan.: ",action.payload);
            return { ...state, languages: action.payload}
        case 'OPTIONS_SEARCHED':
            return { ...state, options: action.payload}
        case 'TODO_CLEAR':
            return { ...state, description: ''}
        default:
            return state
    }
}