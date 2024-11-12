import { createSlice } from "@reduxjs/toolkit";

const diagnosticSlice = createSlice({
    name: "diagnostic",
    initialState: {
        diagnosticList: [],
    },
    reducers: {
        setDiagnostic: (state, action) => {
            state.diagnosticList = action.payload;
            
        },
        deleteDiagnosticById: (state, action) => {
            const idToDelete = action.payload;

            const updatedList = [];

            for (let i = 0; i < state.diagnosticList.length; i++) {
                if (state.diagnosticList[i].id !== idToDelete) {
                updatedList[updatedList.length] = state.diagnosticList[i];
                }
            }
            state.diagnosticList = updatedList;
        },
    },
});

export const { setDiagnostic, deleteDiagnosticById } = diagnosticSlice.actions;

export default diagnosticSlice.reducer;