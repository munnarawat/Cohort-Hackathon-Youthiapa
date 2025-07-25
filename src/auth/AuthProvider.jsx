import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux';
import { setUser } from '../store/reducer/authSlice';

const AuthProvider = ({children}) => {
    const dispatch = useDispatch();
    const auth = getAuth();
    useEffect(()=>{
        const unsubscribe  = onAuthStateChanged(auth,(user)=>{
            if(user){
                dispatch(
                    setUser({
                        email:user.email,
                        uid:user.uid,
                        dispalyName:user.displayName,
                        PhotoURL:user.photoURL
                    })
                )
            }
            else{
                dispatch(setUser(null))
            }
        })
        return ()=> unsubscribe();
    },[auth,dispatch])
  return <>{children}</>
}

export default AuthProvider;