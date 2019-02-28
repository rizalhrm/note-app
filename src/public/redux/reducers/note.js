const initialState = {
    notes: [],
    note: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    length: 0,
    lastid: 0
  }
  
  export default note = (state = initialState, action) => {
    switch (action.type) {
  
      case 'ALL_NOTES_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false}
      case 'ALL_NOTES_REJECTED':
        return { ...state, isLoading: false, isError: true }
      case 'ALL_NOTES_FULFILLED':
        return { ...state, isLoading: false, notes: action.payload.data, length: action.payload.data.length}


      case 'LAST_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false}
      case 'LAST_NOTE_REJECTED':
        return { ...state, isLoading: false, isError: true }
      case 'LAST_NOTE_FULFILLED':
        return { ...state, isLoading: false, lastid: action.payload.data + 1}
      
  
      case 'CREATE_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'CREATE_NOTE_FULFILLED':
        state.notes.push(action.payload.data);
        return {...state, notes: state.notes, isLoading: false, isSuccess: true};
      case 'CREATE_NOTE_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      case 'UPDATE_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'UPDATE_NOTE_FULFILLED':
        const newNotesAfterUpdate = state.notes.map(note => {
          if (note.id == action.payload.data.id) {
            return action.payload.data;
          }
          return note;
        })
        return {...state, notes: newNotesAfterUpdate, isLoading: false};
      case 'UPDATE_NOTE_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      case 'DELETE_NOTE_PENDING':
        return {...state, isLoading: true, isSuccess: false, isError: false};
      case 'DELETE_NOTE_FULFILLED':
        return {...state, isLoading: false, isSuccess: true};
      case 'DELETE_NOTE_REJECTED':
        return {...state, isLoading: false, isError: true};
  
      default:
        return state;
  
    }
  }