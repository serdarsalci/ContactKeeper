import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,

} from '../types';

const AuthState = props => {

  const initialState = {

    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true,
    error: null,

  };

  const [state, dispatch] = useReducer(authReducer, initialState);


  // Load User
  const loadUser = async () => {
    // @todo load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {

      const res = await axios.get('/api/auth');

      dispatch({

        type: USER_LOADED,
        payload: res.data
      });
      console.log('load user callled')
      console.log(res.data)
    } catch (err) {
      dispatch({ type: AUTH_ERROR })

    }

  };

  // Register User 

  const register = async formData => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
    console.log('auth context register called')
    try {
      const res = await axios.post('/api/users', formData)
      console.log('register called')
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      // loadUser();

    } catch (err) {
      console.log('register catch de yakalando')
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })

    }
  }

  // Login User 

  const login = () => console.log('load user');

  // Logout 
  const logout = () => console.log('load user');

  // Clear Errors 
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });



  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register, loadUser, login, logout, clearErrors
      }}>
      {props.children}

    </AuthContext.Provider>
  );
};



export default AuthState;