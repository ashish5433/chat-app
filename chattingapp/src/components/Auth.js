import {auth,provider} from '../firebase-auth'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import Cookies from 'universal-cookie'

const cookie = new Cookies()
export const Auth = (props)=>{
    const {setIsAuth}=props;
    const [name,setName]=useState("");
   
    const SignInWithGoogle = async (e)=>{
        
        const result= await signInWithPopup(auth,provider)
        const myName=result.user.displayName
        setName(myName)
     
        console.log(result.user.displayName)
        cookie.set("auth-token",result.user.refreshToken)
        setIsAuth(true)
       
        cookie.set("auth-name",myName)
       

    }

   
    return <>
        
        {name!==""? <h1>Your name is {name}</h1>:<h2></h2>}
        <p>Sign In With Google</p>
        <button onClick={SignInWithGoogle}>Sign In </button>
       
    </>
}