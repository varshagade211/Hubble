const CREATE = 'note/createNote'
const LOAD= 'notes/load'
const DELETE = 'posts/delete-note'
const EDIT = 'notes/editNote'
// ---------------------------------------------action creator-----------------------------------

const loadNotes = (payload) => ({
    type: LOAD,
    payload,

});

const create = (payload) => ({
    type: CREATE,
    payload,

})


const deleteNote = (id) => {
    return {
        type: DELETE,
        id,
    };
};

const editNote = (updatedComment) => {
    return {
        type: EDIT,
        updatedComment
    }
}
// --------------------------------------------thunk action creator---------------------------------------

export const editComment = (data, id) => async (dispatch) => {
    const response = await fetch(`/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: data.description,

      }),



    })


    const updatedComment = await response.json();

    return dispatch(editNote(updatedComment));
}

export const getAllNotesByPostId = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/notes`)

    if (response.ok) {

        const payload = await response.json();


        dispatch(loadNotes(payload.note))

    }
}

export const getAllNotes = () => async (dispatch) => {
    const response = await fetch(`/api/note/all`)

    if (response.ok) {

        const comment = await response.json();


        dispatch(loadNotes(comment.note))


    }
}

export const createNote = (data, postId) => async (dispatch) => {

    const response = await fetch(`/api/post/${postId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const newnote = await response.json();
    dispatch(create(newnote));
    return newnote
};



export const noteDelete = (id) => async (dispatch) => {
    const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const res = await response.json();
        dispatch(deleteNote(res.noteId));
        return res;
    }
};


// ----------------------------------------reducer----------------------------------------------------

const initialState = {notes: []};

const notesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case LOAD:

            newState = {...state, notes:[...action?.payload]};

            action?.payload?.forEach((note) => { newState[note?.id] = note });
            // console.log(newState.notes, 'NOTES NOTES')
            return newState;

        case CREATE:

            newState = {...state, notes:[...state?.notes, ...action?.payload?.note]};
            newState[action?.payload.id] = action?.payload?.note
            return newState;

        case DELETE: {

          let newNote = state?.notes?.filter(note => { return note?.id !== action?.id})

             newState = {...state, notes:[...newNote]}
             return newState;
        }

        case EDIT: {
           

           
           state?.notes?.forEach((note, i)=>{ 
            
            if(note?.id === action?.updatedComment?.id)

            state?.notes?.splice(i, 1, action?.updatedComment)
            })
    
           newState = {...state, notes:[...state?.notes]}
           newState[action?.updatedComment?.id] = action?.updatedComment
           
           return newState
        }

        default:
            return state;
    }
}

export default notesReducer
