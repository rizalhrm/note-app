import axios from 'axios'
import { server } from '../../../server'

export const showError = (message) => {
	return {
		type: 'SHOW_ERROR',
		payload: message
	}
}

export const logout = () => {
	axios.defaults.headers.common['Authorization'] = ''
	return {
		type: 'LOGOUT'
	}
}

export const getUser = ({ id, token }) => {
	axios.defaults.headers.common['Authorization'] = 'Bearer '+token
	return async (dispatch) => {
		try {
			await	dispatch({
					type: 'GET_USER',
					payload: axios.get(`${server.url}/api/v1/user/${id}`)
				})
		} catch(e) {
			dispatch(showError(e.message))
		}
	}
}

export const editProfile = (user_id, { name, birth_date, gender }) => {
	return {
		type: 'EDIT_PROFILE',
		payload: axios.patch(`${server.url}/api/v1/user/${user_id}`, { name, birth_date, gender })
	}
}

export const addUser = ({ email, username, password }) => {
	return {
		type: 'REGISTER_USER',
		payload: axios.post(`${server.url}/api/v1/register`, { email, username, password })
	}
}
