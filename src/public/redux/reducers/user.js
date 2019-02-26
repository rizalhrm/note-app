const initialState = {
	user: null,
	message: '',
	isLoading: false,
	isLogin: false
}

export default user = (state = initialState, action) => {
	switch(action.type) {
		case 'GET_USER_PENDING':
			return {
				...state,
				isLogin: false
			}
		case 'GET_USER_REJECTED':
			return {
				...state,
				isLogin: false
			}
		case 'GET_USER_FULFILLED':
			return {
				...state,
				user: action.payload.data.data,
				message: 'success',
				isLogin: true
			}
		case 'REGISTER_USER_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'REGISTER_USER_REJECTED':
			return {
				...state,
				isLoading: false,
				isLogin: false
			}
		case 'REGISTER_USER_FULFILLED':
			alert('Register success')
			return {
				...state,
				isLoading: false,
				message: action.payload.data
			}
		case 'EDIT_PROFILE_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'EDIT_PROFILE_REJECTED':
			return {
				...state,
				isLoading: false,
				message: action.payload.data.message
			}
		case 'EDIT_PROFILE_FULFILLED':
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					profile: action.payload.data.data
				}
			}
		case 'LOGOUT':
			return {
				...state,
				isLogin: false,
				user: null
			}
		case 'SHOW_ERROR':
			return {
				...state,
				message: action.payload,
				isLogin: false
			}
		default:
			return state
	}
}