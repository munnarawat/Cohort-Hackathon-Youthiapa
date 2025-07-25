import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user : null,
    isAuthenticated: false,
    loading: false,
    error: null,
}
export const  authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },

        setError:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        logOut: (state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    }
})

export const {setUser,setLoading,setError, logOut} = authSlice.actions
export default authSlice.reducer