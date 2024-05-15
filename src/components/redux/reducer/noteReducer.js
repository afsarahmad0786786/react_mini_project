import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from '../action/notesAction';

const initialState = {
    notes: [
        { id: Date.now() + 1, text: 'First default note', timestamp: new Date().toLocaleString() },
        { id: Date.now() + 2, text: 'Second default note', timestamp: new Date().toLocaleString() },
        { id: Date.now() + 3, text: 'Third default note', timestamp: new Date().toLocaleString() },
        { id: Date.now() + 4, text: 'Fourth default note', timestamp: new Date().toLocaleString() },
        { id: Date.now() + 5, text: 'Fifth default note', timestamp: new Date().toLocaleString() }
    ]
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            };
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ? { ...note, text: action.payload.text } : note
                )
            };
        default:
            return state;
    }
};

export default notesReducer;
