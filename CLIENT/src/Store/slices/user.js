import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        pseudo: "",
        role: "user",
        isActive: 1,
        message: "",
        isLogged: false,
        authError: null,
    },
    reducers: {
        login: (state, action) => {
            state.pseudo = action.payload.user.pseudo;
            state.role = action.payload.user.role || "user";
            state.isActive = action.payload.user.isActive || 1;
            state.isLogged = action.payload.isLogged;
            state.authError = null;
        },
        loginFailed: (state, action) => {
            state.authError = action.payload.error;
        },
        //setLoading(state, action) {
        //	state.isLoading = action.payload;
        //},
        setMessage: (state, action) => {
			state.message = action.payload;
		},
    },
});

export const { login, loginFailed, setMessage } = userSlice.actions;

export default userSlice.reducer;