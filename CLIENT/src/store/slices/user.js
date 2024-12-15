import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        pseudo: "",
        email: "",
        role: "user",
        isActive: 1,
        message: "",
        isLogged: false,
        birthdate: null,
        authError: null,
    },
    reducers: {
        updatePseudo: (state, action) => {
            state.pseudo = action.payload;
        },
        login: (state, action) => {
            state.id = action.payload.user.id;
            state.pseudo = action.payload.user.pseudo;
            state.email = action.payload.user.email;
            state.role = action.payload.user.role || "user";
            state.isActive = action.payload.user.isActive || 1;
            state.isLogged = true;
            state.birthdate = null;
            state.authError = null;
        },
        loginFailed: (state, action) => {
            state.authError = action.payload.error;
            state.isLogged = false;
            state.id = null;
            state.pseudo = "";
            state.email = "";
            state.role = "user";
            state.isActive = null;
            state.isLogged = false;
            state.birthdate = null;
        },
        logout(state, action) {
			state.id = null;
            state.pseudo = "";
            state.role = "user";
            state.isActive = 1;
            state.message = "";
            state.isLogged = false;
            state.birthdate = null;
            state.authError = null;
		}
    },
});

export const { updatePseudo, login, logout, loginFailed } = userSlice.actions;

export default userSlice.reducer;