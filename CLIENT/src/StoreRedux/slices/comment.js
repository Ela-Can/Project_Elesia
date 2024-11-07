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
            state.id = action.payload.id;
            state.commentTitle = action.payload.commentTitle;
            state.commentContent = action.payload.commentContent;

            for (let i = 0; i < state.commentList.length; i++) {
                if (state.commentList[i].id === id) {
                    state.commentList[i].title = commentTitle;
                    state.commentList[i].content = commentContent;
                break; 
                }
            }  
        },

        deleteComment: (state, action) => {
            const commentId = action.payload;
            for (let i = 0; i < state.commentList.length; i++) {
                if (state.commentList[i].id === commentId) {
                    state.commentList[i].isPublished = 0; 
                    break; 
                }
            }
        }
    },
});

export const { setComment, setUserComment, updateComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;