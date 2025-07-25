import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { logOut, setError, setLoading, setUser } from "../reducer/authSlice"
import { auth } from "../../Firebase/Firebase";

export const registerUser  = (email,password) => async (dispatch)=>{
    dispatch(setLoading(true));
    try {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password)
        dispatch(setUser({uid: userCredential.user.uid, email:userCredential.user.email, }));
    } catch (error) {
        dispatch(setError(error.message))   
    }
}

export const loginUser = (email,password) => async (dispatch)=>{
    try {
       const userCredential = await signInWithEmailAndPassword(auth, email , password);
       dispatch(setUser({uid:userCredential.user.uid,email:userCredential.user.email}))
    } catch (error) {
        dispatch(setError(error.message));
    }
};
export const logoutUser = ()=>async (dispatch)=>{
    await signOut(auth);
    dispatch(logOut());
};