import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'auth',
    initialState: {
        init: {
            isFetching: false,
            success: false,
            error: false,
            blogCurrent: [],
            msg: "",
            check: "",
        },
        comment: {
            isFetching: false,
            success: false,
            error: false,
            allComment: []
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

        getBlogStart: state => {
            state.init.isFetching = true;
            state.init.success = false;
            state.init.error = false;
        },
        getBlogSuccess: (state, action) => {
            state.init.isFetching = false;
            state.init.success = true;
            state.init.error = false;
            state.init.blogCurrent = action.payload;
        },
        getBlogFail: (state, action) => {
            state.init.success = false;
            state.init.error = true;
            state.init.msg = action.payload;
        },

        deleteBlogStart: state => {
            state.init.isFetching = true;
            state.init.success = false;
            state.init.error = false;
        },
        deleteBlogSuccess: state => {
            state.init.isFetching = false;
            state.init.success = true;
            state.init.error = false;
        },
        deleteBlogFail: state => {
            state.init.isFetching = false;
            state.init.success = false;
            state.init.error = true;
        },

        storageBlogStart: state => {
            state.init.isFetching = true;
            state.init.success = false;
            state.init.error = false;
        },
        storageBlogSuccess: state => {
            state.init.isFetching = false;
            state.init.success = true;
            state.init.error = false;
        },
        storageBlogFail: state => {
            state.init.isFetching = false;
            state.init.success = false;
            state.init.error = true;
        },

        unStorageBlogStart: state => {
            state.init.isFetching = true;
            state.init.success = false;
            state.init.error = false;
        },
        unStorageBlogSuccess: state => {
            state.init.isFetching = false;
            state.init.success = true;
            state.init.error = false;
        },
        unStorageBlogFail: state => {
            state.init.isFetching = false;
            state.init.success = false;
            state.init.error = true;
        },

        checkStorage: (state, action) => {
            state.init.check = action.payload;
        },

        addCommentStart: state => {
            state.comment.isFetching = true;
            state.comment.success = false;
            state.comment.error = false;
        },
        addCommentSuccess: state => {
            state.comment.isFetching = false;
            state.comment.success = true;
            state.comment.error = false;
        },
        addCommentFail: state => {
            state.comment.isFetching = false;
            state.comment.success = false;
            state.comment.error = true;
        },

        deleteCommentStart: state => {
            state.comment.isFetching = true;
            state.comment.success = false;
            state.comment.error = false;
        },
        deleteCommentSuccess: state => {
            state.comment.isFetching = false;
            state.comment.success = true;
            state.comment.error = false;
        },
        deleteCommentFail: state => {
            state.comment.isFetching = false;
            state.comment.success = false;
            state.comment.error = true;
        },

        getCommentStart: state => {
            state.comment.isFetching = true;
            state.comment.success = false;
            state.comment.error = false;
        },
        getCommentSuccess: state => {
            state.comment.isFetching = false;
            state.comment.success = true;
            state.comment.error = false;
        },
        getCommentFail: state => {
            state.comment.isFetching = false;
            state.comment.success = false;
            state.comment.error = true;
        },
    }
});
export const {
    addStart,
    addSuccess,
    addFailed,
    getBlogSuccess,
    getBlogFail,
    getBlogStart,
    deleteBlogSuccess,
    deleteBlogFail,
    deleteBlogStart,
    storageBlogFail,
    storageBlogStart,
    storageBlogSuccess,
    unStorageBlogFail,
    unStorageBlogStart,
    unStorageBlogSuccess,
    checkStorage,
    addCommentSuccess,
    addCommentFail,
    addCommentStart,
    deleteCommentFail,
    deleteCommentStart,
    deleteCommentSuccess,
    getCommentFail,
    getCommentStart,
    getCommentSuccess
} = blogSlice.actions;

export default blogSlice.reducer;
