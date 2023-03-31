import { auth, provider } from '../firebase-auth'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import google from './googleImg.png'
import Cookies from 'universal-cookie'
import './auth.css'
const cookie = new Cookies()
export const Auth = (props) => {
    const { setIsAuth } = props;
    const [name, setName] = useState("");

    const SignInWithGoogle = async (e) => {

        const result = await signInWithPopup(auth, provider)
        const myName = result.user.displayName
        setName(myName)

        console.log(result.user)
        cookie.set("auth-token", result.user.refreshToken)
        setIsAuth(true)

        cookie.set("auth-name", myName)


    }


    return <div className="container" style={{ width: '80%',position:'absolute',top:'3rem',left:'7%',padding:"3% 10Z%" }} ><div style={{ display: "flex", justifyContent: "center", borderRadius: "30px",alignItems:'center',flexDirection:'column' ,padding:'1.5rem'}}>

        <h3 style={{ fontFamily: "Alkatra", fontSize: "50px",textAlign:'center' }}>Welcome to myChat</h3>
        <div className="auth-main" onClick={SignInWithGoogle}>
            <p style={{ fontSize: "30px", margin: "auto",padding:'1rem',paddingLeft:'2rem',paddingRight:'2rem' }}> Sign In With<img style={{ width: "30px", height: "28px", marginLeft: "10px", marginTop: "0px" }} src={google} alt="" />   </p>
        </div>
        {/* <button onClick={SignInWithGoogle}>Sign In </button> */}

    </div>
    </div>
}