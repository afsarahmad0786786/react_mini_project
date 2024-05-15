// Action Types
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';


export const addNoteAction = (note) => {
    return {
        type: 'ADD_NOTE',
        payload: {
            id: note.id,
            text: note.text,
            timestamp: new Date().toLocaleString() // Storing the current date and time
        }
    };
};


export const deleteNoteAction = (id) => ({
    type: DELETE_NOTE,
    payload: id
});

// Redux Action to update a note
export const updateNoteAction = (note) => {
    return {
        type: 'UPDATE_NOTE',
        payload: note
    };
};

