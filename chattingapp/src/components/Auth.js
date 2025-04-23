import { auth, provider } from '../firebase-auth'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import google from './googleImg.png'
import bgImg from "./bg-image.jpg"
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


    return <div>
        <img src={bgImg} alt="akm" className='main--img' />
        <div className='main--div'>
            <div className='main--txt'>

                <h3>Welcome to </h3>
                <h1>My.Chat</h1>
            </div>

            <div className="auth-main" onClick={SignInWithGoogle}>
                <p className='Sign-in-txt'> Login with</p>
                <img src={google} alt="" />
            </div>
            {/* <button onClick={SignInWithGoogle}>Sign In </button> */}

        </div>
    </div>
}