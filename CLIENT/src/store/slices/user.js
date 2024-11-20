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
            console.log("Payload reçu dans login:", action.payload);
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
		},
        setLoading(state, action) {
        	state.isLoading = action.payload;
        },
        setMessage: (state, action) => {
			state.message = action.payload;
		},
    },
});

export const { setUser, updatePseudo, login, logout, loginFailed, setLoading, setMessage } = userSlice.actions;

export default userSlice.reducer;