import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        id : null,
        commentList: [],
        userComments: [],
        commentTitle: "",
        commentContent: "",
        isPublished: 1,
    },
    reducers: {
        setComment: (state, action) => {
            state.commentList = action.payload;
        },
        setUserComment: (state, action) => {
            state.userComments = action.payload;
        },
        updateComment: (state, action) => {
            state.commentTitle = action.payload.commentTitle;
            state.commentContent = action.payload.commentContent;
        },
        deleteComment: (state, action) => {
            state.isPublished = action.payload;
        }
    },
});

export const { setComment, setUserComment, updateComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;