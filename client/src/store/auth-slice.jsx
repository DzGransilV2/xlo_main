import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hostname } from '../config';
import axios from 'axios';

export const login = createAsyncThunk(
    '/login',
    async (userCredential) => {
        try {
            const response = await axios.post(`${hostname}/login`, userCredential);
            if (!response.data.result) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.log("An error occurred while logging in. Please try again.");
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.user = null;
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
    }
});

// export const authActions = authSlice.actions;

export default authSlice;