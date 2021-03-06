import axios from "axios";
import { server } from '../../../server';

export const allNote = () => {
    return {
      type: 'ALL_NOTES',
      payload: axios({
                  method: 'GET',
                  url: `${server.url}/api/v1/notes`
               })
    }
}

export const lastNote = () => {
  return {
    type: 'LAST_NOTE',
    payload: axios({
                method: 'GET',
                url: `${server.url}/api/v1/notes/lastid`
             })
  }
}

export const createNote = (body) => {
    return {
      type: 'CREATE_NOTE',
      payload: axios({
        method: 'POST',
        url: `${server.url}/api/v1/notes`,
        data: body
      })
    }
}

export const updateNote = (value) => {
    return {
      type: 'UPDATE_NOTE',
      payload: axios({
        method: 'PATCH',
        url: `${server.url}/api/v1/note/${value.id}`,
        data: value
      })
    }
}

export const deleteNote = (value) => {
    return {
      type: 'DELETE_NOTE',
      payload: axios({
        method: 'DELETE',
        url: `${server.url}/api/v1/note/${value.id}`
      }),
    }
  }
  