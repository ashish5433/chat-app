import './App.css';
import {Auth} from './components/Auth'
import Cookies from 'universal-cookie';
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp,query,where ,orderBy} from 'firebase/firestore'
import {db,auth} from './firebase-auth'



const cookie = new Cookies()
function App() {
    const [isAuth,setIsAuth]=useState(cookie.get("auth-token"));
    const [room,setRoom]= useState(null)

    const roomInputInfo = useRef(null)

    const setRoomNumber =()=>{
      setRoom(roomInputInfo.current.value)  
    }
    if(!isAuth){
  return <div className="main-div">
    <Auth setIsAuth={setIsAuth}/>
  </div>
    }
    return <div>
      {room ? (<ChatArea room={room} />) :
      (<div className="room">
      <label>Enter Room Number :</label>
      <input ref={roomInputInfo}></input>
      <button onClick={setRoomNumber}>Enter Chat</button>
      <button onClick={()=>{cookie.remove("auth-token")
        setIsAuth(cookie.get("auth-token"))
      }}>Sign-out</button>
      </div>)}
    </div>
}






const ChatArea =(props)=>{
  const {room} =props
  const [newMessage,setNewMessage]=useState("")
  const [messages,setMessages]=useState([])
  const msgRef = collection(db,"messages")

  useEffect(()=>{
    const querymessages=query(msgRef,where("room","==",room),orderBy("sentTime"))
     const unsubscribe = onSnapshot(querymessages,(snapshot) =>{
      //console.log("New")
      let messages =[]
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        messages.push({...doc.data(),id:doc.id})
        
      });
      setMessages(messages)
    })

    return ()=>unsubscribe();
  },[])

  const handleEvent = async (e)=>{
    e.preventDefault();

    if(newMessage=== "")return;
    await addDoc(msgRef,{
      text:newMessage,
      sentTime:serverTimestamp(),
      name:auth.currentUser.displayName,
      room:room
    })
    setNewMessage("")
    
  }
  
  
  return<>
    <h1>Hello {cookie.get("auth-name")}</h1>
    <h2>Chat </h2>
    <div>
    
    
    {messages.map((msg)=>(
        
      <div className={cookie.get("auth-name")===msg.name?'msg-div':'msg-div1'}>
        <span>{msg.name}</span><h4>{msg.text}</h4>
       
       
       </div>
    ))}
    
    </div>
    <center><form onSubmit={handleEvent} >
      <input type="text" placeholder='Enter your message here....'
      onChange={(e)=>{setNewMessage(e.target.value)}} 
      value={newMessage}
      />
      <button type='submit'  >Send</button>
    </form>
    </center>
  </>
}

export default App;
