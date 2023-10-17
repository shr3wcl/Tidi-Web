import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            token: null,
            isFetching: false,
            success: false,
            error: false,
            msg: "",
        },
        register: {
            isFetching: false,
            error: false,
            msg: "",
        },
    },

    reducers: {
        registerStart: state => {
            state.register.isFetching = true;
            state.register.msg = "";
        },
        registerSuccess: state => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.msg = "Register Successful";
        },
        registerFail: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.msg = action.payload;
        },

        loginStart: state => {
            state.login.isFetching = true;
            state.login.msg = "";
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload.user;
            state.login.token = action.payload.token;
            state.login.error = false;
            state.login.success = true;
            state.login.msg = "Login Successful";
        },
        loginFail: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.msg = action.payload;
        },
        loginCheck: (state, action) => {
            state.login.token = action.payload;
        },

        logoutStart: state => {
            state.login.isFetching = false;
        },
        logoutSuccess: (state) => {
            state.login.token = null;
            state.login.currentUser = null;
            state.login.success = false;
            state.login.isFetching = true;
        },
        logoutFail: state => {
            state.login.isFetching = false;
            state.login.error = true;
        }
    }
});

export const {
    registerStart,
    registerSuccess,
    registerFail,
    loginStart,
    loginSuccess,
    loginFail,
    loginCheck,
    logoutFail,
    logoutStart,
    logoutSuccess
} = authSlice.actions;

export default authSlice.reducer;
