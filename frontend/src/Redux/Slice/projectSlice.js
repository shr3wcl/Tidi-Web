import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name: 'project',
    initialState: {
        init: {
            isFetching: false,
            success: false,
            error: false,
            projectCurrent: [],
            msg: ""
        }
    },
    reducers: {
        addStart: state => {
            state.init.isFetching = true;
            state.init.success = false;
            state.init.error = false;
        },
        addSuccess: (state, action) => {
            state.init.isFetching = false;
            state.init.success = true;
            state.init.error = false;
            state.init.msg = action.payload;
        },
        addFailed: (state, action) => {
            state.init.success = false;
            state.init.error = true;
            state.init.msg = action.payload;
        },

        getProjectStart: state => {
            state.init.isFetching = true;
            state.init.success = false;
            state.init.error = false;
        },
        getProjectSuccess: (state, action) => {
            state.init.isFetching = false;
            state.init.success = true;
            state.init.error = false;
            state.init.msg = action.payload;
            state.init.projectCurrent = action.payload;
        },
        getProjectFail: (state, action) => {
            state.init.success = false;
            state.init.error = true;
            state.init.msg = action.payload;
        },
    }
})
export const {
    addStart,
    addSuccess,
    addFailed,
    getProjectSuccess,
    getProjectFail,
    getProjectStart
} = projectSlice.actions;

export default projectSlice.reducer;