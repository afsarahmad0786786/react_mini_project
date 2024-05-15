import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import '../../../assets/styles/global.scss'
import { addNoteAction, deleteNoteAction, updateNoteAction } from '../../redux/action/notesAction'; // Adjust the path

const NotesApp = () => {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const [isEditing, setIsEditing] = useState(false);
    const [editNoteId, setEditNoteId] = useState(null);
    const noteInput = useRef(null);

    const addNote = () => {
        const note = noteInput.current.value;
        if (note !== '') {
            dispatch(addNoteAction({
                id: Date.now(),
                text: note
            }));
            noteInput.current.value = '';
        }
    };

    const startEditing = (id, text) => {
        noteInput.current.value = text;
        setEditNoteId(id);
        setIsEditing(true);
    };

    const updateNote = () => {
        if (editNoteId && noteInput.current.value !== '') {
            console.log(editNoteId);
            dispatch(updateNoteAction({
                id: editNoteId,
                text: noteInput.current.value
            }));
            setIsEditing(false);
            setEditNoteId(null);
            noteInput.current.value = ''; // Clear input field after updating
        }
    };

    const deleteNote = (id) => {
        dispatch(deleteNoteAction(id));
    };

    return (
        <>
            <div className='login-form-container'>
                <div className='container mt-3'>
                    <h1>Welcome to Notes App</h1>
                    <input type="text" ref={noteInput} className='form-control my-2' placeholder='Put Your Notes' />
                    {isEditing ? (
                        <button onClick={updateNote} className='btn btn-success'>Update</button>
                    ) : (
                        <button onClick={addNote} className='btn btn-primary'>Add Note</button>
                    )}
                    <div>
                        {notes.map((note) => (
                            <div key={note.id} className="card my-2">
                                <div className="card-body">
                                    <h5 className="card-title">{note.text}</h5>
                                    <div className="text-muted" style={{ fontSize: '0.8rem', position: 'absolute', top: '10px', right: '10px' }}>
                                        {note.timestamp}
                                    </div>
                                    <button onClick={() => startEditing(note.id, note.text)} className='btn btn-info mb-2'>Edit</button>
                                    <button onClick={() => deleteNote(note.id)} className='btn btn-danger'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotesApp;
