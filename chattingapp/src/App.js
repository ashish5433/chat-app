import './App.css';
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie';
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from './firebase-auth';
import ChatArea from './components/ChatArea';


const cookie = new Cookies()
function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null)

  const roomInputInfo = useRef(null)

  const setRoomNumber = () => {
    setRoom(roomInputInfo.current.value)
  }
  if (!isAuth) {
    return <div className="container-fluid main-div">
      <Auth setIsAuth={setIsAuth} />
    </div>
  }
  return <div>
    {room ? (<ChatArea room={room} />) :
      (<div className="room" style={{position:"fixed",width:"100vw",height:"100vh"}}>
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <center><p className={"name-heading"}  >Hello , {cookie.get("auth-name")}</p></center>
       <div className="room-input-feild">
        
        <input placeholder='Enter room number...' ref={roomInputInfo} id="input-room"  ></input>
        <div className="btn-1">
        <button onClick={setRoomNumber} className="enter-chat-btn">Enter Chat</button>
        <button  className="enter-chat-btn" onClick={() => {
          cookie.remove("auth-token")
          setIsAuth(cookie.get("auth-token"))
        }}>Sign-out</button>
        </div>
        </div>
      </div>)}
  </div>
}







export default App;
