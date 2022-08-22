const CREATE = 'note/createNote'
const LOAD= 'notes/load'
const DELETE = 'posts/delete-note'

// ---------------------------------------------action creator-----------------------------------

const loadNotes = (payload) => ({
    type: LOAD,
    payload,

});

const create = (payload) => ({
    type: CREATE,
    payload,

})


const deletenote = (payload) => {
    return {
        type: DELETE,
        payload,
    };
};

// --------------------------------------------thunk action creator---------------------------------------

export const getAllNotesByNoteId = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/${id}/notes`)

    if (response.ok) {

        const payload = await response.json();
        // console.log("THIS IS PAYLOAD",payload.note)

        dispatch(loadNotes(payload.note))   
        
    }
}

export const getAllNotes = () => async (dispatch) => {
    const response = await fetch(`/api/note/all`)

    if (response.ok) {

        const comment = await response.json();
        

        dispatch(loadNotes(comment.note))
        console.log("THIS IS COMMENT", comment)   
        
    }
}

export const createnote = (data, spotId) => async (dispatch) => {

    const response = await fetch(`/Notes/${spotId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });


    const newnote = await response.json();
    dispatch(create(newnote));
    return newnote


};



export const noteDelete = (id) => async (dispatch) => {
    const response = await fetch(`/Notes/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            id,
        }),
    });
    if (response.ok) {
        const res = await response.json();
        dispatch(deletenote(res));
        return res;
    }
};


// ----------------------------------------reducer----------------------------------------------------

const initialState = [];

const notesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case LOAD:
            newState = {};
            
            action.payload.forEach((note) => { newState[note.id] = note });
            return { ...newState};

        case CREATE:
            //console.log("ACTION ITEM", state);
            newState = { ...state }
            newState[action.payload.id] = action.payload

            //console.log("ACTION ", newState);
            return newState;

        case DELETE: {
             newState = { ...state };
            delete newState[action.payload];
            return newState;
        }

        default:
            return state;
    }
}

export default notesReducer