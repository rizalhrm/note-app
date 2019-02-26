import axios from "axios";
import { server } from '../../../server';

export const getProfile = token => {
	return {
	  type: "GET_PROFILE",
	  payload: axios({
		method: "post",
		url: `${server.url}api/v1/auth/profile`,
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  })
	};
  };
  
export const login = body => {
	return {
	  type: "LOGIN",
	  payload: axios({
		method: "post",
		url: `${server.url}api/v1/auth/login`,
		data: body
	  })
	};
  };
  
  
export const newToken = token => {
	return {
	  type: "REFRESH_TOKEN",
	  payload: axios({
		method: "post",
		url: `${server.url}api/v1/auth/refresh_token`,
		data: {
		  refresh_token: token
		}
	  })
	};
  };

export const logout = token => {
  return {
    type: "LOGOUT",
    payload: axios({
      method: "post",
      url: `${server.url}/api/v1/auth/logout`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };
};
