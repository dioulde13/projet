/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
    // GOOGLE_AUTH_SUCCESS,
    // GOOGLE_AUTH_FAIL,
    // FACEBOOK_AUTH_SUCCESS,
    // FACEBOOK_AUTH_FAIL,
} from '../actions/auth/types';
import {updateObject} from "../utilities"

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    error: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return updateObject(state, {
                isAuthenticated: true
            })
        case LOGIN_SUCCESS:
        // case GOOGLE_AUTH_SUCCESS:
        // case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return updateObject(state, {
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            })
        case SIGNUP_SUCCESS:
            return updateObject(state, {
                isAuthenticated: false
            })
        case USER_LOADED_SUCCESS:
            return updateObject(state, {
                user: payload
            })
        case AUTHENTICATED_FAIL:
            return updateObject(state, {
                isAuthenticated: false
            })
        case USER_LOADED_FAIL:
            return updateObject(state, {
                user: null
            })
        // case GOOGLE_AUTH_FAIL:
        // case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return updateObject(state, {
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: payload
            })
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return updateObject(state, {
                error: payload
            })
        default:
            return state
    }
};
