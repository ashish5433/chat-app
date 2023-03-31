import './App.css';
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie';
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from './firebase-auth';



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






const ChatArea = (props) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const msgRef = collection(db, "messages")
  const [typing, settyping] = useState(false)
  useEffect(() => {
    const querymessages = query(msgRef, where("room", "==", room), orderBy("sentTime"))
    const unsubscribe = onSnapshot(querymessages, (snapshot) => {
      //console.log("New")
      let messages = []
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        messages.push({ ...doc.data(), id: doc.id })

      });
      setMessages(messages)
    })

    return () => unsubscribe();
  }, [])

  const handleEvent = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;
    await addDoc(msgRef, {
      text: newMessage,
      sentTime: serverTimestamp(),
      name: auth.currentUser.displayName,
      room: room
    })
    setNewMessage("")

  }



  return <>
    <div className="acnt-data">

      <h1 style={{color:"white",marginLeft:"3px"}}>Hello, {cookie.get("auth-name")}</h1>
      <p style={{fontFamily:" 'Comfortaa', cursive",marginLeft:"2px"}}>Your room name is :{room}</p>
      {/* {typing && <p className='typing'>{cookie.get("auth-name")} is typing...</p>} */}
    </div>
    <div>


      {messages.map((msg) => (
        <>

          <div className={cookie.get("auth-name") === msg.name ? 'msg-div' : 'msg-div1'}>
           {cookie.get("auth-name")===msg.name  ? <div><h4>{msg.text}</h4> </div>:<div ><span>{msg.name}</span><h4>{msg.text}</h4></div>}


          </div>
        </>
      ))}

    </div>
    <div className="input-feild">

      <center><form onSubmit={handleEvent} >
      <div className="send">
        <input type="text" placeholder='Enter your message here....'
          onChange={(e) => { setNewMessage(e.target.value) }}
          value={newMessage}
          id={"input-msg"}
        />
        <button type='submit' id={"msg-sub-btn"} ><span class="material-symbols-outlined">
send
</span></button></div>
      </form>
      </center>
      
    </div>
  </>
}

export default App;
