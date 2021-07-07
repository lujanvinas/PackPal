import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null, 
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User (checking which user is logged in)
    const loadUser = () => console.log('loaduser');

    // Register User (sign user up, get token back)
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)
            // if OK
            dispatch({
                type: REGISTER_SUCCESS, 
                payload: res.data
            });
            // if ERROR
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL, 
                payload: err.response.data.msg
            });
        }
    }

    // Login User (log user in, get token)
    const login = () => console.log('login');

    // Logout (destroy token)
    const logout = () => console.log('logout');

    // Clear Errors (in state)
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }}
            >
            { props.children }
        </AuthContext.Provider>
    )
};

export default AuthState;